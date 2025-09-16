"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaClipboardList, FaPalette, FaBolt, FaFlask, FaCloud, FaChartBar, FaRocket } from 'react-icons/fa';

const Agile = () => {
  const [dragConstraints, setDragConstraints] = useState({});
  const [windowWidth, setWindowWidth] = useState(1024); // Default to desktop

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const steps = [
    {
      id: 1,
      title: "Plan",
      icon: <FaClipboardList className="w-6 h-6" />,
      description: "Define project requirements and create a roadmap",
      angle: 0,
      color: "from-blue-500 to-blue-700"
    },
    {
      id: 2,
      title: "Design",
      icon: <FaPalette className="w-6 h-6" />,
      description: "Create user-centric designs and wireframes",
      angle: 51.43,
      color: "from-purple-500 to-purple-700"
    },
    {
      id: 3,
      title: "Develop",
      icon: <FaBolt className="w-6 h-6" />,
      description: "Build features with cutting-edge technology",
      angle: 102.86,
      color: "from-green-500 to-green-700"
    },
    {
      id: 4,
      title: "Testing",
      icon: <FaFlask className="w-6 h-6" />,
      description: "Quality assurance and bug testing",
      angle: 154.29,
      color: "from-yellow-500 to-yellow-700"
    },
    {
      id: 5,
      title: "Deploy",
      icon: <FaCloud className="w-6 h-6" />,
      description: "Push updates to production environment",
      angle: 205.71,
      color: "from-red-500 to-red-700"
    },
    {
      id: 6,
      title: "Review",
      icon: <FaChartBar className="w-6 h-6" />,
      description: "Evaluate progress and gather feedback",
      angle: 257.14,
      color: "from-indigo-500 to-indigo-700"
    },
    {
      id: 7,
      title: "Launch",
      icon: <FaRocket className="w-6 h-6" />,
      description: "Deploy and go live with your product",
      angle: 308.57,
      color: "from-pink-500 to-pink-700"
    }
  ];

  const radius = 300;
  return (
    <section className="relative w-full py-12 sm:py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Animated Glass Background - Responsive */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating glass orbs - Hidden on mobile for performance */}
        <motion.div 
          className="hidden md:block absolute top-20 left-20 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-br from-white/10 to-white/5 rounded-full backdrop-blur-sm"
          animate={{ 
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="hidden md:block absolute bottom-32 right-16 w-24 md:w-48 h-24 md:h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-full backdrop-blur-sm"
          animate={{ 
            y: [20, -20, 20],
            x: [10, -10, 10],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="hidden sm:block absolute top-1/2 left-1/3 w-16 md:w-32 h-16 md:h-32 bg-gradient-to-br from-gray-400/15 to-gray-600/5 rounded-full backdrop-blur-sm"
          animate={{ 
            rotate: [0, -360],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Grid Pattern Overlay - Smaller on mobile */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '30px 30px sm:60px sm:60px'
        }}
      ></div>

      <div className="relative container mx-auto px-4 sm:px-6">
        {/* Section Header - Responsive */}
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            How to Get Started with Agile
          </motion.h2>
          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our proven Agile methodology ensures efficient project delivery and continuous improvement
          </motion.p>
        </div>

        {/* Main Agile Circle Container - Mobile Responsive */}
        <div className="relative max-w-6xl mx-auto h-[500px] sm:h-[600px] md:h-[700px] overflow-visible px-4 sm:px-8" ref={setDragConstraints}>
          {/* Central Circle - Responsive */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-gradient-to-br from-gray-700/80 to-gray-900/80 backdrop-blur-lg rounded-full shadow-2xl border border-white/20 flex flex-col items-center justify-center relative overflow-hidden">
              {/* Central circle background pattern */}
              <div className="absolute inset-0 opacity-10">
                <motion.div 
                  className="absolute top-2 sm:top-6 md:top-10 left-2 sm:left-6 md:left-10 w-8 sm:w-16 md:w-20 h-8 sm:h-16 md:h-20 bg-white rounded-full blur-xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                <motion.div 
                  className="absolute bottom-2 sm:bottom-6 md:bottom-10 right-2 sm:right-6 md:right-10 w-6 sm:w-12 md:w-16 h-6 sm:h-12 md:h-16 bg-white rounded-full blur-xl"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                ></motion.div>
              </div>
              
              <div className="relative z-10 text-center">
                <motion.h3 
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-1 sm:mb-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Agile
                </motion.h3>
                <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-light">Method</p>
              </div>
            </div>
          </motion.div>

          {/* Circular Path Visualization - Responsive */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600">
            <motion.circle 
              cx="300" 
              cy="300" 
              r={windowWidth < 640 ? "130" : windowWidth < 1024 ? "170" : "210"}
              fill="none" 
              stroke="url(#gradient)" 
              strokeWidth={windowWidth < 640 ? "3" : windowWidth < 1024 ? "4" : "4"}
              strokeDasharray={windowWidth < 640 ? "10,5" : windowWidth < 1024 ? "12,6" : "15,8"}
              opacity="0.7"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="25%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#10B981" />
                <stop offset="75%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>
          </svg>

          {/* Draggable Step Cards - Mobile Responsive */}
          {steps.map((step, index) => {
            // Perfect circle radius for proper alignment
            const radiusMobile = 130;   // Adjusted for perfect mobile circle
            const radiusTablet = 170;   // Adjusted for perfect tablet circle
            const radiusDesktop = 210;  // Adjusted for perfect desktop circle
            const radius = windowWidth < 640 ? radiusMobile : 
                          windowWidth < 1024 ? radiusTablet : radiusDesktop;
            
            const centerX = 300;
            const centerY = 300;
            
            // Special adjustment for Deploy (id 5) and Testing (id 4) to pull them to edge
            let adjustedRadius = radius;
            if (step.id === 4 || step.id === 5) { // Testing and Deploy
              adjustedRadius = radius + (windowWidth < 640 ? 15 : windowWidth < 1024 ? 20 : 25);
            }
            
            // Perfect angle calculation for 7 items in a circle
            const angleRad = (step.angle * Math.PI) / 180;
            const x = centerX + adjustedRadius * Math.cos(angleRad);
            const y = centerY + adjustedRadius * Math.sin(angleRad);

            // Card offset to perfectly center the card
            const cardSize = windowWidth < 640 ? 32 : windowWidth < 1024 ? 40 : 48;

            return (
              <motion.div
                key={step.id}
                className="absolute z-20"
                style={{ 
                  left: `${((x - cardSize/2) / 600) * 100}%`, 
                  top: `${((y - cardSize/2) / 600) * 100}%`,
                  transform: 'translate(0, 0)' // Ensure no additional transforms
                }}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  rotate: -180 
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotate: 0 
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15 + 1 
                }}
                drag
                dragConstraints={dragConstraints}
                dragElastic={0.7}
                whileDrag={{ 
                  scale: windowWidth < 640 ? 1.1 : 1.2, 
                  rotate: 15,
                  zIndex: 50 
                }}
                whileHover={{ 
                  scale: windowWidth < 640 ? 1.05 : 1.1,
                  rotate: 5 
                }}
              >
                <DraggableStepCard step={step} />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Timeline Arrow - Mobile Responsive */}
        <motion.div 
          className="mt-10 sm:mt-16 md:mt-20 flex items-center justify-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <div 
            className="flex items-center space-x-3 sm:space-x-6 md:space-x-8 bg-gradient-to-r from-gray-700/80 to-gray-900/80 backdrop-blur-lg border border-white/20 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full shadow-lg cursor-pointer hover:bg-gray-700/90 transition"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/services';
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="See our services"
          >
            <span className="text-white font-semibold text-sm sm:text-base">Easy Building - See our services </span>
            <motion.svg 
              width="30" 
              height="15" 
              className="sm:w-[35px] sm:h-[17px] md:w-[40px] md:h-[20px]"
              viewBox="0 0 40 20" 
              fill="none"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <path d="M2 10L38 10M32 4L38 10L32 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Draggable Step Card Component - Mobile Responsive
const DraggableStepCard = ({ step }) => {
  if (!step) return null;
  
  return (
    <div className="group relative cursor-grab active:cursor-grabbing">
      <motion.div 
        className={`bg-gradient-to-br ${step.color} backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg border border-white/20 p-2 sm:p-3 md:p-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex flex-col items-center justify-center`}
        whileHover={{ 
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)" 
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div 
          className="text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          {React.cloneElement(step.icon, { 
            className: "w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" 
          })}
        </motion.div>
        <h4 className="text-xs sm:text-xs font-semibold text-white text-center leading-tight">{step.title}</h4>
      </motion.div>
      
      {/* Floating Tooltip - Hidden on mobile */}
      <motion.div 
        className="hidden lg:block absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        <div className="bg-gray-800/90 backdrop-blur-sm text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-xl border border-white/10 max-w-[200px]">
          {step.description}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      </motion.div>
      
      {/* Drag indicator - Smaller on mobile */}
      <motion.div 
        className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-white/20 rounded-full hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        whileHover={{ scale: 1.2 }}
      >
        <FaBolt className="text-white w-1.5 h-1.5 sm:w-2 sm:h-2" />
      </motion.div>
    </div>
  );
};

export default Agile;