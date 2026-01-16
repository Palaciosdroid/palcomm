"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  fullWidth = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-500 cursor-pointer";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#daaf7a] to-[#c4a484] text-white hover:shadow-xl hover:shadow-[#daaf7a]/20 hover:-translate-y-0.5",
    secondary:
      "bg-white/80 backdrop-blur-sm text-[#5c4a3a] border border-[#daaf7a]/20 hover:bg-white hover:border-[#daaf7a]/40 hover:-translate-y-0.5 shadow-soft",
    outline:
      "bg-transparent border-2 border-[#daaf7a]/40 text-[#5c4a3a] hover:bg-[#daaf7a]/10 hover:border-[#daaf7a]",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-9 py-4 text-lg",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`;

  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      href={href}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </MotionComponent>
  );
}
