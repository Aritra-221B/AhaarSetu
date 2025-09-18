"use client";
import React from "react";

export default function NewTreatment() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <form className="grid grid-cols-2 gap-4 text-sm">
        <input type="text" placeholder="Farmer ID" className="border p-2 rounded-lg" />
        <input type="text" placeholder="Animal ID" className="border p-2 rounded-lg" />
        <input type="text" placeholder="Medicine" className="border p-2 rounded-lg" />
        <input type="text" placeholder="Dose" className="border p-2 rounded-lg" />
        <input
          type="text"
          placeholder="Withdrawal Period"
          className="border p-2 rounded-lg col-span-2"
        />
        <textarea
          placeholder="Note for Farmer"
          className="border p-2 rounded-lg col-span-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 col-span-2"
        >
          Save Treatment
        </button>
      </form>
    </div>
  );
}
