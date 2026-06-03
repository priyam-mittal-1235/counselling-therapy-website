"use client";

import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  type?: "slide" | "scale" | "fade";
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  type = "slide",
}: RevealProps) {
  
  const getInitial = () => {
    if (type === "fade") return { opacity: 0 };
    if (type === "scale") return { opacity: 0, scale: 0.95 };
    
    // Slide directional settings
    const offset = 32;
    const initialY = direction === "up" ? offset : direction === "down" ? -offset : 0;
    const initialX = direction === "left" ? offset : direction === "right" ? -offset : 0;
    return { opacity: 0, x: initialX, y: initialY };
  };

  const getVisible = () => {
    if (type === "scale") return { opacity: 1, scale: 1 };
    return { opacity: 1, x: 0, y: 0 };
  };

  return (
    <motion.div
      className={className}
      initial={getInitial()}
      whileInView={getVisible()}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        type: type === "fade" ? "tween" : "spring",
        stiffness: 45,
        damping: 14,
        duration: type === "fade" ? 0.5 : undefined,
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}
