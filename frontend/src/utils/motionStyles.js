import { motion } from 'framer-motion';

export const floatVariants = {
  hidden: { 
    opacity: 0, 
    y: 50, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 1
    }
  },
  hover: { 
    scale: 1.02,
    y: -10,
    transition: { 
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  },
};

export const motionContainer = (className = '') => ({
  initial: "hidden",
  animate: "visible",
  variants: floatVariants,
  className: `bg-card-bg/10 backdrop-blur-xl rounded-xl p-4 border border-white/10 shadow-3d ${className}`,
});

export const motionButton = (className = '') => ({
  variants: floatVariants,
  whileHover: "hover",
  whileTap: "tap",
  className: `px-3 py-1 rounded-full border border-white/20 bg-card-bg/20 text-text-primary hover:bg-card-bg/30 transition-all duration-300 shadow-md ${className}`,
});

export const activePageButton = (className = '') => ({
  variants: floatVariants,
  whileHover: "hover",
  whileTap: "tap",
  className: `px-3 py-1 rounded-full border border-white/20 bg-button-bg text-text-primary hover:bg-button-hover transition-all duration-300 shadow-md ${className}`,
});

export const disabledButton = (className = '') => ({
  variants: floatVariants,
  whileHover: "hover",
  whileTap: "tap",
  className: `px-3 py-1 rounded-full border border-white/20 bg-card-bg/20 text-text-primary hover:bg-card-bg/30 disabled:opacity-50 transition-all duration-300 shadow-md ${className}`,
});