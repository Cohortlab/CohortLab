
"use client";
import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(-20); // initial angle for aeroplane
  const prevPos = useRef({ x: 0, y: 0 });
  const [clicks, setClicks] = useState([]);
  const [hovering, setHovering] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (e) => {
      const newPos = { x: e.clientX, y: e.clientY };
      // Calculate angle
      const dx = newPos.x - prevPos.current.x;
      const dy = newPos.y - prevPos.current.y;
      if (dx !== 0 || dy !== 0) {
        const rad = Math.atan2(dy, dx);
        setAngle((rad * 180) / Math.PI);
      }
      prevPos.current = newPos;
      setPos(newPos);
    };
    window.addEventListener("mousemove", move);

    const click = () => {
      setClicks((prev) => [...prev, { id: Date.now(), x: pos.x, y: pos.y }]);
      setActive(true);
      setTimeout(() => setClicks((prev) => prev.slice(1)), 700);
      setTimeout(() => setActive(false), 200);
    };
    window.addEventListener("click", click);

    // Detect hovering on interactive elements
    const addHover = () => setHovering(true);
    const removeHover = () => setHovering(false);

    document.querySelectorAll("a, button, input, textarea, select, [role='button']").forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    // Hide native cursor
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
      document.body.style.cursor = "";
    };
  }, [pos]);

  // Add custom CSS for animations
  useEffect(() => {
    if (document.getElementById("custom-cursor-style")) return;
    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.innerHTML = `
      @keyframes cursorAuraPulse {
        0% { box-shadow: 0 0 32px 8px #010618cc, 0 0 0 2px #01061844; }
        50% { box-shadow: 0 0 48px 16px #010618cc, 0 0 0 4px #01061844; }
        100% { box-shadow: 0 0 32px 8px #010618cc, 0 0 0 2px #01061844; }
      }
      @keyframes ripple-cool {
        0% { transform: scale(1); opacity: 0.7; }
        80% { transform: scale(2.5); opacity: 0.3; }
        100% { transform: scale(3.2); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <>
      {/* Animated Aura */}
      <div
        style={{
          position: "fixed",
          left: pos.x - (hovering ? 36 : 28),
          top: pos.y - (hovering ? 36 : 28),
          width: hovering ? 72 : 56,
          height: hovering ? 72 : 56,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: hovering ? 0.22 : 0.16,
          background: `radial-gradient(circle, #010618 60%, transparent 100%)`,
          animation: "cursorAuraPulse 2.2s infinite cubic-bezier(.4,2,.6,1)",
          transition:
            "width 0.2s, height 0.2s, background 0.3s, opacity 0.2s cubic-bezier(.4,2,.6,1)",
        }}
      />

      {/* Main Aeroplane Icon */}
      <svg
        style={{
          position: "fixed",
          left: pos.x - (hovering ? 18 : 10),
          top: pos.y - (hovering ? 18 : 10),
          width: hovering ? 36 : 20,
          height: hovering ? 36 : 20,
          pointerEvents: "none",
          zIndex: 10000,
          opacity: 1,
          transform: `scale(${active ? 1.2 : hovering ? 1.08 : 1}) rotate(${angle}deg)`,
          transition:
            "width 0.15s, height 0.15s, opacity 0.2s, transform 0.18s cubic-bezier(.4,2,.6,1)",
        }}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#aeroplaneShadow)">
          <path
            d="M2 16L30 4L18 30L14 18L2 16Z"
            fill="#010618"
            stroke="#fff"
            strokeWidth="1.5"
            style={{
              filter: active
                ? "drop-shadow(0 0 8px #fff)"
                : hovering
                ? "drop-shadow(0 0 6px #010618)"
                : "drop-shadow(0 0 2px #010618)",
              transition: "filter 0.2s"
            }}
          />
        </g>
        <defs>
          <filter id="aeroplaneShadow" x="0" y="0" width="32" height="32" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#010618" floodOpacity="0.4" />
          </filter>
        </defs>
      </svg>

      {/* Click ripples */}
      {clicks.map((c) => (
        <span
          key={c.id}
          style={{
            position: "fixed",
            left: c.x - 12,
            top: c.y - 12,
            width: 24,
            height: 24,
            borderRadius: "50%",
            border: "2px solid #010618",
            pointerEvents: "none",
            zIndex: 9998,
            opacity: 0.7,
            animation: "ripple-cool 0.7s cubic-bezier(.4,2,.6,1)",
            background: "rgba(1,6,24,0.08)",
          }}
        />
      ))}
    </>
  );
}
