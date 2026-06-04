'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollAnimateProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
}

export default function ScrollAnimate({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className = '',
}: ScrollAnimateProps) {
  const getVariants = () => {
    const hidden = { opacity: 0 };
    const visible = { opacity: 1, transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] as const } }; // premium ease-out cubic-bezier
    
    switch (direction) {
      case 'up':
        return {
          hidden: { ...hidden, y: 40 },
          visible: { ...visible, y: 0 },
        };
      case 'down':
        return {
          hidden: { ...hidden, y: -40 },
          visible: { ...visible, y: 0 },
        };
      case 'left':
        return {
          hidden: { ...hidden, x: 40 },
          visible: { ...visible, x: 0 },
        };
      case 'right':
        return {
          hidden: { ...hidden, x: -40 },
          visible: { ...visible, x: 0 },
        };
      default:
        return { hidden, visible };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
}
