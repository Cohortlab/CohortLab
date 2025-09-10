"use client";
import React, { useState } from "react";
import CustomAlert from "@/components/ui/CustomAlert";
import { FileUpload } from "@/components/ui/file-upload";
import { Meteors } from "@/components/ui/meteors";
import { motion } from "motion/react";

// Custom validation functions
const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return "Email is required";
  }
  if (!email.includes(".com")) {
    return "Email must contain '.com'";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

const validateContactNumber = (contactNumber) => {
  if (!contactNumber || !contactNumber.trim()) {
    return "Contact number is required";
  }
  const numbersOnly = /^[0-9]+$/;
  if (!numbersOnly.test(contactNumber.replace(/\s/g, ''))) {
    return "Contact number must contain only numbers";
  }
  if (contactNumber.replace(/\s/g, '').length < 10) {
    return "Contact number must be at least 10 digits";
  }
  return null;
};

const validateGithubUrl = (url) => {
  if (!url || !url.trim()) {
    return "GitHub URL is required";
  }
  if (!url.includes("github.com")) {
    return "GitHub URL must contain 'github.com'";
  }
  try {
    new URL(url);
  } catch {
    return "Please provide a valid GitHub URL";
  }
  return null;
};

const validateLinkedinUrl = (url) => {
  if (!url || !url.trim()) {
    return "LinkedIn URL is required";
  }
  if (!url.includes("linkedin.com")) {
    return "LinkedIn URL must contain 'linkedin.com'";
  }
  try {
    new URL(url);
  } catch {
    return "Please provide a valid LinkedIn URL";
  }
  return null;
};

const validateDriveUrl = (url) => {
  if (!url || !url.trim()) {
    return "Google Drive resume link is required";
  }
  if (!url.includes("drive")) {
    return "URL must contain 'drive'";
  }
  try {
    new URL(url);
  } catch {
    return "Please provide a valid Google Drive URL";
  }
  return null;
};

const validateUrl = (url, fieldName) => {
  if (!url || !url.trim()) {
    return `${fieldName} is required`;
  }
  try {
    new URL(url);
  } catch {
    return `Please provide a valid ${fieldName.toLowerCase()}`;
  }
  return null;
};

const validateRequiredField = (value, fieldName) => {
  if (!value || !value.trim()) {
    return `${fieldName} is required`;
  }
  if (value.trim().length < 2) {
    return `${fieldName} must be at least 2 characters`;
  }
  return null;
};

// InputField component moved outside to prevent re-creation
const InputField = ({ label, type = "text", field, placeholder, required = true, multiline = false, formData, activeTab, handleInputChange, errors }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-white mb-2">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {multiline ? (
      <textarea
        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
        rows={4}
        placeholder={placeholder}
        value={formData[activeTab][field] || ""}
        onChange={(e) => handleInputChange(field, e.target.value)}
      />
    ) : (
      <input
        type={type}
        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
        placeholder={placeholder}
        value={formData[activeTab][field] || ""}
        onChange={(e) => handleInputChange(field, e.target.value)}
      />
    )}
    {errors[field] && (
      <p className="text-red-400 text-sm mt-1">{errors[field]}</p>
    )}
  </div>
);

