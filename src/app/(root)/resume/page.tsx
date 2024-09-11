"use client"
import { useState } from 'react';
interface StepProps {
    nextStep: () => void;
    prevStep?: () => void;
  }

const ResumeBuilder = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Build Your Resume</h2>
        
        {/* Progress Bar */}
        <div className="flex justify-center space-x-4 mb-8">
          <div className={`w-10 h-10 flex items-center justify-center rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>1</div>
          <div className={`w-10 h-10 flex items-center justify-center rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>2</div>
          <div className={`w-10 h-10 flex items-center justify-center rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>3</div>
          <div className={`w-10 h-10 flex items-center justify-center rounded-full ${step >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>4</div>
        </div>

        {/* Step Content */}
        {step === 1 && <Step1 nextStep={nextStep} />}
        {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <Step3 nextStep={nextStep} prevStep={prevStep} />}
        {step === 4 && <Step4 prevStep={prevStep} />}

      </div>
    </div>
  );
};

const Step1 = ({ nextStep }: { nextStep: () => void }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Personal Information</h3>
      <form>
        <input type="text" placeholder="Full Name" className="w-full mb-4 p-3 border rounded-lg" />
        <input type="email" placeholder="Email Address" className="w-full mb-4 p-3 border rounded-lg" />
        <input type="text" placeholder="Phone Number" className="w-full mb-4 p-3 border rounded-lg" />
        <button type="button" onClick={nextStep} className="bg-blue-600 text-white px-6 py-3 rounded-lg">Next</button>
      </form>
    </div>
  );
};

const Step2 = ({ nextStep, prevStep }: StepProps) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Work Experience</h3>
      <form>
        <input type="text" placeholder="Job Title" className="w-full mb-4 p-3 border rounded-lg" />
        <input type="text" placeholder="Company Name" className="w-full mb-4 p-3 border rounded-lg" />
        <input type="text" placeholder="Years Worked" className="w-full mb-4 p-3 border rounded-lg" />
        <div className="flex justify-between">
          <button type="button" onClick={prevStep} className="bg-gray-400 text-white px-6 py-3 rounded-lg">Back</button>
          <button type="button" onClick={nextStep} className="bg-blue-600 text-white px-6 py-3 rounded-lg">Next</button>
        </div>
      </form>
    </div>
  );
};

const Step3 = ({ nextStep, prevStep }: StepProps) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Education</h3>
      <form>
        <input type="text" placeholder="Degree" className="w-full mb-4 p-3 border rounded-lg" />
        <input type="text" placeholder="School/University" className="w-full mb-4 p-3 border rounded-lg" />
        <input type="text" placeholder="Years Attended" className="w-full mb-4 p-3 border rounded-lg" />
        <div className="flex justify-between">
          <button type="button" onClick={prevStep} className="bg-gray-400 text-white px-6 py-3 rounded-lg">Back</button>
          <button type="button" onClick={nextStep} className="bg-blue-600 text-white px-6 py-3 rounded-lg">Next</button>
        </div>
      </form>
    </div>
  );
};

const Step4 = ({ prevStep }:{prevStep:()=>void}) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Skills</h3>
      <form>
        <input type="text" placeholder="Skill 1" className="w-full mb-4 p-3 border rounded-lg" />
        <input type="text" placeholder="Skill 2" className="w-full mb-4 p-3 border rounded-lg" />
        <input type="text" placeholder="Skill 3" className="w-full mb-4 p-3 border rounded-lg" />
        <div className="flex justify-between">
          <button type="button" onClick={prevStep} className="bg-gray-400 text-white px-6 py-3 rounded-lg">Back</button>
          <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg">Finish & Generate PDF</button>
        </div>
      </form>
    </div>
  );
};

export default ResumeBuilder;
