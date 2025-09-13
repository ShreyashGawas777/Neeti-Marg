
import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon } from '../components/icons/ChevronLeftIcon';
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon';

const steps = [
  'Victim Details',
  'Incident Details',
  'Medical Examination',
  'FIR Compliance',
  'POCSO/BNS Checks',
  'Review & Save'
];

const StepContent: React.FC<{ step: number }> = ({ step }) => {
  // Common input styles
  const inputClasses = "mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md text-sm shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500";
  const labelClasses = "block text-sm font-medium text-text-light-secondary dark:text-dark-secondary";

  switch (step) {
    case 0:
      return (
        <div className="space-y-4">
          <div><label className={labelClasses}>Name / Alias</label><input type="text" className={inputClasses} placeholder="Enter victim's name" /></div>
          <div><label className={labelClasses}>Age</label><input type="number" className={inputClasses} placeholder="Enter victim's age" /></div>
          <div><label className={labelClasses}>Guardian's Name</label><input type="text" className={inputClasses} placeholder="Enter guardian's name" /></div>
        </div>
      );
    case 1:
      return (
        <div className="space-y-4">
          <div><label className={labelClasses}>Date of Incident</label><input type="date" className={inputClasses} /></div>
          <div><label className={labelClasses}>Location of Incident</label><input type="text" className={inputClasses} placeholder="e.g., Near Calangute Beach" /></div>
          <div><label className={labelClasses}>Brief Description</label><textarea className={inputClasses} rows={4} placeholder="Summarize the incident..."></textarea></div>
        </div>
      );
    case 2:
      return (
        <div className="space-y-4">
          <div><label className={labelClasses}>Date of Medical Exam</label><input type="date" className={inputClasses} /></div>
          <div><label className={labelClasses}>Hospital Name</label><input type="text" className={inputClasses} placeholder="Goa Medical College" /></div>
          <div><label className={labelClasses}>Attending Doctor</label><input type="text" className={inputClasses} placeholder="Dr. Name" /></div>
        </div>
      );
     case 3:
      return (
        <div className="space-y-4">
           <div className="flex items-center"><input id="fir" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" /><label htmlFor="fir" className="ml-2 block text-sm">FIR copy provided to victim/guardian</label></div>
           <div className="flex items-center"><input id="child" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" /><label htmlFor="child" className="ml-2 block text-sm">Child Welfare Committee informed</label></div>
        </div>
      );
    case 4:
       return (
        <div className="space-y-4">
           <div className="flex items-center"><input id="pocso" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" /><label htmlFor="pocso" className="ml-2 block text-sm">Relevant POCSO sections applied</label></div>
           <div className="flex items-center"><input id="bns" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" /><label htmlFor="bns" className="ml-2 block text-sm">Relevant BNS sections applied</label></div>
        </div>
      );
    case 5:
      return <p>Review all entered details before saving. This section will show a summary of all previous steps.</p>;
    default:
      return <p>Unknown Step</p>;
  }
};

const NewCaseChecklist: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        // TODO: Implement actual auto-save logic to local storage or backend
        console.log('Auto-saving form progress...', new Date().toLocaleTimeString());
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, []);


  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-2 text-center">New Case Checklist</h1>
      <p className="text-center text-text-light-secondary dark:text-dark-secondary mb-8">Follow these steps to ensure full compliance.</p>
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${index <= currentStep ? 'bg-primary-600' : 'bg-gray-300 dark:bg-slate-600'}`}>
                    {index < currentStep ? '✓' : index + 1}
                    </div>
                    <p className={`mt-2 text-xs text-center ${index <= currentStep ? 'text-primary-600 dark:text-primary-400 font-semibold' : ''}`}>{step}</p>
                </div>
                {index < steps.length - 1 && <div className={`flex-1 h-1 mx-2 ${index < currentStep ? 'bg-primary-600' : 'bg-gray-300 dark:bg-slate-600'}`}></div>}
                </React.Fragment>
            ))}
        </div>
      </div>

      <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg min-h-[250px]">
        <h2 className="text-2xl font-semibold mb-4">{steps[currentStep]}</h2>
        <StepContent step={currentStep} />
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center px-4 py-2 bg-gray-200 dark:bg-slate-700 text-text-light-primary dark:text-dark-primary rounded-md disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Previous
        </button>
        {currentStep < steps.length - 1 ? (
          <button
            onClick={nextStep}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Next
            <ChevronRightIcon className="w-5 h-5 ml-2" />
          </button>
        ) : (
          <div className="space-x-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
             Save Case
            </button>
             <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
             Export as PDF/Word
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCaseChecklist;
