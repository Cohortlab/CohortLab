import React from "react";

export default function CustomAlert({ open, type = "success", message = "", onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center px-4 py-8 pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-xl shadow-xl text-white font-semibold text-base animate-fade-in-up transition-all duration-300
          ${type === "success" ? "bg-gradient-to-r from-green-500 to-teal-500" : "bg-gradient-to-r from-red-500 to-pink-500"}
        `}
        style={{ minWidth: 280 }}
      >
        {type === "success" ? (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
        ) : (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        )}
        <span>{message}</span>
        <button
          className="ml-4 px-2 py-1 rounded bg-white/20 hover:bg-white/40 transition-colors"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
