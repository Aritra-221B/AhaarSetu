import React from "react";
import { BookOpen, Users, Award, Gauge } from "lucide-react";

type Stat = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

const stats: Stat[] = [
  { icon: <BookOpen className="w-5 h-5" />, value: "4", label: "Available Courses" },
  { icon: <Users className="w-5 h-5" />, value: "4.9K", label: "Active Learners" },
  { icon: <Award className="w-5 h-5" />, value: "1.2K", label: "Certificates issued" },
  { icon: <Gauge className="w-5 h-5" />, value: "98%", label: "Completion Rate" },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, idx) => (
        <div
          key={idx}
          className="rounded-xl border bg-gradient-to-b from-white to-gray-50 shadow-sm p-5 flex flex-col items-center text-center hover:shadow-md hover:border-green-200 transition-all duration-200"
        >
          <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-lg bg-green-50 text-green-700 ring-1 ring-green-100">
            {s.icon}
          </div>
          <div className="text-2xl font-semibold text-gray-900">{s.value}</div>
          <div className="text-sm text-gray-500 mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}


