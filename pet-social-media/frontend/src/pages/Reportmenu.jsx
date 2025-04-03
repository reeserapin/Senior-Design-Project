import { useState } from "react";

const ReportMenu = ({ onClose }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");

  const reportReasons = [
    "Animal Abuse",
    "Inappropriate Content",
    "Harassment",
    "Fake Profile",
    "Other"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Report submitted:", { reason: selectedReason, description });
    onClose();
  };

  return (
    <div className="report-section">
      <div className="report-header">
        <span className="report-title">Report Post</span>
      </div>
      <form onSubmit={handleSubmit} className="report-form">
        <div className="report-reasons">
          {reportReasons.map((reason) => (
            <label key={reason} className="report-reason-item">
              <input
                type="radio"
                name="reason"
                value={reason}
                checked={selectedReason === reason}
                onChange={(e) => setSelectedReason(e.target.value)}
              />
              <span>{reason}</span>
            </label>
          ))}
        </div>
        <textarea
          className="report-description"
          placeholder="Please provide additional details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button 
          type="submit" 
          className="report-submit"
          disabled={!selectedReason}
        >
          Submit Report
        </button>
      </form>
      <style jsx>{`
        .report-section {
          padding: 10px;
          background: #f9f9f9;
          border-radius: 8px;
          margin-top: 10px;
        }

        .report-header {
          margin-bottom: 10px;
        }

        .report-title {
          font-weight: bold;
          font-size: 14px;
        }

        .report-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .report-reasons {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .report-reason-item {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          padding: 8px;
          border-radius: 5px;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }

        .report-reason-item input[type="radio"] {
          margin: 0;
        }

        .report-description {
          width: calc(100%);
          min-height: 80px;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 5px;
          resize: vertical;
          font-family: inherit;
          font-size: 14px;
          line-height: 1.4;
          box-sizing: border-box;
        }

        .report-description::placeholder {
          color: #999;
          font-size: 14px;
        }

        .report-submit {
          background: #099EC8;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.2s;
        }

        .report-submit:hover:not(:disabled) {
          background: #9DD8EA;
        }

        .report-submit:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default ReportMenu;
