"use client";
import React from 'react';
import { PointerHighlight } from '@/components/ui/pointer-highlight';
const Why = () => {
  const features = [
    {
      title: "Diverse Industry Experience",
      description: "Successfully accomplished 70+ projects across 20+ industries, demonstrating our ability to handle diverse and complex requirements.",
      icon: "✓",
      bgColor: "bg-blue-700"
    },
    {
      title: "Standard Method of Project Management",
      description: "We follow standard Agile methodology to ensure optimal project execution, allowing for flexibility and efficient management.",
      icon: "🔍",
      bgColor: "bg-gray-700"
    },
    {
      title: "AI-Driven Solutions and Automations",
      description: "Integrating AI technologie and automations into our products and services, enhancing functionality and delivering innovative solutions that meet modern technological demands.",
      icon: "⏰",
      bgColor: "bg-black"
    },
    {
      title: "Creative and Innovative Approach",
      description: "Our team combines creativity with innovation to provide unique solutions tailored to your project, ensuring that your product stands out in the market.",
      icon: "✨",
      bgColor: "bg-gray-900"
    },
    {
      title: "Continuous Upskilling",
      description: "We conduct weekly upskilling sessions to continuously improve our team's productivity and growth, ensuring that our skills and knowledge stay current and relevant.",
      icon: "🎯",
      bgColor: "bg-gray-500"
    },
    {
      title: "Cutting-Edge R&D",
      description: "Our team conducts research and development to incorporate the latest technologies into your product, keeping you at the forefront of innovation.",
      icon: "🔬",
      bgColor: "bg-white text-black"
    }
  ];

  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-900 to-gray-700 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-gray-400 to-blue-800 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-white to-gray-700 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      ></div>

      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <div className="mt-20 mx-auto max-w-lg mb-10 py-2 text-2xl font-bold tracking-tight md:text-4xl">
            Why Choose
            <PointerHighlight>
              <span className='text-6xl'>Us...?</span>
            </PointerHighlight> 
          </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: 'fadeInUp 0.8s ease-out forwards'
              }}
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-gray-700/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              
              {/* Icon */}
              <div className={`relative w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-white via-gray-400 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude'}}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Why;
