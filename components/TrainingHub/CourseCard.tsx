import React from "react";
import Link from "next/link";

interface CourseCardProps {
  title: string;
  description: string;
  enrolledText?: string;
  onStart?: () => void;
  href?: string;
}

export default function CourseCard({ title, description, enrolledText, onStart, href }: CourseCardProps) {
  return (
    <div className="rounded-xl border bg-white shadow-sm p-6 flex flex-col gap-4 hover:shadow-md hover:border-green-200 transition-all duration-200">
      <div>
        <div className="font-semibold text-gray-800">{title}</div>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">{description}</p>
      </div>
      <div className="flex items-center justify-between">
        {href ? (
          <Link
            href={href}
            className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-200 focus:outline-none text-white text-sm font-medium rounded-md px-4 py-2"
          >
            Start Learning
          </Link>
        ) : (
          <button
            onClick={onStart}
            className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-200 focus:outline-none text-white text-sm font-medium rounded-md px-4 py-2"
          >
            Start Learning
          </button>
        )}
        {enrolledText && (
          <span className="inline-flex items-center rounded-full bg-green-50 text-green-700 border border-green-100 px-2.5 py-1 text-xs">
            {enrolledText}
          </span>
        )}
      </div>
    </div>
  );
}


