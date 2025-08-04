import React from "react";
import DomainChecker from "../components/DomainChecker";
import ServicesSection from "../components/ServicesSection";
import PricingSection from "../components/PricingSection";
import HostingPrice from "../components/HostingPrice";
function Home() {
    return (
        <div className="bg-gray-100">
            <DomainChecker />
            <ServicesSection />
            <PricingSection />
            <HostingPrice />
        </div>
    );
}

export default Home;
