
import React from "react";
import { Link } from "react-router-dom";

const getProgressWidth = (status) => {
  switch (status) {
    case "Learning":
      return "50%";
    case "Mastered":
      return "100%";
    case "Not Started":
    default:
      return "0%";
  }
};

function SkillCard({ skill, onDelete }) {
  return (
    <div className="skill-card">
      <div className="skill-header">
        <h3>{skill.name}</h3>
        <span className={`status status-${skill.status.replace(" ", "-")}`}>
          {skill.status}
        </span>
      </div>
      <p>
        <strong>Category:</strong> {skill.category}
      </p>
      <p>
        <strong>Notes:</strong> {skill.notes}
      </p>

      {/* Progress Bar */}
      <div className="progress-container">
        <div
          className="progress-fill"
          style={{ width: getProgressWidth(skill.status) }}
        />
      </div>

      {/* Buttons */}
      <div className="skill-actions">
        <Link to={`/skills/edit/${skill.id}`} className="btn edit">
          Edit
        </Link>
        <button onClick={() => onDelete(skill.id)} className="btn delete">
          Delete
        </button>
      </div>

      {/* Inline Styles (can be extracted to CSS file) */}
      <style>{`
        .skill-card {
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 1rem;
          margin: 1rem 0;
          background-color: blue;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .status {
          padding: 0.3rem 0.6rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: bold;
          color: #fff;
        }

        .status-Not-Started {
          background-color: #ccc;
        }

        .status-Learning {
          background-color: #f0ad4e;
        }

        .status-Mastered {
          background-color: #28a745;
        }

        .progress-container {
          width: 100%;
          height: 10px;
          background-color: #eee;
          border-radius: 10px;
          overflow: hidden;
          margin-top: 0.5rem;
        }

        .progress-fill {
          height: 100%;
          background-color: #007bff;
          transition: width 0.3s ease;
        }

        .skill-actions {
          margin-top: 1rem;
          display: flex;
          gap: 1rem;
        }

        .btn {
          padding: 0.4rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          text-decoration: none;
          color: white;
          font-weight: bold;
        }

        .btn.edit {
          background-color: #007bff;
        }

        .btn.delete {
          background-color: #dc3545;
        }
      `}</style>
    </div>
  );
}

export default SkillCard;
