"use client";
import React, { useState } from "react";
import CustomAlert from "@/components/ui/CustomAlert";
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
  const numbersOnly = /^[0-9+\-\s()]+$/;
  if (!numbersOnly.test(contactNumber)) {
    return "Contact number must contain only numbers and valid characters";
  }
  if (contactNumber.replace(/[^0-9]/g, '').length < 10) {
    return "Contact number must be at least 10 digits";
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

const validateDateTime = (dateTime) => {
  if (!dateTime) {
    return "Please select a preferred date and time";
  }
  const selectedDate = new Date(dateTime);
  const now = new Date();
  
  if (selectedDate <= now) {
    return "Please select a future date and time";
  }
  return null;
};

// InputField component
const InputField = ({ 
  label, 
  type = "text", 
  field, 
  placeholder, 
  required = true, 
  multiline = false, 
  formData, 
  activeTab, 
  handleInputChange, 
  errors,
  options = []
}) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-white mb-2">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {type === "select" ? (
      <select
        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
        value={formData[activeTab][field] || ""}
        onChange={(e) => handleInputChange(field, e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : multiline ? (
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

export default function ContactForms() {
  const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });
  const [activeTab, setActiveTab] = useState("consultancy");
  const [formData, setFormData] = useState({
    consultancy: {
      fullName: "",
      email: "",
      phoneNumber: "",
      serviceInterest: "",
      message: ""
    },
    bookCall: {
      fullName: "",
      email: "",
      phoneNumber: "",
      preferredDateTime: "",
      topicDiscussion: "",
      additionalNotes: ""
    }
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check URL hash on component mount to set active tab
  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#book-call') {
      setActiveTab('bookCall');
    } else if (hash === '#consultancy') {
      setActiveTab('consultancy');
    }
  }, []);

  const serviceOptions = [
    { value: "web-development", label: "Web Development" },
    { value: "mobile-development", label: "Mobile Development" },
    { value: "digital-marketing", label: "Digital Marketing" },
    { value: "seo", label: "SEO Services" },
    { value: "social-media", label: "Social Media Management" },
    { value: "paid-ads", label: "Paid Advertising" },
    { value: "cloud-services", label: "Cloud Services" },
    { value: "consulting", label: "Business Consulting" },
    { value: "other", label: "Other" }
  ];

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

  const validateForm = () => {
    const newErrors = {};
    const data = formData[activeTab];

    // Common validations
    const nameError = validateRequiredField(data.fullName, "Full Name");
    if (nameError) newErrors.fullName = nameError;

    const emailError = validateEmail(data.email);
    if (emailError) newErrors.email = emailError;

    // Tab-specific validations
    if (activeTab === 'consultancy') {
      // Phone is optional for consultancy
      if (data.phoneNumber && data.phoneNumber.trim()) {
        const phoneError = validateContactNumber(data.phoneNumber);
        if (phoneError) newErrors.phoneNumber = phoneError;
      }

      const serviceError = validateRequiredField(data.serviceInterest, "Service/Area of Interest");
      if (serviceError) newErrors.serviceInterest = serviceError;

      const messageError = validateRequiredField(data.message, "Message / Problem Description");
      if (messageError) newErrors.message = messageError;

    } else if (activeTab === 'bookCall') {
      // Phone is required for booking call
      const phoneError = validateContactNumber(data.phoneNumber);
      if (phoneError) newErrors.phoneNumber = phoneError;

      const dateTimeError = validateDateTime(data.preferredDateTime);
      if (dateTimeError) newErrors.preferredDateTime = dateTimeError;

      const topicError = validateRequiredField(data.topicDiscussion, "Topic of Discussion / Service Needed");
      if (topicError) newErrors.topicDiscussion = topicError;
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
        message: 'Please check your form for any errors' 
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const endpoint = activeTab === 'consultancy' ? '/api/consultancy' : '/api/book-call';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData[activeTab])
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setAlert({ 
          open: true, 
          type: 'success', 
          message: activeTab === 'consultancy' 
            ? 'Your consultation request has been submitted successfully! We\'ll get back to you soon.'
            : 'Your call has been scheduled successfully! We\'ll contact you at the specified time.'
        });
        
        // Reset form
        setFormData(prev => ({
          ...prev,
          [activeTab]: activeTab === 'consultancy' 
            ? { fullName: "", email: "", phoneNumber: "", serviceInterest: "", message: "" }
            : { fullName: "", email: "", phoneNumber: "", preferredDateTime: "", topicDiscussion: "", additionalNotes: "" }
        }));
      } else {
        setAlert({ 
          open: true, 
          type: 'error', 
          message: result.message || 'Submission failed. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setAlert({ 
        open: true, 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-forms" className="relative w-full max-w-6xl mx-auto p-6 mt-20">
      <CustomAlert 
        open={alert.open} 
        type={alert.type} 
        message={alert.message} 
        onClose={() => setAlert(a => ({ ...a, open: false }))} 
      />
      
      {/* Background effect similar to Join component */}
      <div className="absolute inset-0 h-full w-full scale-[0.95] transform rounded-2xl bg-gradient-to-r from-blue-500 to-[#010618] blur-3xl opacity-40 pointer-events-none" />

      <div className="relative z-20 rounded-2xl border border-gray-800 bg-black/70 backdrop-blur-sm p-8 shadow-xl overflow-hidden">
        {/* Meteor animation */}
        <Meteors number={20} />
        
        {/* Hidden anchor points for navigation */}
        <div id="consultancy" className="absolute -top-20"></div>
        <div id="book-call" className="absolute -top-20"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get In Touch With Us
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Ready to take your business to the next level? Choose how you&apos;d like to connect with our experts.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8 border-b border-gray-700 gap-2">
            {[
              { key: 'consultancy', label: 'Get Free Consultancy', icon: '' },
              { key: 'bookCall', label: 'Book a Call', icon: '' }
            ].map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <motion.button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    // Update URL hash without page reload
                    window.history.pushState(null, null, `#${tab.key === 'consultancy' ? 'consultancy' : 'book-call'}`);
                  }}
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
              {/* Free Consultancy Form */}
              {activeTab === 'consultancy' && (
                <>
                  <InputField 
                    label="Full Name" 
                    field="fullName" 
                    placeholder="Enter your full name" 
                    formData={formData} 
                    activeTab={activeTab} 
                    handleInputChange={handleInputChange} 
                    errors={errors} 
                  />
                  <InputField 
                    label="Email Address" 
                    type="email" 
                    field="email" 
                    placeholder="your@email.com" 
                    formData={formData} 
                    activeTab={activeTab} 
                    handleInputChange={handleInputChange} 
                    errors={errors} 
                  />
                  <InputField 
                    label="Phone Number" 
                    field="phoneNumber" 
                    placeholder="+1 234 567 8900" 
                    required={false}
                    formData={formData} 
                    activeTab={activeTab} 
                    handleInputChange={handleInputChange} 
                    errors={errors} 
                  />
                  <InputField 
                    label="Service/Area of Interest" 
                    type="select"
                    field="serviceInterest" 
                    placeholder="Select a service..." 
                    options={serviceOptions}
                    formData={formData} 
                    activeTab={activeTab} 
                    handleInputChange={handleInputChange} 
                    errors={errors} 
                  />
                  <div className="md:col-span-2">
                    <InputField 
                      label="Message / Problem Description" 
                      field="message" 
                      placeholder="Tell us briefly about your requirement..." 
                      multiline
                      formData={formData} 
                      activeTab={activeTab} 
                      handleInputChange={handleInputChange} 
                      errors={errors}
                    />
                  </div>
                </>
              )}

              {/* Book Call Form */}
              {activeTab === 'bookCall' && (
                <>
                  <InputField 
                    label="Full Name" 
                    field="fullName" 
                    placeholder="Enter your full name" 
                    formData={formData} 
                    activeTab={activeTab} 
                    handleInputChange={handleInputChange} 
                    errors={errors} 
                  />
                  <InputField 
                    label="Email Address" 
                    type="email" 
                    field="email" 
                    placeholder="your@email.com" 
                    formData={formData} 
                    activeTab={activeTab} 
                    handleInputChange={handleInputChange} 
                    errors={errors} 
                  />
                  <InputField 
                    label="Phone Number" 
                    field="phoneNumber" 
                    placeholder="+1 234 567 8900" 
                    formData={formData} 
                    activeTab={activeTab} 
                    handleInputChange={handleInputChange} 
                    errors={errors} 
                  />
                  <InputField 
                    label="Preferred Date &amp; Time" 
                    type="datetime-local" 
                    field="preferredDateTime" 
                    placeholder="" 
                    formData={formData} 
                    activeTab={activeTab} 
                    handleInputChange={handleInputChange} 
                    errors={errors} 
                  />
                  <div className="md:col-span-2">
                    <InputField 
                      label="Topic of Discussion / Service Needed" 
                      field="topicDiscussion" 
                      placeholder="Brief description of what you'd like to discuss..." 
                      formData={formData} 
                      activeTab={activeTab} 
                      handleInputChange={handleInputChange} 
                      errors={errors}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <InputField 
                      label="Additional Notes" 
                      field="additionalNotes" 
                      placeholder="Anything specific you'd like us to prepare before the call?" 
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
                {isSubmitting ? 'Submitting...' : 
                  activeTab === 'consultancy' ? 'Get My Free Consultancy' : 'Book My Call'
                }
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
