import React from 'react';

const Stepper = ({ steps, activeStep }) => (
    <div className="flex items-center justify-between mb-8">
        {steps.map((step, idx) => (
            <div key={step} className="flex-1 flex flex-col items-center">
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white mb-1
                    ${activeStep === idx + 1 ? "bg-green-600" : "bg-gray-300"}`}
                >
                    {idx + 1}
                </div>
                <span className={`text-sm font-semibold text-center ${activeStep === idx + 1 ? "text-green-600" : "text-gray-500"}`}>{step}</span>
            </div>
        ))}
    </div>
);

export default Stepper;