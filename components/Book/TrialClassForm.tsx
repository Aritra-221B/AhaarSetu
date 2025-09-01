'use client';
import React, { useState, useRef, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

import BasicDetailsForm from './BasicDetailsForm';
import ClassDetailsForm from './ClassDetailsForm';
import SchedulePreferencesForm from './SchedulePreferencesForm';
import StepProgressBar from './StepProgressBar';
import { FormSubmissionData, ApiResponse } from '../../types';

const TrialClassForm = () => {
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [editableStep, setEditableStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const [uniqueUserIdentifier, setUniqueUserIdentifier] = useState<string>('');

  const basicDetailsRef = useRef<HTMLDivElement | null>(null);
  const classDetailsRef = useRef<HTMLDivElement | null>(null);
  const schedulePreferencesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Generate or retrieve unique ID for the user session
    let id = localStorage.getItem('chordscraft_unique_id');
    if (!id) {
      id = Date.now().toString(36) + Math.random().toString(36).substring(2);
      localStorage.setItem('chordscraft_unique_id', id);
    }
    setUniqueUserIdentifier(id);

    let refToScroll = null;
    switch (step) {
      case 1: refToScroll = basicDetailsRef; break;
      case 2: refToScroll = classDetailsRef; break;
      case 3: refToScroll = schedulePreferencesRef; break;
    }

    if (refToScroll?.current) {
      // Adjust scroll offset based on screen size
      const isMobile = window.innerWidth < 768;
      const yOffset = isMobile ? -120 : -265;
      const y = refToScroll.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [step]);

  const stepLabels = ['Basic Details', 'Class Details', 'Schedule Preferences'];

  const [basicDetails, setBasicDetails] = useState({ name: '', phone: '', email: '', countryCode: '+91' });
  const [classDetails, setClassDetails] = useState({ age: '', gender: '', course: '', skill: '' });
  const [scheduleDetails, setScheduleDetails] = useState({ country: '', date: '', time: '', consent: false });

  const handleBasicChange = (field: string, value: string) => setBasicDetails(prev => ({ ...prev, [field]: value }));
  const handleClassChange = (field: string, value: string) => setClassDetails(prev => ({ ...prev, [field]: value }));
  const handleScheduleChange = (field: string, value: string | boolean) =>
    setScheduleDetails(prev => ({ ...prev, [field]: value }));

  const handleBasicNext = async () => {
    setIsLoading(true); // Set loading to true
    const submissionData: FormSubmissionData = {
      uniqueId: '', // Will be generated server-side
      name: basicDetails.name,
      phone: basicDetails.phone,
      email: basicDetails.email,
      countryCode: basicDetails.countryCode,
      age: '', gender: '', course: '', skill: '', // Basic form doesn't have these, send as empty
      country: '', date: '', time: '', consent: false, // Basic form doesn't have these, send as empty
      status: "Pending", // Initial status
      formLevel: "BasicDetails", // Indicate the form type
    };

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...submissionData,
          uniqueId: uniqueUserIdentifier, // Add the unique ID from state
        }),
      });

      const result: ApiResponse = await response.json();

      if (result.success) {
        toast.success("Basic details saved! Now tell us about your class preferences.");
        setCompletedSteps(prev => [...new Set([...prev, 1])]);
        setEditableStep(2);
        setStep(2);
      } else {
        toast.error(result.message || "Failed to save basic details. Please try again.");
      }
    } catch (error) {
      console.error('Basic details submission error:', error);
      toast.error("An unexpected error occurred while saving basic details. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleClassNext = async () => {
    setIsLoading(true); // Set loading to true
    const submissionData: FormSubmissionData = {
      uniqueId: '', // Will be generated server-side
      name: basicDetails.name,
      phone: basicDetails.phone,
      email: basicDetails.email,
      countryCode: basicDetails.countryCode,
      age: classDetails.age,
      gender: classDetails.gender,
      course: classDetails.course,
      skill: classDetails.skill,
      country: '', date: '', time: '', consent: false, // Class form doesn't have these, send as empty
      status: "Pending",
      formLevel: "ClassDetails", // Indicate the form type
    };

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...submissionData,
          uniqueId: uniqueUserIdentifier, // Add the unique ID from state
        }),
      });

      const result: ApiResponse = await response.json();

      if (result.success) {
        toast.success("Class details updated! Let's schedule your trial class.");
        setCompletedSteps(prev => [...new Set([...prev, 2])]);
        setEditableStep(3);
        setStep(3);
      } else {
        toast.error(result.message || "Failed to update class details. Please try again.");
      }
    } catch (error) {
      console.error('Class details submission error:', error);
      toast.error("An unexpected error occurred while updating class details. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleEdit = (targetStep: number) => {
    setEditableStep(targetStep);
    setStep(targetStep);
    setCompletedSteps(prev => prev.filter((s) => s !== targetStep));
  };

  const handleFinalSubmit = async () => {
    setIsLoading(true); // Set loading to true on submission
    const submissionData: FormSubmissionData = {
      name: basicDetails.name,
      phone: basicDetails.phone,
      email: basicDetails.email,
      countryCode: basicDetails.countryCode,
      age: classDetails.age,
      gender: classDetails.gender,
      course: classDetails.course,
      skill: classDetails.skill,
      country: scheduleDetails.country,
      date: scheduleDetails.date,
      time: scheduleDetails.time,
      consent: scheduleDetails.consent,
      // These will be added server-side but are included for type completeness
      uniqueId: '', // Placeholder, will be generated server-side
      status: "Pending", // Initial status
      formLevel: "SchedulePreferences", // Indicate the form type
    };

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...submissionData,
          uniqueId: uniqueUserIdentifier, // Add the unique ID from state
        }),
      });

      const result: ApiResponse = await response.json();

      if (result.success) {
        toast.success("Your trial class request has been submitted successfully!");
        localStorage.removeItem('chordscraft_unique_id'); // Clear unique ID on successful submission
        // Optionally, reset form or redirect
        console.log('Submitted data:', submissionData);
      } else {
        toast.error(result.message || "Failed to submit your trial class request. Please try again.");
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
  
  const handleStepClick = (clickedStep: number) => {
    if (clickedStep <= step) {
      setStep(clickedStep);
    } else {
      toast.error('Please complete the current form and save to continue.');
    }
  };

  const handleValidationFail = () => {
    toast.error("Please fill in all the required details to save & continue.");
  };

  return (
    <div className="space-y-5 sm:space-y-6 md:space-y-8 lg:space-y-12 flex flex-col items-center px-4 sm:px-6 md:px-8 pt-[15vh] sm:pt-[15vh] md:pt-[15vh] lg:pt-[15vh]">
      <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
      {/* Fixed Step Progress Bar - Responsive positioning */}
      <div className="sticky top-[12vh] sm:top-[12vh] md:top-[12vh] lg:top-[12vh] left-0 w-full z-[999] flex justify-center bg-gradient-to-b from-purple-900/20 via-purple-900/10 to-transparent py-6">
        <div className="w-full max-w-[800px] px-4 sm:px-6 md:px-8">
          <StepProgressBar currentStep={step} steps={stepLabels} onStepClick={handleStepClick} />
        </div>
      </div>

      {step >= 1 && (
        <motion.div
          key="basic-details"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full sm:w-[600px] md:w-[700px] lg:w-[800px]"
          ref={basicDetailsRef}
        >
          <BasicDetailsForm
            data={basicDetails}
            onChange={handleBasicChange}
            onNext={handleBasicNext}
            isEditing={editableStep === 1}
            isCompleted={completedSteps.includes(1)}
            onEditToggle={() => handleEdit(1)}
            onValidationFail={handleValidationFail} // Pass the handler
          />
        </motion.div>
      )}

      {step >= 2 && (
        <motion.div
          key="class-details"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full sm:w-[600px] md:w-[700px] lg:w-[800px]"
          ref={classDetailsRef}
        >
          <ClassDetailsForm
            data={classDetails}
            onChange={handleClassChange}
            onNext={handleClassNext}
            isEditing={editableStep === 2}
            isCompleted={completedSteps.includes(2)}
            onEditToggle={() => handleEdit(2)}
            onValidationFail={handleValidationFail} // Pass the handler
          />
        </motion.div>
      )}

      {step >= 3 && (
        <motion.div
          key="schedule-preferences"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full sm:w-[600px] md:w-[700px] lg:w-[800px]"
          ref={schedulePreferencesRef}
        >
          <SchedulePreferencesForm
            data={scheduleDetails}
            onChange={handleScheduleChange}
            onSubmit={handleFinalSubmit}
            onValidationFail={handleValidationFail} // Pass the handler
            isLoading={isLoading} // Pass the new isLoading prop
          />
        </motion.div>
      )}
    </div>
  );
};

export default TrialClassForm;
