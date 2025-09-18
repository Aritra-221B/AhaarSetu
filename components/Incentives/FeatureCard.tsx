import React from "react";

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="rounded-2xl p-6 shadow-sm border bg-green-50 hover:shadow-md transition">
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className="text-4xl mb-4">{icon}</div>
        
        {/* Title (bold green) */}
        <h3 className="text-lg font-bold text-green-700">{title}</h3>

        {/* Description (smaller gray) */}
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;