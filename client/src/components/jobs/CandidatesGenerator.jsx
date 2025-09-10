import React, { useState } from "react";
import Sidebars from "../layout/dashboard/Sidebars";

const generateCandidateScores = (numCandidates) => {
  const candidates = [];
  for (let i = 0; i < numCandidates; i++) {
    const aptitude = Math.floor(Math.random() * 51) + 50; // 50–100
    const coding = Math.floor(Math.random() * 51) + 50;
    const communication = Math.floor(Math.random() * 51) + 50;
    const total = aptitude + coding + communication;

    candidates.push({
      Candidate: `Candidate_${i + 1}`,
      Aptitude: aptitude,
      Coding: coding,
      Communication: communication,
      Total_Score: total,
    });
  }
  return candidates;
};

const CandidatesGenerator = () => {
  const [numCandidates, setNumCandidates] = useState(20);
  const [numSelections, setNumSelections] = useState(10);
  const [candidates, setCandidates] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const handleGenerate = () => {
    const generated = generateCandidateScores(numCandidates);
    setCandidates(generated);
  };

  const topCandidates = [...candidates]
    .sort((a, b) => b.Total_Score - a.Total_Score)
    .slice(0, numSelections);

  return (
    <Sidebars>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <h6 className="fw-semibold mb-0">Candidate Generator</h6>
      </div>

      {/* Controls */}
      <div className="w-100 bg-white shadow-sm border rounded p-4 mb-4">
        <p className="fw-semibold mb-3">Candidate Generator Controls</p>
        <div className="row g-4 mb-3">
          <div className="col-md-6">
            <label className="block mb-2 fw-medium">
              Enter total number of candidates shortlisted:
            </label>
            <input
              type="number"
              value={numCandidates}
              min={10}
              max={20}
              onChange={(e) => setNumCandidates(Number(e.target.value))}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="block mb-2 fw-medium">
              Number of top candidates to select:
            </label>
            <input
              type="number"
              value={numSelections}
              min={1}
              max={Math.min(numCandidates, 50)}
              onChange={(e) => setNumSelections(Number(e.target.value))}
              className="form-control"
            />
          </div>
        </div>
        <button onClick={handleGenerate} className="btn btn-primary">
          Generate Recommendations
        </button>
      </div>

      {/* Results */}
      {candidates.length > 0 && (
        <div className="bg-white shadow-sm border rounded p-4">
          <h6 className="fw-semibold mb-3">
            Top {numSelections} Candidates Based on Assessment Scores
          </h6>

          {/* ✅ Added table-responsive wrapper here */}
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Candidate</th>
                  <th>Aptitude</th>
                  <th>Coding</th>
                  <th>Communication</th>
                  <th>Total Score</th>
                </tr>
              </thead>
              <tbody>
                {topCandidates.map((c, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{c.Candidate}</td>
                    <td>{c.Aptitude}</td>
                    <td>{c.Coding}</td>
                    <td>{c.Communication}</td>
                    <td className="fw-bold">{c.Total_Score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Checkbox to show all */}
          <div
            className="form-check mt-3"
            style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}
          >
            <input
              type="checkbox"
              id="showAll"
              checked={showAll}
              onChange={() => setShowAll(!showAll)}
              className="form-check-input"
            />
            <label htmlFor="showAll" className="form-check-label">
              Show All Candidates Scores
            </label>
          </div>

          {showAll && (
            <div className="mt-4">
              <h6 className="fw-semibold mb-2">All Candidates</h6>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Candidate</th>
                      <th>Aptitude</th>
                      <th>Coding</th>
                      <th>Communication</th>
                      <th>Total Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.map((c, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{c.Candidate}</td>
                        <td>{c.Aptitude}</td>
                        <td>{c.Coding}</td>
                        <td>{c.Communication}</td>
                        <td className="fw-bold">{c.Total_Score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </Sidebars>
  );
};

export default CandidatesGenerator;
