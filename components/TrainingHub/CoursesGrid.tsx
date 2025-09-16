import React from "react";
import CourseCard from "./CourseCard";

export type Course = {
  title: string;
  description: string;
  enrolledText: string;
  href: string;
};

export const COURSES: Course[] = [
  {
    title: "Understanding Antimicrobial Resistance",
    description: "Learn about AMR, its causes, and impact on public health and livestock industry",
    enrolledText: "1,240 enrolled",
    href: "/traininghub/courses/antimicrobial-resistance",
  },
  {
    title: "Maximum Residue Limits(MRL) Compliance",
    description: "Comprehensive guide to MRL standards and compliance requirements",
    enrolledText: "856 enrolled",
    href: "/traininghub/courses/mrl-compliance",
  },
  {
    title: "Withdrawal Periods and Safe Practices",
    description: "Master withdrawal periods for different medicines and ensure product safety",
    enrolledText: "2,100 enrolled",
    href: "/traininghub/courses/withdrawal-periods",
  },
  {
    title: "Digital Record Keeping",
    description: "Learn to maintain accurate digital records for medicine administration.",
    enrolledText: "720 enrolled",
    href: "/traininghub/courses/digital-record-keeping",
  },
];

export default function CoursesGrid({ query = "" }: { query?: string }) {
  const normalized = query.trim().toLowerCase();
  const filtered = normalized
    ? COURSES.filter((c) =>
        [c.title, c.description].some((t) => t.toLowerCase().includes(normalized))
      )
    : COURSES;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((c) => (
          <CourseCard
            key={c.href}
            title={c.title}
            description={c.description}
            enrolledText={c.enrolledText}
            href={c.href}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-lg border bg-white p-8 text-center text-sm text-gray-500">
          No courses found. Try a different keyword.
        </div>
      )}
    </div>
  );
}


