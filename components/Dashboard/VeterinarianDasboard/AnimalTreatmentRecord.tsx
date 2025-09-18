"use client";
import React from "react";

export default function AnimalTreatmentRecord() {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="font-semibold mb-3">Animal Treatment Record</h3>
      <ul className="space-y-1 text-sm">
        <li><strong>Date:</strong> Dec 16, 2025</li>
        <li><strong>Farmer Name:</strong> Ramesh Kumar</li>
        <li><strong>Animal ID:</strong> CT001</li>
        <li><strong>Medicine:</strong> Penicillin</li>
        <li><strong>Withdrawal:</strong> Dec 30, 2025</li>
        <li><strong>Status:</strong> Withdrawal</li>
      </ul>
    </div>
  );
}
