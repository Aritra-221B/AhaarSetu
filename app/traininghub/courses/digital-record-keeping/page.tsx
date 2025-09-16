import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 via-green-200 to-green-100">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between mt-14">
          <h1 className="text-2xl font-semibold text-gray-900">Digital Record Keeping</h1>
        </div>

        <p className="text-sm text-gray-600 mb-4">Learn to maintain accurate records for medicine use on animals</p>

        <section className="space-y-6 bg-gradient-to-b from-green-100 via-green-200 to-green-200 border rounded-xl shadow-sm p-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">1. What is digital record keeping?</h2>
            <p className="text-[15px] leading-7 text-gray-700 mt-2">
              Writing down medicine use on a computer, phone, or app instead of on paper. Helps keep data safe, easy to find, and easy to share.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">2. Why is it important?</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>Shows proof that you followed withdrawal periods & MRL rules.</li>
              <li>Helps vets and farmers track animal health history.</li>
              <li>Avoids mistakes (like giving the same drug twice).</li>
              <li>Saves time compared to paper.</li>
              <li>Builds trust with buyers and regulators.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">3. What should you record? (basic fields)</h2>
            <p className="text-[15px] leading-7 text-gray-700 mt-2">For every treatment, record:</p>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>Date medicine was given.</li>
              <li>Animal ID (ear tag, batch number, or name).</li>
              <li>Medicine name & batch number.</li>
              <li>Dose and route (e.g., 5 ml injection).</li>
              <li>Reason (disease or prevention).</li>
              <li>Person who gave the medicine (vet/farmer).</li>
              <li>Withdrawal period (milk, meat, eggs).</li>
              <li>Withdrawal end date (when it’s safe again).</li>
              <li>Notes (e.g., reaction, improvement).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">4. Best practices</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>Enter the record immediately after giving medicine.</li>
              <li>Keep all records in one place (don’t mix paper and digital unless backed up).</li>
              <li>Use unique IDs for each animal (ear tag numbers, QR codes).</li>
              <li>Store data safely (use password, backup to cloud/USB).</li>
              <li>Share with your vet or buyers when needed.</li>
              <li>Set alerts/reminders for withdrawal end dates.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">5. Benefits for farmers & vets</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>Easy to check which animal got which medicine.</li>
              <li>No more forgotten withdrawal periods.</li>
              <li>Quick reporting for buyers/exporters.</li>
              <li>Better herd health planning.</li>
              <li>Increases farm transparency & reputation.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">6. Simple example record (digital table)</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-[13px] text-gray-700 border mt-2">
                <thead className="bg-green-100">
                  <tr>
                    <th className="px-3 py-2 border">Date</th>
                    <th className="px-3 py-2 border">Animal ID</th>
                    <th className="px-3 py-2 border">Medicine</th>
                    <th className="px-3 py-2 border">Dose</th>
                    <th className="px-3 py-2 border">Reason</th>
                    <th className="px-3 py-2 border">Given By</th>
                    <th className="px-3 py-2 border">Withdrawal Ends</th>
                    <th className="px-3 py-2 border">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border">17-09-2025</td>
                    <td className="px-3 py-2 border">Cow #12</td>
                    <td className="px-3 py-2 border">DrugX</td>
                    <td className="px-3 py-2 border">5ml IM</td>
                    <td className="px-3 py-2 border">Mastitis</td>
                    <td className="px-3 py-2 border">Dr. Raju</td>
                    <td className="px-3 py-2 border">24-09-2025 (Milk)</td>
                    <td className="px-3 py-2 border">Improving</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">7. Golden Rule</h2>
            <p className="text-[15px] leading-7 text-gray-700 mt-2">“No medicine use is complete until it’s recorded.”</p>
          </div>
        </section>

        <div className="mt-6 flex justify-end">
          <Link
            href="/traininghub"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            Back to Training Hub
          </Link>
        </div>
      </main>
    </div>
  );
}


