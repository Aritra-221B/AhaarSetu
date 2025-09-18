import HeroSection from "@/components/Incentives/HeroSection";
import FeatureCard from "@/components/Incentives/FeatureCard";

export default function Page() {
  return (
    <>
      <HeroSection
        title="Opportunities for Small Farms"
        subtitle="Government Support. Advertisement. Financial Aid."
        buttonText="Learn More"
        backgroundImage="/images/heroincentive.jpg"
      />

      {/* Section 1: Farm Advertisement Support */}
      <section className="py-16 bg-gradient-to-b from-green-700 to-green-600">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-50 mb-8 text-center">
            Farm Advertisement Support
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon="📍"
              title="Locality Promotion"
              description="Get your farm advertised locally by government initiatives."
            />
            <FeatureCard
              icon="📱"
              title="Social Media Boost"
              description="Government-supported social media campaigns for small farms."
            />
            <FeatureCard
              icon="✅"
              title="Verified Farm Badge"
              description="Get a government verified badge to build trust with customers."
            />
          </div>
        </div>
      </section>

      {/* Section 2: Financial Aid During Epidemics */}
      <section className="py-16 bg-gradient-to-b from-green-600 to-green-500">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-50 mb-8 text-center">
            Financial Aid During Epidemics
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon="🔔"
              title="Automatic Alerts"
              description="Receive instant notifications and guidelines during disease outbreaks."
            />
            <FeatureCard
              icon="💰"
              title="Subsidy & Grants"
              description="Get quick access to government subsides and grants."
            />
            <FeatureCard
              icon="🐄"
              title="Livestock Procurement Support"
              description="Buy livestock at subsidized prices to restart operations after losses."
            />
          </div>
        </div>
      </section>

      {/* Section 3: More Opportunities */}
      <section className="py-16 bg-gradient-to-b from-green-500 to-green-400">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-50 mb-8 text-center">
            More Opportunities
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon="🤝"
              title="Collaborate with Nearby Farms"
              description="Connect with local farmers for shared resources and knowledge."
            />
            <FeatureCard
              icon="💻"
              title="Free Training & Webinars"
              description="Access free educational content to improve your farming practices."
            />
            <FeatureCard
              icon="🏆"
              title="Success Stories"
              description="Get inspired by stories of successful farmers in your community."
            />
          </div>
        </div>
      </section>
    </>
  );
}