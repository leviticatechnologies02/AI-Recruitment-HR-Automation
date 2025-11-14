from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from .services.offer_template_service import (
    create_offer_template,
    get_offer_templates,
    get_offer_template,
    update_offer_template,
    delete_offer_template
)
from schema.offer_template import OfferTemplateCreate, OfferTemplateOut, OfferTemplateUpdate
from typing import List, Optional

router = APIRouter(prefix="/offer-templates", tags=["Offer Templates"])

@router.post("/", response_model=OfferTemplateOut)
def create_template(data: OfferTemplateCreate, db: Session = Depends(get_db)):
    """Create a new offer template"""
    return create_offer_template(db, data)

@router.get("/", response_model=List[OfferTemplateOut])
def list_templates(
    position: Optional[str] = None,
    department: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all offer templates with optional filters"""
    return get_offer_templates(db, position, department)

@router.get("/{template_id}", response_model=OfferTemplateOut)
def get_template(template_id: int, db: Session = Depends(get_db)):
    """Get a specific offer template"""
    template = get_offer_template(db, template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Offer template not found")
    return template

@router.put("/{template_id}", response_model=OfferTemplateOut)
def update_template(
    template_id: int,
    data: OfferTemplateUpdate,
    db: Session = Depends(get_db)
):
    """Update an offer template"""
    update_dict = data.dict(exclude_unset=True)
    updated = update_offer_template(db, template_id, update_dict)
    if not updated:
        raise HTTPException(status_code=404, detail="Offer template not found")
    return updated

@router.delete("/{template_id}")
def delete_template(template_id: int, db: Session = Depends(get_db)):
    """Delete an offer template"""
    success = delete_offer_template(db, template_id)
    if not success:
        raise HTTPException(status_code=404, detail="Offer template not found")
    return {"message": "Offer template deleted successfully"}

