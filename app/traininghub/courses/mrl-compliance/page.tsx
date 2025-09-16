import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 via-green-200 to-green-100">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between mt-14">
          <h1 className="text-2xl font-semibold text-gray-900">Maximum Residue Limits (MRL) Compliance</h1>
        </div>

        <section className="space-y-6 bg-gradient-to-b from-green-100 via-green-200 to-green-200 border rounded-xl shadow-sm p-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">1. What is MRL?</h2>
            <p className="text-[15px] leading-7 text-gray-700 mt-2">MRL = Maximum Residue Limit.</p>
            <p className="text-[15px] leading-7 text-gray-700 mt-2">
              It is the highest amount of medicine or chemical (like antibiotics, pesticides, or hormones) that is allowed to stay in
              food (milk, meat, eggs, vegetables, fruits).
            </p>
            <p className="text-[15px] leading-7 text-gray-700 mt-2">
              These limits are set by food safety authorities (like WHO, FAO, Codex, FSSAI, EU, FDA).
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">2. Why are MRLs Important?</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>To make sure food is safe for people.</li>
              <li>To stop antimicrobial resistance (AMR) from too many drug residues.</li>
              <li>To help farmers and exporters follow international trade rules.</li>
              <li>To build consumer trust in food.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">3. Where do Residues Come From?</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>Using antibiotics or pesticides in animals/crops.</li>
              <li>Not waiting long enough after treatment (ignoring the withdrawal period).</li>
              <li>Overusing or misusing medicines.</li>
              <li>Contaminated feed, water, or farm environment.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">4. MRL in Public Health</h2>
            <p className="text-[15px] leading-7 text-gray-700 mt-2">Eating food with residues can cause:</p>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>Allergies or side effects.</li>
              <li>AMR (bacteria becoming resistant).</li>
              <li>Long-term health problems (hormonal, cancer risk).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">5. MRL in Livestock & Agriculture</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>Farmers must follow dosage and withdrawal period before selling milk, meat, eggs.</li>
              <li>Exports are checked strictly — if residues are higher than MRL, products get rejected.</li>
              <li>Non-compliance = loss of income + ban on trade.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">6. How to Follow (Compliance Requirements)</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>Use medicines only when prescribed by a vet/doctor.</li>
              <li>Always respect withdrawal periods before selling animal products.</li>
              <li>Keep records of all drug use (date, dose, animal, medicine).</li>
              <li>Train farmers and workers about safe use of medicines.</li>
              <li>Do regular lab testing of food products.</li>
              <li>Follow national & international food safety standards (Codex, EU, FSSAI, FDA).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">7. Impact of Non-Compliance</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>Health: Unsafe food for people.</li>
              <li>Economy: Export bans, financial loss.</li>
              <li>Reputation: Loss of trust from consumers and buyers.</li>
              <li>Farms: Stricter rules and penalties for farmers.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">8. How to Improve Compliance</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>Promote Good Veterinary Practices (GVP) and Good Agricultural Practices (GAP).</li>
              <li>Increase awareness & training for farmers.</li>
              <li>Encourage use of alternatives (vaccines, probiotics, biosecurity).</li>
              <li>Strengthen monitoring & testing systems.</li>
              <li>Support One Health approach (human, animal, environment working together).</li>
            </ul>
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


