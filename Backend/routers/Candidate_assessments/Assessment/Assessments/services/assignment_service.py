from sqlalchemy.orm import Session
from sqlalchemy import text
from schema.assignment import AssignmentCreate
from models import Assignment, Assessment, LegacyCandidate
from routers.Candidate_assessments.Assessment.communication.comm_routes import ExamAttempt
from typing import List, Dict, Any

def create_assignment(db: Session, data: AssignmentCreate):
    assignment = Assignment(**data.dict())
    db.add(assignment)
    db.commit()
    db.refresh(assignment)
    return assignment

def get_assignments(db: Session):
    return db.query(Assignment).all()

def get_assignments_with_completion_status(db: Session) -> List[Dict[str, Any]]:
    """
    Get assignments with actual completion status by checking test tables
    """
    assignments = db.query(Assignment).all()
    result = []
    
    for assignment in assignments:
        # Get assessment details to know the type
        assessment = db.query(Assessment).filter(Assessment.id == assignment.assessment_id).first()
        
        assignment_dict = {
            "id": assignment.id,
            "candidate_id": assignment.candidate_id,
            "assessment_id": assignment.assessment_id,
            "due_date": assignment.due_date.isoformat() if assignment.due_date else None,
            "status": assignment.status,
            "actual_status": assignment.status,  # Default to assignment status
            "completed_at": None,
            "score": None
        }
        
        if assessment and assignment.candidate_id:
            assessment_type = assessment.type.lower() if assessment.type else None
            
            # Get candidate email for matching across different tables
            candidate_email = None
            try:
                email_result = db.execute(
                    text("SELECT candidate_email FROM candidate_records WHERE id = :id"),
                    {"id": assignment.candidate_id}
                ).first()
                if email_result:
                    candidate_email = email_result[0]
            except Exception as e:
                print(f"Error getting candidate email: {e}")
            
            # Check aptitude test completion
            if assessment_type == 'aptitude' and candidate_email:
                try:
                    aptitude_candidate = db.query(LegacyCandidate).filter(
                        LegacyCandidate.email == candidate_email
                    ).first()
                    
                    if aptitude_candidate:
                        if aptitude_candidate.status and aptitude_candidate.status.lower() in ['completed', 'passed', 'submitted']:
                            assignment_dict["actual_status"] = "Completed"
                            assignment_dict["score"] = aptitude_candidate.score
                        elif aptitude_candidate.status and aptitude_candidate.status.lower() == 'pending':
                            assignment_dict["actual_status"] = "In Progress"
                except Exception as e:
                    print(f"Error checking aptitude test: {e}")
            
            # Check communication test completion
            elif assessment_type == 'communication' and candidate_email:
                try:
                    comm_attempt = db.query(ExamAttempt).filter(
                        ExamAttempt.email == candidate_email
                    ).first()
                    
                    if comm_attempt and comm_attempt.submitted_at:
                        assignment_dict["actual_status"] = "Completed"
                        assignment_dict["completed_at"] = comm_attempt.submitted_at.isoformat()
                        assignment_dict["score"] = comm_attempt.total_score
                except Exception as e:
                    print(f"Error checking communication test: {e}")
            
            # Check coding test completion
            elif assessment_type == 'coding' and candidate_email:
                try:
                    # Check submissions table for coding completions
                    coding_result = db.execute(
                        text("""
                            SELECT COUNT(*) as submission_count, MAX(timestamp) as last_submission
                            FROM submissions 
                            WHERE candidate_email = :email
                        """),
                        {"email": candidate_email}
                    ).first()
                    
                    if coding_result and coding_result[0] > 0:
                        assignment_dict["actual_status"] = "Completed"
                        assignment_dict["completed_at"] = coding_result[1].isoformat() if coding_result[1] else None
                except Exception as e:
                    print(f"Error checking coding test: {e}")
        
        result.append(assignment_dict)
    
    return result
