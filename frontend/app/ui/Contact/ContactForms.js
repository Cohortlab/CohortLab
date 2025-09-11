"use client";
import React, { useState } from "react";
import toast from 'react-hot-toast';
import { Meteors } from "@/components/ui/meteors";
import { motion } from "motion/react";
import getConfig from '@/lib/config';

const API_BASE_URL = getConfig().api.baseUrl;

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
    },
    directContact: {
      // No form fields needed - just display contact info
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
    } else if (hash === '#direct-contact') {
      setActiveTab('directContact');
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
    console.log('Form submission started');
    
    if (!validateForm()) {
      toast.error('Please check your form for any errors');
      return;
    }

    setIsSubmitting(true);
    console.log('Showing initial toast...');
    
    // Show thanks
    toast.success('Thank you! We will reach you soon.', {
      duration: 4000,
      position: 'top-center',
    });

    try {
      const endpoint = activeTab === 'consultancy' ? 'consultancy' : 'book-call';
      console.log('Making API call to:', `${API_BASE_URL}/${endpoint}`);
      
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData[activeTab])
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Update with more detailed success message after API response
        setTimeout(() => {
          toast.success(
            activeTab === 'consultancy' 
              ? 'Your consultation request has been submitted successfully! We\'ll get back to you soon.'
              : 'Your call has been scheduled successfully! We\'ll contact you at the specified time.',
            {
              duration: 6000,
              position: 'top-center',
            }
          );
        }, 1500); // Show detailed message after 1.5 seconds
        
        // Reset form
        setFormData(prev => ({
          ...prev,
          [activeTab]: activeTab === 'consultancy' 
            ? { fullName: "", email: "", phoneNumber: "", serviceInterest: "", message: "" }
            : { fullName: "", email: "", phoneNumber: "", preferredDateTime: "", topicDiscussion: "", additionalNotes: "" }
        }));
      } else {
        toast.error(result.message || 'Submission failed. Please try again.', {
          duration: 5000,
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Network error. Please check your connection and try again.', {
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-forms" className="relative w-full max-w-6xl mx-auto p-6 mt-20">
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
              { key: 'bookCall', label: 'Book a Call', icon: '' },
              { key: 'directContact', label: 'Direct Contact', icon: '' }
            ].map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <motion.button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    // Update URL hash without page reload
                    const hashMap = {
                      'consultancy': 'consultancy',
                      'bookCall': 'book-call',
                      'directContact': 'direct-contact'
                    };
                    window.history.pushState(null, null, `#${hashMap[tab.key]}`);
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
            <div className={`grid ${activeTab === 'directContact' ? 'grid-cols-1 justify-center' : 'grid-cols-1 md:grid-cols-2'} gap-6`}>
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

              {/* Direct Contact Section */}
              {activeTab === 'directContact' && (
                <div className="relative min-h-[400px] flex justify-center items-center">
                  {/* Animated Orbs/Lines Background for right section */}
                  <div className="hidden md:block absolute right-0 top-0 h-full w-1/2 z-0 pointer-events-none">
                    {/* Floating Orbs */}
                    <div className="absolute left-1/4 top-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#010618] via-gray-400/40 to-white/30 blur-2xl animate-pulse-slow" style={{animationDelay: '0s'}}></div>
                    <div className="absolute right-8 top-32 w-24 h-24 rounded-full bg-gradient-to-br from-teal-900/80 via-white/20 to-gray-300/30 blur-2xl animate-pulse-slower" style={{animationDelay: '1.5s'}}></div>
                    <div className="absolute left-10 bottom-10 w-10 h-10 rounded-full bg-gradient-to-br from-gray-200/60 via-white/10 to-[#010618]/60 blur-xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
                    {/* Floating Lines */}
                    <div className="absolute right-0 top-1/4 w-32 h-1 bg-gradient-to-r from-transparent via-silver to-white/60 opacity-60 rotate-12 animate-move-x"></div>
                    <div className="absolute left-1/3 bottom-1/4 w-24 h-1 bg-gradient-to-r from-teal-900/60 via-white/40 to-transparent opacity-40 -rotate-6 animate-move-x-slow"></div>
                  </div>
                  {/* Subtle Animated Lines Background */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                    {/* Horizontal Lines */}
                    <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse"></div>
                    <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
                    
                    {/* Vertical Lines */}
                    <div className="absolute left-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute left-2/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center py-8 w-full max-w-xl mx-auto">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Direct Contact Information
                    </h3>
                    <p className="text-gray-400 mb-8">
                      Get in touch directly for immediate assistance
                    </p>
                    
                    <div className="max-w-2xl mx-auto space-y-6">
                      {/* Phone Numbers */}
                      <div className="bg-gradient-to-r from-[#010618] to-gray-900/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center justify-center gap-2">
                          <span className="text-blue-400"></span>
                          WhatsApp & Call
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <a 
                            href="https://wa.me/+918580149535"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center gap-2 py-3 px-4 bg-gray-800/50 hover:bg-gradient-to-r hover:from-green-600/20 hover:to-green-700/20 border border-gray-600/50 hover:border-green-500/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300"
                          >
                            <span className="text-green-400 group-hover:scale-110 transition-transform"></span>
                            <div className="text-sm">
                              <div className="font-medium">+91 8580149535</div>
                              <div className="text-xs text-gray-500">Rishi</div>
                            </div>
                          </a>
                          <a 
                            href="https://wa.me/+919472709259"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center gap-2 py-3 px-4 bg-gray-800/50 hover:bg-gradient-to-r hover:from-green-600/20 hover:to-green-700/20 border border-gray-600/50 hover:border-green-500/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300"
                          >
                            <span className="text-green-400 group-hover:scale-110 transition-transform"></span>
                            <div className="text-sm">
                              <div className="font-medium">+91 9472709259</div>
                              <div className="text-xs text-gray-500">Aditya</div>
                            </div>
                          </a>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="bg-gradient-to-r from-[#010618] to-gray-900/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center justify-center gap-2">
                          <span className="text-blue-400"></span>
                          Email
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <a 
                            href="mailto:101rishidsr@gmail.com"
                            className="group flex items-center justify-center gap-2 py-3 px-4 bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-blue-700/20 border border-gray-600/50 hover:border-blue-500/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300"
                          >
                            <span className="text-blue-400 group-hover:scale-110 transition-transform"></span>
                            <div className="text-sm">
                              <div className="font-medium">101rishidsr@gmail.com</div>
                              <div className="text-xs text-gray-500">Rishi</div>
                            </div>
                          </a>
                          <a 
                            href="mailto:103ranjanadityakishu@gmail.com"
                            className="group flex items-center justify-center gap-2 py-3 px-4 bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-blue-700/20 border border-gray-600/50 hover:border-blue-500/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300"
                          >
                            <span className="text-blue-400 group-hover:scale-110 transition-transform"></span>
                            <div className="text-sm">
                              <div className="font-medium text-xs">103ranjanadityakishu@gmail.com</div>
                              <div className="text-xs text-gray-500">Aditya</div>
                            </div>
                          </a>
                        </div>
                      </div>

                      {/* LinkedIn */}
                      <div className="bg-gradient-to-r from-[#010618] to-gray-900/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center justify-center gap-2">
                          <span className="text-blue-400"></span>
                          LinkedIn
                        </h4>
                        <div className="flex justify-center">
                          <a 
                            href="https://www.linkedin.com/in/rishi-rih/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 py-3 px-6 bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-600/20 border border-gray-600/50 hover:border-blue-500/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300"
                          >
                            <span className="text-blue-400 group-hover:scale-110 transition-transform"></span>
                            <span className="font-medium">Connect with Rishi</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-8 pt-6 border-t border-gray-700/30">
                      <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <span className="text-green-400"></span>
                          Available 24x7
                        </div>
                        <div className="hidden md:block">|</div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-400"></span>
                          Response within 2-4 hours
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button - Only show for form tabs */}
            {activeTab !== 'directContact' && (
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
            )}
          </motion.form>
        </div>
      </div>
      {/* Add keyframes for custom animations */}
      <style jsx global>{`
@keyframes pulse-slow { 0%,100%{opacity:0.7;} 50%{opacity:1;} }
@keyframes pulse-slower { 0%,100%{opacity:0.5;} 50%{opacity:0.9;} }
@keyframes move-x { 0%{transform:translateX(0);} 50%{transform:translateX(20px);} 100%{transform:translateX(0);} }
@keyframes move-x-slow { 0%{transform:translateX(0);} 50%{transform:translateX(-15px);} 100%{transform:translateX(0);} }
@keyframes slideInDown { 
  0% { transform: translateY(-100px) scale(0.9); opacity: 0; }
  50% { transform: translateY(-10px) scale(1.02); }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}
.animate-pulse-slow { animation: pulse-slow 3.5s ease-in-out infinite; }
.animate-pulse-slower { animation: pulse-slower 6s ease-in-out infinite; }
.animate-move-x { animation: move-x 5s ease-in-out infinite; }
.animate-move-x-slow { animation: move-x-slow 8s ease-in-out infinite; }
`}</style>
    </div>
  );
}
