'use client';
import React, { useState } from "react";
import StatsCards from "@/components/TrainingHub/StatsCards";
import SearchBar from "@/components/TrainingHub/SearchBar";
import QuickLinks from "@/components/TrainingHub/QuickLinks";
import CoursesGrid from "@/components/TrainingHub/CoursesGrid";
import FaqsSection from "@/components/Home/FaqsSection/FaqsSection";

export default function Page() {
  const [query, setQuery] = useState("");
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 via-green-200 to-green-100">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6 mt-14">
          <h1 className="text-2xl font-bold text-gray-900">Training Hub</h1>
          <p className="text-sm text-gray-600 mt-1">
            Learn about safe antimicrobial use and best practices for livestock management
          </p>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-2">
              <SearchBar value={query} onChange={setQuery} />
              <div className="text-xs text-gray-500">{query ? 'Showing results for: ' : 'Showing all courses'}<span className="font-medium text-gray-700">{query ? ` ${query}` : ''}</span></div>
            </div>
            <CoursesGrid query={query} />

            {/* FAQ Section anchor */}
            <section id="faq" className="pt-6">
              <FaqsSection />
            </section>
          </div>
          <div className="lg:col-span-1">
            <QuickLinks />
          </div>
        </div>
      </main>
    </div>
  );
}


