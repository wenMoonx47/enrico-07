"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Set to false to animate every time it enters view (default: once) */
  once?: boolean;
}

/**
 * Scroll-triggered fade-up animation.
 * 12px vertical distance, 400ms ease-out, respects prefers-reduced-motion via Framer Motion.
 */
export function FadeUp({ children, delay = 0, className, once = true }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
