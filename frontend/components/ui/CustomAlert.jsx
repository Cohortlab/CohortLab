import React from "react";

export default function CustomAlert({ open, type = "success", message = "", onClose }) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-8 pointer-events-none">
        <div
          className={`pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl text-white font-medium text-base animate-fade-in-up transition-all duration-300 border backdrop-blur-sm
            ${type === "success" 
              ? "bg-gradient-to-r from-green-500/95 to-emerald-500/95 border-green-400/30" 
              : "bg-gradient-to-r from-red-500/95 to-pink-500/95 border-red-400/30"}
          `}
          style={{ minWidth: 320, maxWidth: 500 }}
        >
          {type === "success" ? (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="flex-shrink-0">
              <path stroke="currentColor" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
            </svg>
          ) : (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="flex-shrink-0">
              <path stroke="currentColor" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          )}
          <span className="flex-1">{message}</span>
          <button
            className="ml-3 px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      
      {/* Add custom CSS for animation */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
        }
      `}</style>
    </>
  );
}
