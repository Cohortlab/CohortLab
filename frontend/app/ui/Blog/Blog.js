"use client";
import React, { useState, useEffect, useRef } from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { WobbleCard } from "@/components/ui/wobble-card";
import { Meteors } from "@/components/ui/meteors";
import blogData from "./blog.json";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
export function Blog() {
  // State for managing modals
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [newsletterData, setNewsletterData] = useState({ name: '', email: '' });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiMessage, setApiMessage] = useState('');
  
  // Refs for auto-scroll functionality
  const blogModalRef = useRef(null);
  const newsletterModalRef = useRef(null);
  const router = useRouter();

  // Auto-scroll to modal when opened
  useEffect(() => {
    if (selectedBlog && blogModalRef.current) {
      blogModalRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, [selectedBlog]);

  useEffect(() => {
    if (showNewsletterModal && newsletterModalRef.current) {
      newsletterModalRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, [showNewsletterModal]);

  // SEO-optimized color schemes and gradients for different topics
  const colorSchemes = [
    "bg-gradient-to-br from-purple-700 via-blue-800 to-indigo-900",
    "bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800", 
    "bg-gradient-to-br from-orange-600 via-red-700 to-pink-800",
    "bg-gradient-to-br from-slate-700 via-gray-800 to-zinc-900",
    "bg-gradient-to-br from-violet-600 via-purple-700 to-fuchsia-800"
  ];

  // Function to get structured data for SEO
  const getStructuredData = (blog) => {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blog.title,
      "description": blog.description,
      "author": {
        "@type": "Person", 
        "name": blog.name,
        "jobTitle": blog.position
      },
      "publisher": {
        "@type": "Organization",
        "name": "CohortLab"
      },
      "url": `https://cohortlab.com/blog/${blog.slug}`,
      "datePublished": "2025-01-01",
      "dateModified": "2025-01-01"
    };
  };

  // Handle newsletter form submission
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const response = await fetch(`${apiUrl}/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newsletterData.name,
          email: newsletterData.email,
          source: 'blog_page'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success - show custom success modal
        setApiMessage(data.message || 'Successfully subscribed to newsletter!');
        setNewsletterData({ name: '', email: '' });
        setShowNewsletterModal(false);
        setShowSuccessModal(true);
      } else {
        // Error from API
        setApiMessage(data.message || 'Failed to subscribe. Please try again.');
        alert(data.message || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setApiMessage('Network error. Please check your connection and try again.');
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* SEO Head Meta - Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "CohortLab Blog",
            "description": "Expert insights on web development, digital marketing, AI, and business growth strategies",
            "url": "https://cohortlab.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "CohortLab"
            }
          })
        }}
      />

      {/* Hero Section */}
      <div className="mb-8 sm:mb-12 md:mb-16">
        <MacbookScroll
          src="/blog.png"
          showGradient={false} 
        />
      </div>

      {/* SEO-Optimized Blog Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pb-16">
        <header className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 px-2 leading-tight">
            Insights &amp; Industry Trends
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed">
            Discover the latest in web development, digital marketing, AI integration, and business growth strategies from industry experts
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 px-2 sm:px-3 lg:px-0">
          {blogData.map((blog, index) => {
            const colorScheme = colorSchemes[index % colorSchemes.length];
            const isLarge = index % 7 === 0; 
            const isMedium = index % 5 === 0 && !isLarge; 
            
            return (
              <article key={blog.id} className="w-full">
                {/* Structured Data for each blog */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(getStructuredData(blog))
                  }}
                />
                
                {/* Custom card instead of WobbleCard for better mobile control */}
                <div
                  className={`
                    ${isLarge ? 'col-span-1 sm:col-span-2 lg:col-span-2 h-[360px] sm:h-[420px] md:h-[460px]' : 
                      isMedium ? 'col-span-1 sm:col-span-2 lg:col-span-1 h-[340px] sm:h-[380px] md:h-[420px]' : 
                      'col-span-1 h-[320px] sm:h-[340px] md:h-[380px]'}
                    ${colorScheme}
                    hover:scale-[1.02] sm:hover:scale-105 transition-all duration-300
                    cursor-pointer group touch-manipulation
                    active:scale-95 sm:active:scale-100 w-full
                    rounded-lg sm:rounded-xl md:rounded-2xl relative overflow-hidden
                    shadow-md hover:shadow-xl border border-white/10
                  `}
                  onClick={() => setSelectedBlog(blog)}
                >
                  {/* Content container with proper mobile padding and fixed layout */}
                  <div className="relative z-10 p-4 sm:p-5 md:p-6 h-full flex flex-col">
                    {/* Main content area */}
                    <div className="flex-1 flex flex-col">
                      <header className="mb-3 flex-shrink-0">
                        <h2 className={`
                          ${isLarge ? 'text-base sm:text-lg md:text-xl lg:text-2xl' : 'text-sm sm:text-base md:text-lg'}
                          font-bold tracking-tight text-white mb-2 leading-tight line-clamp-2
                          group-hover:text-blue-200 transition-colors duration-300
                        `}>
                          {blog.title}
                        </h2>
                        
                        {/* Author info */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs sm:text-sm font-bold text-white">
                              {blog.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-medium text-white/90 truncate">{blog.name}</p>
                            <p className="text-xs text-white/70 truncate">{blog.position}</p>
                          </div>
                        </div>
                      </header>

                      {/* Description - flexible area */}
                      <div className="flex-1 min-h-0 mb-4">
                        <p className={`
                          ${isLarge ? 'text-sm sm:text-base line-clamp-4' : 'text-xs sm:text-sm line-clamp-3'}
                          text-white/80 leading-relaxed h-full
                          group-hover:text-white/90 transition-colors duration-300
                        `}>
                          {blog.description.substring(0, isLarge ? 180 : 140)}...
                        </p>
                      </div>
                        
                      {/* Fixed bottom section - always visible */}
                      <div className="flex-shrink-0 pt-3 border-t border-white/10">
                        <div className="flex items-center justify-between gap-3">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBlog(blog);
                            }}
                            className="
                              bg-white/20 backdrop-blur-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-full
                              text-xs sm:text-sm font-medium text-white
                              hover:bg-white/30 active:bg-white/40 transition-all duration-300
                              hover:scale-105 active:scale-95 touch-manipulation
                              flex-shrink-0 border border-white/20 min-w-fit
                            "
                            aria-label={`Read more about ${blog.title}`}
                          >
                            Read More →
                          </button>
                          
                          <div className="text-xs text-white/60 flex-shrink-0">
                            <time dateTime="2025-01-01">2 min</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative gradient overlay for visual appeal */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
                  
                  {/* Topic-based icon/visual indicator */}
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white text-sm sm:text-lg">
                      {blog.title.includes('AI') ? '🤖' :
                       blog.title.includes('SEO') ? '🔍' :
                       blog.title.includes('UI/UX') ? '🎨' :
                       blog.title.includes('Mobile') ? '📱' :
                       blog.title.includes('Cloud') ? '☁️' :
                       blog.title.includes('Security') ? '🔒' :
                       blog.title.includes('E-commerce') ? '🛒' :
                       blog.title.includes('Marketing') ? '📈' :
                       blog.title.includes('Social') ? '👥' : '💡'}
                    </span>
                  </div>

                  {/* SEO-friendly hidden text for search engines */}
                  <div className="sr-only">
                    Article about {blog.title} by {blog.name}, {blog.position}. 
                    Topics covered: web development, digital marketing, business growth.
                    Read time: 5-7 minutes. Published by CohortLab.
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* SEO Footer Section - Newsletter Card with Animation */}
        <footer className="mt-12 sm:mt-16 text-center px-4">
          <div className="relative group">
            {/* Background blur effect similar to meteors */}
            <div className="absolute inset-0 h-full w-full scale-[0.95] transform rounded-2xl bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />
            
            {/* Main newsletter card */}
            <div className="relative z-20 overflow-hidden rounded-2xl border border-gray-800 bg-black/70 backdrop-blur-sm p-6 sm:p-8 shadow-xl transform group-hover:scale-[1.02] transition-all duration-500">
              {/* Meteors animation */}
              <Meteors number={12} />
              
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 transform group-hover:translate-y-[-2px] transition-transform duration-300">
                  Stay Updated with Latest Insights
                </h3>
                <p className="text-gray-300 mb-4 sm:mb-6 max-w-2xl mx-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300 text-sm sm:text-base">
                  Get expert insights on web development trends, digital marketing strategies, and business growth tips delivered to your inbox.
                </p>
                <button 
                  onClick={() => setShowNewsletterModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-[#010618] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-white font-medium hover:scale-105 transition-transform duration-300 shadow-lg text-sm sm:text-base"
                >
                  Subscribe to Newsletter
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div 
          ref={blogModalRef}
          className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedBlog(null);
            }
          }}
        >
          <div className="relative w-full max-w-4xl min-h-screen sm:min-h-0 sm:max-h-[95vh] overflow-hidden rounded-none sm:rounded-xl md:rounded-2xl my-0 sm:my-4">
            {/* Blog content with same color scheme as card */}
            <div className={`
              ${colorSchemes[blogData.findIndex(b => b.id === selectedBlog.id) % colorSchemes.length]}
              p-4 sm:p-6 lg:p-8 overflow-y-auto min-h-screen sm:min-h-0 sm:max-h-[95vh] relative
              animate-in slide-in-from-bottom-4 fade-in-0 duration-500
            `}>
              {/* Close button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="fixed sm:absolute top-3 right-3 sm:top-6 sm:right-6 w-10 h-10 sm:w-10 sm:h-10 bg-black/50 sm:bg-white/20 hover:bg-black/70 sm:hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-20 backdrop-blur-sm"
                aria-label="Close modal"
              >
                <span className="text-lg font-bold">✕</span>
              </button>

              {/* Blog header */}
              <div className="mb-6 sm:mb-8 pt-12 sm:pt-0">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight pr-12 sm:pr-16">
                  {selectedBlog.title}
                </h1>
                
                {/* Author info */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm sm:text-base font-bold text-white">
                      {selectedBlog.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-base md:text-lg font-medium text-white truncate">{selectedBlog.name}</p>
                    <p className="text-xs sm:text-sm text-white/70 truncate">{selectedBlog.position}</p>
                  </div>
                </div>
              </div>

              {/* Blog content */}
              <div className="prose prose-sm sm:prose-base lg:prose-lg prose-invert max-w-none">
                <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed mb-4 sm:mb-6">
                  {selectedBlog.description}
                </p>
                
                {/* Additional content sections */}
                <div className="space-y-4 sm:space-y-6 text-white/80">
                  <section>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 sm:mb-3 md:mb-4">Key Insights</h2>
                    <p className="leading-relaxed text-sm sm:text-base">
                      This comprehensive guide explores the fundamental aspects of {selectedBlog.title.toLowerCase()}, 
                      providing actionable insights that businesses can implement immediately. Our research shows that 
                      companies following these strategies see significant improvements in their digital presence and ROI.
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 sm:mb-3 md:mb-4">Implementation Strategy</h2>
                    <p className="leading-relaxed text-sm sm:text-base">
                      The implementation of these concepts requires a strategic approach. We recommend starting with 
                      a thorough analysis of your current situation, followed by a phased implementation plan that 
                      allows for testing and optimization at each stage.
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 sm:mb-3 md:mb-4">Expected Outcomes</h2>
                    <p className="leading-relaxed text-sm sm:text-base">
                      By following the guidelines outlined in this article, businesses can expect to see measurable 
                      improvements in their target metrics within 3-6 months. The long-term benefits include 
                      enhanced brand recognition, improved customer engagement, and sustainable growth.
                    </p>
                  </section>
                </div>

                {/* CTA section */}
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3">Ready to Get Started?</h3>
                  <p className="text-white/80 mb-3 sm:mb-4 text-sm sm:text-base">
                    Let our experts help you implement these strategies for your business.
                  </p>
                  <button 
                    onClick={() => {
                      setSelectedBlog(null);
                      router.push('/call');
                    }}
                    className="bg-white text-gray-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium hover:bg-white/90 active:bg-white/80 transition-colors cursor-pointer text-sm sm:text-base touch-manipulation"
                  >
                    Contact Us Today
                  </button>
                </div>

                {/* Safe area for mobile */}
                <div className="h-8 sm:h-0"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Subscription Modal */}
      {showNewsletterModal && (
        <div 
          ref={newsletterModalRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowNewsletterModal(false);
            }
          }}
        >
          <div className="relative max-w-sm sm:max-w-md w-full mx-2 sm:mx-4 animate-in slide-in-from-bottom-4 fade-in-0 duration-500">
            {/* Newsletter form with same style as Footer */}
            <div className="relative">
              <div className="absolute inset-0 h-full w-full scale-[0.95] transform rounded-2xl bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl opacity-40 pointer-events-none" />
              <div className="relative z-20 flex flex-col items-start justify-end overflow-hidden rounded-xl sm:rounded-2xl border border-gray-800 bg-black/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 shadow-xl">
                {/* Meteor animation */}
                <Meteors number={15} />
                
                {/* Close button */}
                <button
                  onClick={() => setShowNewsletterModal(false)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors z-10 touch-manipulation"
                  aria-label="Close newsletter modal"
                >
                  <span className="font-bold">✕</span>
                </button>

                <div className="w-full relative z-10">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Subscribe to Newsletter</h2>
                  <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                    Get expert insights on web development, digital marketing, and business growth delivered to your inbox.
                  </p>

                  <form onSubmit={handleNewsletterSubmit} className="space-y-3 sm:space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={newsletterData.name}
                        onChange={(e) => setNewsletterData({...newsletterData, name: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={newsletterData.email}
                        onChange={(e) => setNewsletterData({...newsletterData, email: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-white font-medium transition-all duration-300 text-sm sm:text-base touch-manipulation ${
                        isSubmitting 
                          ? 'bg-gray-600 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-blue-600 to-[#010618] hover:scale-105 active:scale-95'
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Subscribing...
                        </div>
                      ) : (
                        'Subscribe Now'
                      )}
                    </button>
                  </form>

                  <p className="text-xs text-gray-500 mt-3 sm:mt-4 text-center">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-sm sm:max-w-md w-full mx-2 sm:mx-4 animate-in slide-in-from-bottom-4 fade-in-0 duration-500">
            {/* Success modal with celebratory design */}
            <div className="relative">
              <div className="absolute inset-0 h-full w-full scale-[0.95] transform rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 blur-3xl opacity-50 pointer-events-none" />
              <div className="relative z-20 flex flex-col items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl border border-green-800 bg-black/80 backdrop-blur-sm p-6 sm:p-8 shadow-xl">
                {/* Celebration meteors */}
                <Meteors number={20} />
                
                <div className="relative z-10 text-center">
                  {/* Success icon */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">Success! 🎉</h2>
                  <p className="text-green-100 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {apiMessage}
                  </p>
                  <p className="text-green-200/80 text-xs sm:text-sm mb-4 sm:mb-6">
                    You&#39;ll receive expert insights on web development, digital marketing, and business growth strategies.
                  </p>

                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-white font-medium hover:scale-105 active:scale-95 transition-transform duration-300 shadow-lg text-sm sm:text-base touch-manipulation"
                  >
                    Awesome!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-[30rem] sm:h-[40rem] flex flex-col items-center justify-center px-4">
        <TextHoverEffect text="COHORT" />
        <TextHoverEffect text="LAB" />
      </div>
    </div>
  );
}
