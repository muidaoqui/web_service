import React from "react";
import DomainChecker from "../components/DomainChecker";
import ServicesSection from "../components/ServicesSection";
import PricingSection from "../components/PricingSection";
import HostingPrice from "../components/HostingPrice";
import PackagePrice from "../components/PackagePrice";
import Procedure from "../components/Procedure";
import Adventage from "../components/Advantage";
function Home() {
    return (
        <div className="bg-gray-100">
            <DomainChecker />
            <ServicesSection />
            <PricingSection />
            <HostingPrice />
            <PackagePrice />
            <Procedure />
            <Adventage />
            {/* Add more sections as needed */}
        </div>
    );
}

export default Home;
