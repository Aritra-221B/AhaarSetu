import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 via-green-200 to-green-100">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between mt-14">
          <h1 className="text-2xl font-semibold text-gray-900">Understanding Antimicrobial Resistance (AMR)</h1>
        </div>

        <section className="space-y-6 bg-gradient-to-b from-green-100 via-green-200 to-green-200 border rounded-xl shadow-sm p-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">1. What is AMR?</h2>
            <p className="text-[15px] leading-7 text-gray-700 mt-2">
              AMR happens when germs (bacteria, viruses, fungi, parasites) stop being killed by medicines.
              This makes infections harder to treat.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">2. Why does AMR happen?</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>People take too many antibiotics, even when not needed.</li>
              <li>Stopping antibiotics before finishing the course.</li>
              <li>Giving animals antibiotics to make them grow faster.</li>
              <li>Poor hygiene in hospitals, farms, and homes.</li>
              <li>Not enough new medicines being made.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">3. AMR and Human Health</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>Some infections (like TB, pneumonia, UTIs) don’t get better with normal medicines.</li>
              <li>People stay sick longer and spend more money on treatment.</li>
              <li>Hospitals become more crowded and risky.</li>
              <li>WHO calls AMR a big global health danger.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">4. AMR and Animals (Livestock)</h2>
            <p className="text-[15px] leading-7 text-gray-700 mt-2">Farmers give antibiotics to animals for growth and disease prevention. This makes bacteria in animals resistant.</p>
            <p className="text-[15px] leading-7 text-gray-700 mt-2">Resistant bacteria can spread to humans through:</p>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>Meat, milk, or eggs.</li>
              <li>Touching animals.</li>
              <li>Soil and water from farms.</li>
            </ul>
            <p className="text-[15px] leading-7 text-gray-700 mt-2">Farmers lose money because animals get sick and products can’t be sold in some markets.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">5. Why is AMR a Problem?</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>For people: Harder to cure infections, more deaths.</li>
              <li>For animals: More disease, less milk/meat/eggs.</li>
              <li>For economy: More cost for treatment, less trade.</li>
              <li>For food: Unsafe or less food for people.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">6. How to Stop AMR?</h2>
            <ul className="list-disc pl-5 text-[15px] leading-7 text-gray-700 mt-2 space-y-1">
              <li>Use antibiotics only when needed.</li>
              <li>Finish the full course of medicines.</li>
              <li>Keep farms and hospitals clean.</li>
              <li>Vaccinate humans and animals to prevent sickness.</li>
              <li>Work together (humans + animals + environment = One Health).</li>
              <li>Create new medicines and other solutions.</li>
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


