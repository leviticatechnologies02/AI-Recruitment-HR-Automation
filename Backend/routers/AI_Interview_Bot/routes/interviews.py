from fastapi import APIRouter, Depends, Form, UploadFile, File, HTTPException, Query
from sqlalchemy.orm import Session
from core.database import get_db
from models import Question, Answer, InterviewCandidate, AIInterviewTemplate
from ..utils.ai_analysis import score_answer
from ..utils.email_utils import generate_otp, send_otp
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
import os
import shutil

router = APIRouter()
UPLOAD_DIR = "uploads/"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Pydantic models for request bodies
class OTPRequest(BaseModel):
    email: EmailStr
    name: str

class OTPVerify(BaseModel):
    email: EmailStr
    otp: str

@router.post("/send_otp")
def send_otp_endpoint(request: OTPRequest, db: Session = Depends(get_db)):
    """
    Generate and send OTP to candidate's email
    """
    try:
        # Generate OTP
        otp = generate_otp()
        
        # Check if candidate exists, create if not
        candidate = db.query(InterviewCandidate).filter(
            InterviewCandidate.email == request.email
        ).first()
        
        if not candidate:
            candidate = InterviewCandidate(
                name=request.name,
                email=request.email,
                otp=otp,
                otp_created_at=datetime.utcnow()
            )
            db.add(candidate)
        else:
            # Update existing candidate's OTP
            candidate.otp = otp
            candidate.otp_created_at = datetime.utcnow()
        
        db.commit()
        db.refresh(candidate)
        
        # Send OTP via email
        try:
            send_otp(request.email, otp)
            return {
                "success": True,
                "message": "OTP sent successfully",
                "candidate_id": candidate.id
            }
        except Exception as e:
            # If email sending fails, still return success with OTP for demo
            print(f"Email sending failed: {str(e)}")
            return {
                "success": True,
                "message": "OTP generated (email sending skipped)",
                "candidate_id": candidate.id,
                "otp": otp  # For demo purposes - remove in production!
            }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/verify_otp")
