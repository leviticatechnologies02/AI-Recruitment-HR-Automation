from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from .services.offer_tracking_service import (
    create_offer,
    get_offers,
    get_offer,
    update_offer,
    update_offer_status,
    delete_offer,
    get_offer_stats
)
from schema.offer_tracking import (
    OfferTrackingCreate,
    OfferTrackingOut,
    OfferTrackingUpdate,
    OfferStatusUpdate
)
from typing import List, Optional

router = APIRouter(prefix="/offer-tracking", tags=["Offer Tracking"])

@router.post("/", response_model=OfferTrackingOut)
def create_offer_endpoint(data: OfferTrackingCreate, db: Session = Depends(get_db)):
    """Create a new offer"""
    return create_offer(db, data)

@router.get("/", response_model=List[OfferTrackingOut])
def list_offers(
    status: Optional[str] = None,
    candidate_id: Optional[int] = None,
    position: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all offers with optional filters"""
    return get_offers(db, status, candidate_id, position)

@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    """Get offer statistics"""
    return get_offer_stats(db)

@router.get("/{offer_id}", response_model=OfferTrackingOut)
def get_offer_endpoint(offer_id: int, db: Session = Depends(get_db)):
    """Get a specific offer"""
    offer = get_offer(db, offer_id)
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    return offer

@router.put("/{offer_id}", response_model=OfferTrackingOut)
def update_offer_endpoint(
    offer_id: int,
    data: OfferTrackingUpdate,
    db: Session = Depends(get_db)
):
    """Update an offer"""
    update_dict = data.dict(exclude_unset=True)
    updated = update_offer(db, offer_id, update_dict)
    if not updated:
        raise HTTPException(status_code=404, detail="Offer not found")
    return updated

@router.patch("/{offer_id}/status", response_model=OfferTrackingOut)
def update_status_endpoint(
    offer_id: int,
    data: OfferStatusUpdate,
    db: Session = Depends(get_db)
):
    """Update offer status"""
    updated = update_offer_status(db, offer_id, data.status)
    if not updated:
        raise HTTPException(status_code=404, detail="Offer not found")
    return updated

@router.delete("/{offer_id}")
def delete_offer_endpoint(offer_id: int, db: Session = Depends(get_db)):
    """Delete an offer"""
    success = delete_offer(db, offer_id)
    if not success:
        raise HTTPException(status_code=404, detail="Offer not found")
    return {"message": "Offer deleted successfully"}

