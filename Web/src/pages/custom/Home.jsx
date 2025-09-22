import React from "react";
import DomainChecker from "../../components/custom/DomainChecker";
import ServicesSection from "../../components/custom/ServicesSection";
import PricingSection from "../../components/custom/PricingSection";
import HostingPrice from "../../components/custom/HostingPrice";
import PackagePrice from "../../components/custom/PackagePrice";
import Procedure from "../../components/custom/Procedure";
import Adventage from "../../components/custom/Advantage";
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
