import React from "react";

const BudgetSubmissionDiagram = () => {
  return (
    <div className="flex flex-col items-center p-5">
      <h2 className="text-xl font-bold mb-4">Budget Submission Process</h2>
      <svg
        width="500"
        height="400"
        viewBox="0 0 500 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* User Form Submission */}
        <rect x="150" y="20" width="200" height="50" fill="#4CAF50" stroke="black" />
        <text x="190" y="50" fill="white" fontSize="16">User Submits Budget</text>

        {/* Arrow */}
        <line x1="250" y1="70" x2="250" y2="110" stroke="black" strokeWidth="2" />
        <polygon points="245,110 250,120 255,110" fill="black" />

        {/* Data Validation */}
        <rect x="150" y="120" width="200" height="50" fill="#FF9800" stroke="black" />
        <text x="190" y="150" fill="white" fontSize="16">Validate Data</text>

        {/* Arrow */}
        <line x1="250" y1="170" x2="250" y2="210" stroke="black" strokeWidth="2" />
        <polygon points="245,210 250,220 255,210" fill="black" />

        {/* Store in MongoDB */}
        <rect x="150" y="220" width="200" height="50" fill="#2196F3" stroke="black" />
        <text x="165" y="250" fill="white" fontSize="16">Store in MongoDB</text>

        {/* Arrow */}
        <line x1="250" y1="270" x2="250" y2="310" stroke="black" strokeWidth="2" />
        <polygon points="245,310 250,320 255,310" fill="black" />

        {/* Confirmation */}
        <rect x="150" y="320" width="200" height="50" fill="#9C27B0" stroke="black" />
        <text x="170" y="350" fill="white" fontSize="16">Confirmation Sent</text>
      </svg>
    </div>
  );
};

export default BudgetSubmissionDiagram;
