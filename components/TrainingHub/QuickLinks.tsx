import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

type QuickLink = {
  label: string;
  href: string;
  newTab?: boolean;
};

const links: QuickLink[] = [
  { label: "Basics", href: "/traininghub/basics", newTab: true },
  { label: "FAQ", href: "/traininghub#faq", newTab: false },
  { label: "Articles", href: "/traininghub/articles", newTab: true },
  { label: "MRL reference", href: "https://food.ec.europa.eu/plants/pesticides/maximum-residue-levels_en", newTab: true },
  { label: "AMU guidelines", href: "https://nivedi.res.in/amu_tool/pdf/Guidelines%20on%20monitoring%20antimicrobial%20use%20at%20the%20farm%20level.pdf", newTab: true },
  { label: "Video library", href: "/traininghub/videos", newTab: true },
];

export default function QuickLinks() {
  return (
    <aside className="rounded-xl border bg-white shadow-sm p-0 overflow-hidden">
      <div className="border-b px-4 py-3 font-medium text-gray-800 flex items-center gap-2">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-green-100 text-green-700 text-xs">QL</span>
        Quick Links
      </div>
      <nav className="flex flex-col divide-y">
        {links.map((l, i) => (
          <Link
            key={i}
            href={l.href}
            target={l.newTab ? "_blank" : undefined}
            rel={l.newTab ? "noopener noreferrer" : undefined}
            className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between group transition-colors"
          >
            <span className="group-hover:text-gray-900">{l.label}</span>
            {l.newTab ? (
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-gray-200 group-hover:bg-green-300" />
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}


