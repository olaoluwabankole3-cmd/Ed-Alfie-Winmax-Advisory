import React from "react";
import { motion } from "motion/react";

interface ScrollAnimatedSectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export default function ScrollAnimatedSection({
  id,
  className = "",
  children,
}: ScrollAnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}
