import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-700 to-green-300">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between mt-14">
          <h1 className="text-2xl font-semibold text-green-50">Withdrawal Periods & Safe Practices — Easy Guide</h1>
        </div>

        <section className="space-y-6 bg-gradient-to-b from-green-100 via-green-200 to-green-200 border rounded-xl shadow-sm p-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">1. What is a withdrawal period?</h2>
            <p className="text-[15px] leading-7 text-gray-700 mt-2">
              It is the time you must wait after giving a medicine to an animal before you can use its milk, meat, or eggs for people.
              This ensures medicine residues in food are low and the food is safe.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">2. Why it matters (simple):</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>Keeps food safe to eat.</li>
              <li>Reduces health risks and allergies.</li>
              <li>Helps stop antimicrobial resistance (AMR).</li>
              <li>Protects farm income — buyers/exporters check residues.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">3. Important rule: always follow the label and your vet</h2>
            <p className="text-[15px] leading-7 text-gray-700 mt-2">
              The medicine label or the vet will say the correct withdrawal time. Different drugs, doses, animals, and ways of giving the drug (pill, injection, long-acting shot) change the time. Never guess.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">4. How withdrawal times can vary (what changes the time):</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>Type of medicine (antibiotic, antiparasitic, pesticide).</li>
              <li>Strength and dose of the drug.</li>
              <li>How the drug was given (injection, oral, intramammary).</li>
              <li>Animal species (cow, goat, sheep, pig, chicken).</li>
              <li>Age and health of the animal.</li>
              <li>Fat or lean tissues (some drugs stay longer in fatty meat).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">5. Quick practical categories (easy view)</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li><span className="font-medium">Short waiting</span>: a few hours to several days — usually for some short-acting medicines.</li>
              <li><span className="font-medium">Medium waiting</span>: about a week to a few weeks — common for many antibiotics.</li>
              <li><span className="font-medium">Long waiting</span>: several weeks or more — for long-acting products or some pesticides/hormones.</li>
            </ul>
            <p className="text-[15px] leading-7 text-gray-700 mt-2">Exact days depend on the specific drug — check label.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">6. Farm safe-practice checklist (do these every time)</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>Read the medicine label before giving it.</li>
              <li>Write down: animal ID, drug name, dose, date/time given, and the withdrawal end date.</li>
              <li>Put a visible tag on treated animals (pen, collar, or sign).</li>
              <li>Keep treated animals and their milk/eggs separate until withdrawal ends.</li>
              <li>Don’t sell or send milk, meat, or eggs from treated animals until the withdrawal period is over.</li>
              <li>Ask your vet if unsure or if multiple drugs were used.</li>
              <li>Test milk/meat if you think a mistake happened.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">7. Simple record format you can use (one line per treatment)</h2>
            <p className="text-[15px] leading-7 text-gray-700 mt-2">Date given | Animal ID | Drug name & batch | Dose | Given by (name) | Product label withdrawal | Withdrawal end date | Notes</p>
            <p className="text-[15px] leading-7 text-gray-700 mt-2">Example: 2025-09-17 | Cow #12 | DrugX batch 123 | 5 ml IM | Raju | Milk: 7 days / Meat: 14 days | 2025-09-24 | Recheck if sick</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">8. What to do if you don’t know the withdrawal time</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>Do not sell the milk/meat/eggs.</li>
              <li>Call your vet or the drug manufacturer.</li>
              <li>Keep the product and the animal isolated until you get the answer.</li>
              <li>If in serious doubt, arrange residue testing from a lab.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">9. Good farm habits that prevent residue problems</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>Use medicines only when needed and on vet advice.</li>
              <li>Follow exact dose and route (don’t double-dose unless vet says).</li>
              <li>Keep good biosecurity (clean housing, hygiene, vaccination).</li>
              <li>Use alternatives where possible: vaccines, better nutrition, probiotics.</li>
              <li>Train workers about withdrawal rules.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">10. If a product fails a residue test (what happens)</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>Food may be rejected by buyers or exporters.</li>
              <li>There can be penalties or fines in some places.</li>
              <li>Farm reputation can suffer.</li>
              <li>You may need to recall products and pay for testing.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">11. Short reminders for milk, meat, eggs</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li><span className="font-medium">Milk</span>: do not send milk from treated animals until milk withdrawal ends.</li>
              <li><span className="font-medium">Meat</span>: do not send animals to slaughter until meat withdrawal ends.</li>
              <li><span className="font-medium">Eggs</span>: some medicines need eggs held back for some days; check label.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">12. Where to find exact withdrawal times (always use these):</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>Product label / package insert (first place).</li>
              <li>Your veterinarian (if label not clear).</li>
              <li>National food safety agency or drug registration authorities.</li>
              <li>Manufacturer’s customer service.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">13. Final one-line rule (easy to remember):</h2>
            <p className="text-[15px] leading-7 text-gray-700 mt-2">“Read the label. Mark the date. Don’t sell until the day is passed.”</p>
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