export default function Join() {
  const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });
  const [activeTab, setActiveTab] = useState("developer");
  const [formData, setFormData] = useState({
    developer: {
      name: "", email: "", contactNumber: "", githubUrl: "", 
      liveProjects: "", techStack: "", linkedinUrl: "", portfolioWebsite: "", 
      resume: null, resumeGoogleDriveUrl: ""
    },
    marketer: {
      name: "", email: "", contactNumber: "", pastWorks: "", 
      linkedinUrl: "", portfolioWebsite: "", resume: null, resumeGoogleDriveUrl: ""
    },
    partner: {
      name: "", email: "", contactNumber: "", linkedinUrl: "", message: ""
    }
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value
      }
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleFileUpload = (files) => {
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          resume: files[0]
        }
      }));
      // Clear resume error if it exists
      if (errors.resume) {
        setErrors(prev => ({ ...prev, resume: null }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const data = formData[activeTab];

    // Common validations for all tabs
    const nameError = validateRequiredField(data.name, "Name");
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(data.email);
    if (emailError) newErrors.email = emailError;

    // Tab-specific validations
    if (activeTab === 'developer') {
      const contactError = validateContactNumber(data.contactNumber);
      if (contactError) newErrors.contactNumber = contactError;

      const githubError = validateGithubUrl(data.githubUrl);
      if (githubError) newErrors.githubUrl = githubError;

      const projectsError = validateRequiredField(data.liveProjects, "Live Projects");
      if (projectsError) newErrors.liveProjects = projectsError;

      const techStackError = validateRequiredField(data.techStack, "Tech Stack");
      if (techStackError) newErrors.techStack = techStackError;

      const linkedinError = validateLinkedinUrl(data.linkedinUrl);
      if (linkedinError) newErrors.linkedinUrl = linkedinError;

      const portfolioError = validateUrl(data.portfolioWebsite, "Portfolio Website");
      if (portfolioError) newErrors.portfolioWebsite = portfolioError;

      const driveError = validateDriveUrl(data.resumeGoogleDriveUrl);
      if (driveError) newErrors.resumeGoogleDriveUrl = driveError;

    } else if (activeTab === 'marketer') {
      const contactError = validateContactNumber(data.contactNumber);
      if (contactError) newErrors.contactNumber = contactError;

      const linkedinError = validateLinkedinUrl(data.linkedinUrl);
      if (linkedinError) newErrors.linkedinUrl = linkedinError;

      // Portfolio website is optional for marketers
      if (data.portfolioWebsite && data.portfolioWebsite.trim()) {
        const portfolioError = validateUrl(data.portfolioWebsite, "Portfolio Website");
        if (portfolioError) newErrors.portfolioWebsite = portfolioError;
      }

      const driveError = validateDriveUrl(data.resumeGoogleDriveUrl);
      if (driveError) newErrors.resumeGoogleDriveUrl = driveError;

    } else if (activeTab === 'partner') {
      // Contact number is optional for partners
      if (data.contactNumber && data.contactNumber.trim()) {
        const contactError = validateContactNumber(data.contactNumber);
        if (contactError) newErrors.contactNumber = contactError;
      }

      // LinkedIn is optional for partners
      if (data.linkedinUrl && data.linkedinUrl.trim()) {
        const linkedinError = validateLinkedinUrl(data.linkedinUrl);
        if (linkedinError) newErrors.linkedinUrl = linkedinError;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setAlert({ 
        open: true, 
        type: 'error', 
        message: 'Re-check your form, as it has some issue' 
      });
      return;
    }

    setIsSubmitting(true);
    try {
      let response;
      if (activeTab === 'partner') {
        response = await fetch(`/api/${activeTab}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData[activeTab])
        });
      } else {
        const formDataToSend = new FormData();
        Object.keys(formData[activeTab]).forEach(key => {
          if (key !== 'resume' && formData[activeTab][key]) {
            formDataToSend.append(key, formData[activeTab][key]);
          }
        });
        
        // Handle resume - either file or Google Drive URL
        if (formData[activeTab].resume) {
          formDataToSend.append('resume', formData[activeTab].resume);
        } else if (formData[activeTab].resumeGoogleDriveUrl?.trim()) {
          formDataToSend.append('resumeGoogleDriveUrl', formData[activeTab].resumeGoogleDriveUrl);
        }
        response = await fetch(`/api/${activeTab}`, {
          method: 'POST',
          body: formDataToSend
        });
      }
      const result = await response.json();
      if (response.ok) {
        setAlert({ open: true, type: 'success', message: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} application submitted successfully!` });
        setFormData(prev => ({
          ...prev,
          [activeTab]: activeTab === 'developer' 
            ? { name: "", email: "", contactNumber: "", githubUrl: "", liveProjects: "", techStack: "", linkedinUrl: "", portfolioWebsite: "", resume: null, resumeGoogleDriveUrl: "" }
            : activeTab === 'marketer'
            ? { name: "", email: "", contactNumber: "", pastWorks: "", linkedinUrl: "", portfolioWebsite: "", resume: null, resumeGoogleDriveUrl: "" }
            : { name: "", email: "", contactNumber: "", linkedinUrl: "", message: "" }
        }));
      } else {
        setAlert({ open: true, type: 'error', message: result.message || 'Submission failed. Please check and try again.' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setAlert({ open: true, type: 'error', message: 'Submission failed. Please check and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto p-6">
      <CustomAlert open={alert.open} type={alert.type} message={alert.message} onClose={() => setAlert(a => ({ ...a, open: false }))} />
      {/* Background effect similar to Footer */}
      <div className="absolute inset-0 h-full w-full scale-[0.95] transform rounded-2xl bg-gradient-to-r from-blue-500 to-[#010618] blur-3xl opacity-40 pointer-events-none" />

      <div className="relative z-20 rounded-2xl border border-gray-800 bg-black/70 backdrop-blur-sm p-8 shadow-xl overflow-hidden">
        {/* Meteor animation */}
        <Meteors number={20} />
        
        <div className="relative z-10">
          {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center mb-8 border-b border-gray-700 gap-2">
              {[
                { key: 'developer', label: 'I am a Developer', icon: '' },
                { key: 'marketer', label: 'I am a Marketer', icon: '' },
                { key: 'partner', label: 'Want to join as Partner', icon: '' }
              ].map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <motion.button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    initial={false}
                    animate={isActive ? { scale: 1.08 } : { scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    className={`relative px-7 py-3 mx-1 mb-4 rounded-xl font-semibold overflow-hidden focus:outline-none transition-all duration-300
                      ${isActive
                        ? 'text-white bg-gradient-to-r from-sky-800 to-cyan-900 border-2 border-sky-400 shadow-lg'
                        : 'text-gray-300 bg-[#010618] border-2 border-transparent hover:text-white hover:border-sky-700'}
                    `}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ zIndex: isActive ? 2 : 1 }}
                  >
                    <span className="mr-2 text-lg">{tab.icon}</span>
                    <span className="relative z-10">{tab.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="tab-bg"
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{
                          background: 'linear-gradient(90deg, #38bdf8 0%, #010618 100%)',
                          opacity: 0.18,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

          {/* Form Content */}
          <motion.form
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Developer Form */}
              {activeTab === 'developer' && (
                <>
                  <InputField label="Full Name" field="name" placeholder="Enter your full name" formData={formData} activeTab={activeTab} handleInputChange={handleInputChange} errors={errors} />
                  <InputField label="Email Address" type="email" field="email" placeholder="your@email.com" formData={formData} activeTab={activeTab} handleInputChange={handleInputChange} errors={errors} />
                  <InputField label="Contact Number" field="contactNumber" placeholder="+1 234 567 8900" formData={formData} activeTab={activeTab} handleInputChange={handleInputChange} errors={errors} />
                  <InputField label="GitHub URL" type="url" field="githubUrl" placeholder="https://github.com/username" formData={formData} activeTab={activeTab} handleInputChange={handleInputChange} errors={errors} />
                  <div className="md:col-span-2">
                    <InputField 
                      label="Live Projects URLs" 
                      field="liveProjects" 
                      placeholder="https://project1.com, https://project2.com" 
                      multiline
                      formData={formData} 
                      activeTab={activeTab} 
                      handleInputChange={handleInputChange} 
                      errors={errors}
                    />
                  </div>
                  <InputField 
                    label="Tech Stack" 
                    field="techStack" 
                    placeholder="ReactJS, Python, Web-Develop, Machine Learning etc." 
                    formData={formData} 
                    activeTab={activeTab} 
                    handleInputChange={handleInputChange} 
                    errors={errors}
                  />
                  <InputField label="LinkedIn URL" type="url" field="linkedinUrl" placeholder="https://linkedin.com/in/username" formData={formData} activeTab={activeTab} handleInputChange={handleInputChange} errors={errors} />
                  <InputField label="Portfolio Website" type="url" field="portfolioWebsite" placeholder="https://yourportfolio.com" formData={formData} activeTab={activeTab} handleInputChange={handleInputChange} errors={errors} />
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">
                      Resume Upload <span className="text-red-400">*</span>
                    </label>
                    <div className="space-y-4">
                      <div className="w-full max-w-4xl mx-auto min-h-32 border border-dashed bg-gray-900/30 border-gray-600 rounded-lg">
                        <FileUpload onChange={handleFileUpload} />
                      </div>
                      <div className="text-center text-gray-400 text-sm"></div>
                      <div className="mt-7">
                        <InputField 
                          label="Google Drive Resume Link" 
                          field="resumeGoogleDriveUrl" 
                          placeholder="https://drive.google.com/file/d/your-resume-id/view"
                          required={true}
                          formData={formData} 
                          activeTab={activeTab} 
                          handleInputChange={handleInputChange} 
                          errors={errors}
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Make sure your Google Drive link is publicly accessible
                        </p>
                      </div>
                    </div>
                    {errors.resumeGoogleDriveUrl && <p className="text-red-400 text-sm mt-1">{errors.resumeGoogleDriveUrl}</p>}
                  </div>
                </>
              )}

              {/* Marketer Form */}
              {activeTab === 'marketer' && (
                <>
                  <InputField label="Full Name" field="name" placeholder="Enter your full name" formData={formData} activeTab={activeTab} handleInputChange={handleInputChange} errors={errors} />
                  <InputField label="Email Address" type="email" field="email" placeholder="your@email.com" formData={formData} activeTab={activeTab} handleInputChange={handleInputChange} errors={errors} />
                  <InputField label="Contact Number" field="contactNumber" placeholder="+1 234 567 8900" formData={formData} activeTab={activeTab} handleInputChange={handleInputChange} errors={errors} />
                  <InputField label="LinkedIn URL" type="url" field="linkedinUrl" placeholder="https://linkedin.com/in/username" formData={formData} activeTab={activeTab} handleInputChange={handleInputChange} errors={errors} />
                  <div className="md:col-span-2">
                    <InputField 
                      label="Past Works (if any)" 
                      field="pastWorks" 
                      placeholder="Campaign 1, Campaign 2, Brand work, etc." 
                      required={false}
                      multiline
                      formData={formData} 
                      activeTab={activeTab} 
                      handleInputChange={handleInputChange} 
                      errors={errors}
                    />
                  </div>
                  <InputField 
                    label="Portfolio Website" 
                    type="url" 
                    field="portfolioWebsite" 
                    placeholder="https://yourportfolio.com" 
                    required={false}
                    formData={formData} 
                    activeTab={activeTab} 
                    handleInputChange={handleInputChange} 
                    errors={errors}
                  />
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">
                      Upload Resume <span className="text-red-400">*</span>
                    </label>
                    <div className="space-y-4">
                      <div className="w-full max-w-4xl mx-auto min-h-32 border border-dashed bg-gray-900/30 border-gray-600 rounded-lg">
                        <FileUpload onChange={handleFileUpload} />
                      </div>
                      <div className="text-center text-gray-400 text-sm"></div>
                      <div className="mt-7">
                        <InputField 
                          label="Google Drive Resume Link" 
                          field="resumeGoogleDriveUrl" 
                          placeholder="https://drive.google.com/file/d/your-resume-id/view"
                          required={true}
                          formData={formData} 
                          activeTab={activeTab} 
                          handleInputChange={handleInputChange} 
                          errors={errors}
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Make sure your Google Drive link is publicly accessible
                        </p>
                      </div>
                    </div>
                    {errors.resumeGoogleDriveUrl && <p className="text-red-400 text-sm mt-1">{errors.resumeGoogleDriveUrl}</p>}
                  </div>
                </>
              )}

              {/* Partner Form */}
              {activeTab === 'partner' && (
                <>
                  <InputField label="Full Name" field="name" placeholder="Enter your full name" formData={formData} activeTab={activeTab} handleInputChange={handleInputChange} errors={errors} />
                  <InputField label="Email Address" type="email" field="email" placeholder="your@email.com" formData={formData} activeTab={activeTab} handleInputChange={handleInputChange} errors={errors} />
                  <InputField label="Contact Number" field="contactNumber" placeholder="+1 234 567 8900" required={false} formData={formData} activeTab={activeTab} handleInputChange={handleInputChange} errors={errors} />
                  <InputField 
                    label="LinkedIn URL" 
                    type="url" 
                    field="linkedinUrl" 
                    placeholder="https://linkedin.com/in/username" 
                    required={false}
                    formData={formData} 
                    activeTab={activeTab} 
                    handleInputChange={handleInputChange} 
                    errors={errors}
                  />
                  <div className="md:col-span-2">
                    <InputField 
                      label="Your Message" 
                      field="message" 
                      placeholder="Tell us about your partnership ideas and goals..." 
                      required={false}
                      multiline
                      formData={formData} 
                      activeTab={activeTab} 
                      handleInputChange={handleInputChange} 
                      errors={errors}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 bg-gradient-to-r from-blue-600 to-[#010618] text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-[#010618] transition-all duration-200 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
                }`}
              >
                {isSubmitting ? 'Submitting...' : `Submit ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Application`}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