def verify_otp_endpoint(request: OTPVerify, db: Session = Depends(get_db)):
    """
    Verify OTP for candidate
    """
    try:
        candidate = db.query(InterviewCandidate).filter(
            InterviewCandidate.email == request.email
        ).first()
        
        if not candidate:
            raise HTTPException(status_code=404, detail="Candidate not found")
        
        if not candidate.otp:
            raise HTTPException(status_code=400, detail="No OTP found for this candidate")
        
        # Check if OTP is expired (10 minutes validity)
        if candidate.otp_created_at:
            time_diff = datetime.utcnow() - candidate.otp_created_at
            if time_diff > timedelta(minutes=10):
                raise HTTPException(status_code=400, detail="OTP has expired")
        
        # Verify OTP
        if candidate.otp != request.otp:
            raise HTTPException(status_code=400, detail="Invalid OTP")
        
        # Clear OTP after successful verification
        candidate.otp = None
        candidate.otp_created_at = None
        db.commit()
        
        return {
            "success": True,
            "message": "OTP verified successfully",
            "candidate_id": candidate.id,
            "candidate_name": candidate.name
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/templates")
def list_templates(db: Session = Depends(get_db)):
    """
    Get all available AI Interview Templates
    """
    templates = db.query(AIInterviewTemplate).all()
    return [
        {
            "id": t.id,
            "name": t.name,
            "interview_type": t.interview_type,
            "difficulty": t.difficulty,
            "time_limit": t.time_limit,
            "question_count": len(t.questions) if t.questions else 0
        }
        for t in templates
    ]

@router.get("/get_questions")
def get_questions(
    template_id: int = Query(None, description="AI Interview Template ID"),
    db: Session = Depends(get_db)
):
    """
    Get interview questions from AI Interview Template.
    If template_id is provided, use that template's questions.
    Otherwise, use the first available template or create a default one.
    """
    
    # If template_id is provided, fetch that specific template
    if template_id:
        template = db.query(AIInterviewTemplate).filter(AIInterviewTemplate.id == template_id).first()
        if not template:
            raise HTTPException(status_code=404, detail=f"Template with ID {template_id} not found")
    else:
        # Get the first available template
        template = db.query(AIInterviewTemplate).first()
        
        # If no template exists, create a default one
        if not template:
            default_template = AIInterviewTemplate(
                name="Default Interview Template",
                interview_type="general",
                time_limit=45,
                difficulty="medium",
                created_by=None,  # System-created template
                questions=[
                    {
                        "q": "Tell us about yourself and your professional background.",
                        "a": ""
                    },
                    {
                        "q": "What are your key strengths and how do they make you a good fit for this role?",
                        "a": ""
                    },
                    {
                        "q": "Describe a challenging project you worked on and how you overcame obstacles.",
                        "a": ""
                    },
                    {
                        "q": "Where do you see yourself in 5 years?",
                        "a": ""
                    },
                    {
                        "q": "Why are you interested in this position?",
                        "a": ""
                    }
                ]
            )
            db.add(default_template)
            db.commit()
            db.refresh(default_template)
            template = default_template
    
    # Convert template questions to the format expected by frontend
    # Template questions are stored as [{"q": "question text", "a": "answer"}, ...]
    formatted_questions = []
    for idx, q in enumerate(template.questions):
        formatted_questions.append({
            "id": idx + 1,  # Use index as ID since template questions don't have separate IDs
            "text": q.get("q", ""),
            "type": "text",  # Default to text type
            "template_id": template.id,
            "template_name": template.name
        })
    
    return formatted_questions

@router.post("/submit_answer")
def submit_answer(
    candidate_id: int = Form(...),
    question_id: int = Form(...),
    question_text: str = Form(...),  # Now accept question text from frontend
    answer_text: str = Form(None),
    video: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    """
    Submit answer for an interview question.
    Since questions come from templates, we need the question text for AI scoring.
    """
    video_path = None
    if video:
        video_path = os.path.join(UPLOAD_DIR, video.filename)
        with open(video_path, "wb") as buffer:
            shutil.copyfileobj(video.file, buffer)

    # Calculate AI score if text answer is provided
    score = None
    if answer_text and question_text:
        try:
            score = score_answer(question_text, answer_text)
            print(f"✅ AI Score for candidate {candidate_id}, question {question_id}: {score}/10")
        except Exception as e:
            print(f"❌ Error calculating AI score: {str(e)}")
            score = 0  # Default score if AI fails

    # Save answer to database
    ans = Answer(
        candidate_id=candidate_id,
        question_id=question_id,
        answer_text=answer_text,
        video_path=video_path,
        score=score
    )
    db.add(ans)
    db.commit()
    db.refresh(ans)

    return {
        "message": "Answer submitted successfully",
        "score": score,
        "answer_id": ans.id
    }

@router.get("/results")
def get_interview_results(db: Session = Depends(get_db)):
    """
    Get all interview results with candidate information and scores
    """
    # Get all candidates who have submitted answers
    candidates_with_answers = db.query(InterviewCandidate).join(
        Answer, InterviewCandidate.id == Answer.candidate_id
    ).distinct().all()
    
    results = []
    for candidate in candidates_with_answers:
        # Get all answers for this candidate
        answers = db.query(Answer).filter(Answer.candidate_id == candidate.id).all()
        
        # Calculate statistics
        total_score = sum(a.score or 0 for a in answers)
        max_score = len(answers) * 10
        avg_score = (total_score / max_score * 100) if max_score > 0 else 0
        
        # Format answers
        formatted_answers = []
        for answer in answers:
            formatted_answers.append({
                "question_id": answer.question_id,
                "answer_text": answer.answer_text,
                "video_path": answer.video_path,
                "score": answer.score or 0
            })
        
        results.append({
            "candidate_id": candidate.id,
            "candidate_name": candidate.name,
            "candidate_email": candidate.email,
            "total_questions": len(answers),
            "total_score": total_score,
            "max_score": max_score,
            "avg_score": round(avg_score, 1),
            "answers": formatted_answers
        })
    
    return results

@router.get("/results/{candidate_id}")
def get_candidate_interview_result(candidate_id: int, db: Session = Depends(get_db)):
    """
    Get interview result for a specific candidate with detailed answers
    """
    candidate = db.query(InterviewCandidate).filter(InterviewCandidate.id == candidate_id).first()
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    answers = db.query(Answer).filter(Answer.candidate_id == candidate_id).all()
    
    if not answers:
        raise HTTPException(status_code=404, detail="No interview answers found for this candidate")
    
    # Calculate statistics
    total_score = sum(a.score or 0 for a in answers)
    max_score = len(answers) * 10
    avg_score = (total_score / max_score * 100) if max_score > 0 else 0
    
    # Format answers with question details
    formatted_answers = []
    for answer in answers:
        formatted_answers.append({
            "question_id": answer.question_id,
            "answer_text": answer.answer_text,
            "video_path": answer.video_path,
            "score": answer.score or 0
        })
    
    return {
        "candidate_id": candidate.id,
        "candidate_name": candidate.name,
        "candidate_email": candidate.email,
        "total_questions": len(answers),
        "total_score": total_score,
        "max_score": max_score,
        "avg_score": round(avg_score, 1),
        "answers": formatted_answers
    }
