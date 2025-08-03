import React from "react";
import DomainChecker from "../components/DomainChecker";
import ServicesSection from "../components/ServicesSection";
import PricingSection from "../components/PricingSection";

function Home() {
    return (
        <div className="bg-gray-100">
            <DomainChecker />
            <ServicesSection />
            <PricingSection />
        </div>
    );
}

export default Home;
