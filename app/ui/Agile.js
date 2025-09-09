"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Agile = () => {
  const steps = [
    {
      id: 1,
      title: "Plan",
      icon: "📋",
      description: "Define project requirements and create a roadmap",
      angle: 0,
      color: "from-blue-500 to-blue-700"
    },
    {
      id: 2,
      title: "Design",
      icon: "🎨",
      description: "Create user-centric designs and wireframes",
      angle: 51.4,
      color: "from-purple-500 to-purple-700"
    },
    {
      id: 3,
      title: "Develop",
      icon: "⚡",
      description: "Build features with cutting-edge technology",
      angle: 102.8,
      color: "from-green-500 to-green-700"
    },
    {
      id: 4,
      title: "Testing",
      icon: "🧪",
      description: "Quality assurance and bug testing",
      angle: 154.2,
      color: "from-yellow-500 to-yellow-700"
    },
    {
      id: 5,
      title: "Deploy",
      icon: "☁️",
      description: "Push updates to production environment",
      angle: 205.6,
      color: "from-red-500 to-red-700"
    },
    {
      id: 6,
      title: "Review",
      icon: "📊",
      description: "Evaluate progress and gather feedback",
      angle: 257,
      color: "from-indigo-500 to-indigo-700"
    },
    {
      id: 7,
      title: "Launch",
      icon: "🚀",
      description: "Deploy and go live with your product",
      angle: 308.4,
      color: "from-pink-500 to-pink-700"
    }
  ];

  const [dragConstraints, setDragConstraints] = useState({});

  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Animated Glass Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating glass orbs */}
        <motion.div 
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-white/10 to-white/5 rounded-full backdrop-blur-sm"
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
          className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-full backdrop-blur-sm"
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
          className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-gray-400/15 to-gray-600/5 rounded-full backdrop-blur-sm"
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

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}
      ></div>

      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2 
            className="text-5xl md:text-6xl font-light mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            How to Get Started with Agile
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our proven Agile methodology ensures efficient project delivery and continuous improvement
          </motion.p>
        </div>

        {/* Main Agile Circle Container */}
        <div className="relative max-w-6xl mx-auto h-[600px]" ref={setDragConstraints}>
          {/* Central Circle */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="w-80 h-80 bg-gradient-to-br from-gray-700/80 to-gray-900/80 backdrop-blur-lg rounded-full shadow-2xl border border-white/20 flex flex-col items-center justify-center relative overflow-hidden">
              {/* Central circle background pattern */}
              <div className="absolute inset-0 opacity-10">
                <motion.div 
                  className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                <motion.div 
                  className="absolute bottom-10 right-10 w-16 h-16 bg-white rounded-full blur-xl"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                ></motion.div>
              </div>
              
              <div className="relative z-10 text-center">
                <motion.h3 
                  className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Agile
                </motion.h3>
                <p className="text-2xl text-gray-300 font-light">Method</p>
              </div>
            </div>
          </motion.div>

          {/* Circular Path Visualization */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600">
            <motion.circle 
              cx="300" 
              cy="300" 
              r="200" 
              fill="none" 
              stroke="url(#gradient)" 
              strokeWidth="3" 
              strokeDasharray="12,6" 
              opacity="0.4"
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

          {/* Draggable Step Cards */}
          {steps.map((step, index) => {
            const radius = 200;
            const centerX = 300;
            const centerY = 300;
            const x = centerX + radius * Math.cos((step.angle * Math.PI) / 180);
            const y = centerY + radius * Math.sin((step.angle * Math.PI) / 180);

            return (
              <motion.div
                key={step.id}
                className="absolute"
                style={{ 
                  left: x - 60, 
                  top: y - 60 
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
                  delay: index * 0.2 + 1 
                }}
                drag
                dragConstraints={dragConstraints}
                dragElastic={0.7}
                whileDrag={{ 
                  scale: 1.2, 
                  rotate: 15,
                  zIndex: 50 
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5 
                }}
              >
                <DraggableStepCard step={step} />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Timeline Arrow */}
        <motion.div 
          className="mt-20 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <div className="flex items-center space-x-8 bg-gradient-to-r from-gray-700/80 to-gray-900/80 backdrop-blur-lg border border-white/20 px-8 py-4 rounded-full shadow-lg">
            <span className="text-white font-semibold">Continuous Process</span>
            <motion.svg 
              width="40" 
              height="20" 
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

// Draggable Step Card Component
const DraggableStepCard = ({ step }) => {
  if (!step) return null;
  
  return (
    <div className="group relative cursor-grab active:cursor-grabbing">
      <motion.div 
        className={`bg-gradient-to-br ${step.color} backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4 w-28 h-28 flex flex-col items-center justify-center`}
        whileHover={{ 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)" 
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div 
          className="text-2xl mb-1"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          {step.icon}
        </motion.div>
        <h4 className="text-sm font-semibold text-white text-center leading-tight">{step.title}</h4>
      </motion.div>
      
      {/* Floating Tooltip */}
      <motion.div 
        className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        <div className="bg-gray-800/90 backdrop-blur-sm text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-xl border border-white/10">
          {step.description}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      </motion.div>
      
      {/* Drag indicator */}
      <motion.div 
        className="absolute -top-2 -right-2 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        whileHover={{ scale: 1.2 }}
      >
        <span className="text-white text-xs">⚡</span>
      </motion.div>
    </div>
  );
};

export default Agile;