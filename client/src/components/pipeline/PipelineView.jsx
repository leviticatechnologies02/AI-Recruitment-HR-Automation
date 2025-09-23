import React, { useState, useMemo } from 'react';
import { Filter, Calendar, User, Briefcase, Eye, ArrowRight, X, Clock, Mail, FileText, UserPlus, UserX } from 'lucide-react';

const PipelineView = () => {
  // Sample data
  const [candidates] = useState([
    {
      id: 1,
      name: "Aisha Sharma",
      email: "aisha.sharma@email.com",
      position: "Frontend Engineer",
      stage: "Phone Screen",
      appliedDate: "2024-09-21",
      recruiter: "Sarah Johnson",
      resumeLink: "#",
      notes: "Strong React background, good communication skills. Completed initial screening successfully.",
      timeline: [
        { stage: "Applied", date: "2024-09-21", status: "completed" },
        { stage: "Phone Screen", date: "2024-09-22", status: "current" }
      ]
    },
    {
      id: 2,
      name: "Ravi Kumar",
      email: "ravi.kumar@email.com",
      position: "Backend Developer",
      stage: "Rejected",
      appliedDate: "2024-09-18",
      recruiter: "Mike Chen",
      resumeLink: "#",
      notes: "Technical skills didn't match our current requirements. Polite candidate, may consider for future openings.",
      timeline: [
        { stage: "Applied", date: "2024-09-18", status: "completed" },
        { stage: "Phone Screen", date: "2024-09-19", status: "completed" },
        { stage: "Rejected", date: "2024-09-20", status: "current" }
      ]
    },
    {
      id: 3,
      name: "Meera Patel",
      email: "meera.patel@email.com",
      position: "Product Manager",
      stage: "Onsite",
      appliedDate: "2024-09-15",
      recruiter: "Sarah Johnson",
      resumeLink: "#",
      notes: "Excellent product sense and leadership experience. Team feedback very positive after technical round.",
      timeline: [
        { stage: "Applied", date: "2024-09-15", status: "completed" },
        { stage: "Phone Screen", date: "2024-09-16", status: "completed" },
        { stage: "Interview", date: "2024-09-18", status: "completed" },
        { stage: "Onsite", date: "2024-09-20", status: "current" }
      ]
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@email.com",
      position: "Data Scientist",
      stage: "Applied",
      appliedDate: "2024-09-23",
      recruiter: "Mike Chen",
      resumeLink: "#",
      notes: "PhD in Machine Learning, published research. Just applied today.",
      timeline: [
        { stage: "Applied", date: "2024-09-23", status: "current" }
      ]
    },
    {
      id: 5,
      name: "Lisa Zhang",
      email: "lisa.zhang@email.com",
      position: "UX Designer",
      stage: "Offer Extended",
      appliedDate: "2024-09-10",
      recruiter: "Sarah Johnson",
      resumeLink: "#",
      notes: "Outstanding portfolio and cultural fit. Offer extended at competitive package.",
      timeline: [
        { stage: "Applied", date: "2024-09-10", status: "completed" },
        { stage: "Phone Screen", date: "2024-09-11", status: "completed" },
        { stage: "Interview", date: "2024-09-13", status: "completed" },
        { stage: "Onsite", date: "2024-09-16", status: "completed" },
        { stage: "Offer Extended", date: "2024-09-18", status: "current" }
      ]
    }
  ]);

  const [jobs] = useState([
    "All Jobs", "Frontend Engineer", "Backend Developer", "Product Manager", "Data Scientist", "UX Designer"
  ]);

  const [recruiters] = useState([
    "All Recruiters", "Sarah Johnson", "Mike Chen", "Emma Davis"
  ]);

  const stages = [
    { id: "Applied", name: "Applied", color: "bg-blue-50 border-blue-200" },
    { id: "Phone Screen", name: "Phone Screen", color: "bg-yellow-50 border-yellow-200" },
    { id: "Interview", name: "Interview", color: "bg-purple-50 border-purple-200" },
    { id: "Onsite", name: "Onsite", color: "bg-orange-50 border-orange-200" },
    { id: "Offer Extended", name: "Offer Extended", color: "bg-green-50 border-green-200" },
    { id: "Hired", name: "Hired", color: "bg-emerald-50 border-emerald-200" },
    { id: "Rejected", name: "Rejected", color: "bg-red-50 border-red-200" }
  ];

  // State
  const [selectedJob, setSelectedJob] = useState("All Jobs");
  const [selectedStage, setSelectedStage] = useState("All Stages");
  const [selectedRecruiter, setSelectedRecruiter] = useState("All Recruiters");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedCandidates, setSelectedCandidates] = useState(new Set());

  // Filter candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter(candidate => {
      if (selectedJob !== "All Jobs" && candidate.position !== selectedJob) return false;
      if (selectedStage !== "All Stages" && candidate.stage !== selectedStage) return false;
      if (selectedRecruiter !== "All Recruiters" && candidate.recruiter !== selectedRecruiter) return false;
      return true;
    });
  }, [candidates, selectedJob, selectedStage, selectedRecruiter]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  const getStageBadgeClass = (stage) => {
    const map = {
      'Applied': 'badge bg-info-subtle text-info-main',
      'Phone Screen': 'badge bg-primary-subtle text-primary-600',
      'Interview': 'badge bg-primary-subtle text-primary-600',
      'Onsite': 'badge bg-warning-subtle text-warning-main',
      'Offer Extended': 'badge bg-success-subtle text-success-main',
      'Hired': 'badge bg-success-subtle text-success-main',
      'Rejected': 'badge bg-danger-subtle text-danger-main'
    };
    return map[stage] || 'badge bg-neutral-200 text-black';
  };

  const handleCandidateSelect = (candidateId, isSelected) => {
    const newSelected = new Set(selectedCandidates);
    if (isSelected) {
      newSelected.add(candidateId);
    } else {
      newSelected.delete(candidateId);
    }
    setSelectedCandidates(newSelected);
  };

  const CandidateCard = ({ candidate }) => (
    <div className="card border shadow-none h-100">
      <div className="card-body p-24">
        <div className="d-flex align-items-start justify-content-between mb-3">
          <div className="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              checked={selectedCandidates.has(candidate.id)}
              onChange={(e) => handleCandidateSelect(candidate.id, e.target.checked)}
              className="form-check-input me-2"
            />
            <div className="d-flex align-items-center gap-2">
              <span className="w-40-px h-40-px bg-primary-600 text-white rounded-circle d-flex justify-content-center align-items-center">
                <User size={18} />
              </span>
              <h6 className="mb-0">{candidate.name}</h6>
            </div>
          </div>
          <span className={getStageBadgeClass(candidate.stage)}>{candidate.stage}</span>
        </div>
        <div className="d-grid gap-2 text-secondary-light mb-3">
          <div className="d-flex align-items-center gap-2">
            <span className="w-28-px h-28-px bg-primary-50 rounded d-flex justify-content-center align-items-center">
              <Briefcase size={14} className="text-primary-600" />
            </span>
            <span className="fw-medium">{candidate.position}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="w-28-px h-28-px bg-success-subtle rounded d-flex justify-content-center align-items-center">
              <Calendar size={14} className="text-success" />
            </span>
            <span className="fw-medium">{formatDate(candidate.appliedDate)}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="w-28-px h-28-px bg-purple rounded d-flex justify-content-center align-items-center text-white">
              <User size={14} />
            </span>
            <span className="fw-medium">{candidate.recruiter}</span>
          </div>
        </div>
        <button onClick={() => setSelectedCandidate(candidate)} className="btn btn-primary w-100 d-inline-flex align-items-center justify-content-center gap-2">
          <Eye size={16} />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );

  const CandidateModal = ({ candidate, onClose }) => (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex align-items-center gap-2">
                <span className="w-44-px h-44-px bg-primary-600 text-white rounded-circle d-flex justify-content-center align-items-center">
                  <User size={20} />
                </span>
                <h6 className="modal-title mb-0">{candidate.name}</h6>
              </div>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="border rounded p-3 d-flex align-items-center gap-3">
                    <span className="w-36-px h-36-px bg-primary-600 text-white rounded d-flex justify-content-center align-items-center">
                      <Mail size={18} />
                    </span>
                    <div>
                      <div className="text-secondary-light text-sm">Email</div>
                      <div className="fw-medium">{candidate.email}</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="border rounded p-3 d-flex align-items-center gap-3">
                    <span className="w-36-px h-36-px bg-purple text-white rounded d-flex justify-content-center align-items-center">
                      <Briefcase size={18} />
                    </span>
                    <div>
                      <div className="text-secondary-light text-sm">Position</div>
                      <div className="fw-medium">{candidate.position}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="alert alert-primary mt-3 d-flex align-items-center gap-2">
                <span className={getStageBadgeClass(candidate.stage)}>{candidate.stage}</span>
                <span className="fw-medium">Current Stage</span>
              </div>

              <div className="border rounded p-3 mb-3">
                <h6 className="mb-3">Stage Timeline</h6>
                <div className="d-grid gap-2">
                  {candidate.timeline.map((item, index) => (
                    <div key={index} className="d-flex align-items-center gap-3">
                      <span className={`w-12-px h-12-px rounded-circle ${item.status === 'current' ? 'bg-primary-600' : item.status === 'completed' ? 'bg-success' : 'bg-neutral-300'}`}></span>
                      <div className="flex-grow-1">
                        <div className="fw-semibold">{item.stage}</div>
                        <div className="text-secondary-light text-sm">{formatDate(item.date)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border rounded p-3 mb-3">
                <h6 className="mb-2">Recruiter Notes</h6>
                <div className="text-secondary-light">{candidate.notes}</div>
              </div>

              <div className="border rounded p-3">
                <a href={candidate.resumeLink} className="text-primary-600 fw-semibold d-inline-flex align-items-center gap-2">
                  <FileText size={16} />
                  <span>View Resume</span>
                </a>
              </div>
            </div>
            <div className="modal-footer d-flex flex-wrap justify-content-center gap-2">
              <button className="btn btn-primary d-inline-flex align-items-center gap-2">
                <ArrowRight size={16} />
                <span>Move Stage</span>
              </button>
              <button className="btn btn-success d-inline-flex align-items-center gap-2">
                <Calendar size={16} />
                <span>Schedule Interview</span>
              </button>
              <button className="btn btn-danger d-inline-flex align-items-center gap-2">
                <UserX size={16} />
                <span>Reject</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );

  return (
    <div className="container-fluid py-4">
      <div className="mb-12">
        <h4 className="mb-2">Pipeline View</h4>
        <p className="text-secondary-light mb-0">Visualize and manage candidates across stages.</p>
      </div>

      <div className="card border shadow-none mb-24">
        <div className="card-body p-24">
          <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
            <span className="w-36-px h-36-px bg-primary-600 text-white rounded d-flex justify-content-center align-items-center">
              <Filter size={16} />
            </span>
            <span className="fw-semibold">Filters</span>
          </div>
          <div className="row g-3">
            <div className="col-12 col-md-4">
              <select value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)} className="form-select">
                {jobs.map(job => (
                  <option key={job} value={job}>{job}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-4">
              <select value={selectedStage} onChange={(e) => setSelectedStage(e.target.value)} className="form-select">
                <option value="All Stages">All Stages</option>
                {stages.map(stage => (
                  <option key={stage.id} value={stage.id}>{stage.name}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-4">
              <select value={selectedRecruiter} onChange={(e) => setSelectedRecruiter(e.target.value)} className="form-select">
                {recruiters.map(recruiter => (
                  <option key={recruiter} value={recruiter}>{recruiter}</option>
                ))}
              </select>
            </div>
          </div>

          {selectedCandidates.size > 0 && (
            <div className="mt-3 pt-3 border-top">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <span className="w-32-px h-32-px bg-success-subtle rounded d-flex justify-content-center align-items-center">
                    <User size={16} className="text-success" />
                  </span>
                  <span className="text-secondary-light">
                    {selectedCandidates.size} candidate{selectedCandidates.size > 1 ? 's' : ''} selected
                  </span>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-primary d-inline-flex align-items-center gap-2">
                    <ArrowRight size={14} />
                    <span>Move Stage</span>
                  </button>
                  <button className="btn btn-outline-danger d-inline-flex align-items-center gap-2">
                    <UserX size={14} />
                    <span>Reject Selected</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="row g-3">
        {filteredCandidates.map(candidate => (
          <div key={candidate.id} className="col-12 col-md-6 col-lg-4">
            <CandidateCard candidate={candidate} />
          </div>
        ))}
        {filteredCandidates.length === 0 && (
          <div className="col-12 text-center py-5">
            <div className="card border shadow-none mx-auto" style={{maxWidth: '480px'}}>
              <div className="card-body p-24">
                <span className="w-64-px h-64-px bg-primary-600 text-white rounded-circle d-inline-flex justify-content-center align-items-center mb-3">
                  <UserPlus size={28} />
                </span>
                <h6 className="mb-2">No candidates found</h6>
                <p className="text-secondary-light mb-0">Try adjusting your filters to see more candidates.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedCandidate && (
        <CandidateModal candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />
      )}
    </div>
  );
};

export default PipelineView;