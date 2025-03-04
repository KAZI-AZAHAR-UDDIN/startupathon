import { motion } from 'framer-motion';

const floatVariants = {
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

export default function Hero() {
  return (
    <motion.section 
      className="min-h-screen bg-wavy-purple text-text-primary flex flex-col items-center justify-center p-8 relative"
      initial="hidden"
      animate="visible"
      variants={floatVariants}
      whileHover="hover"
    >
      <div className="absolute inset-0 z-0 opacity-30">
        <img 
          src="/persist.png" 
          alt="Background"
          className="h-full object-cover"
        />
      </div>
      
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h1 
          className="text-5xl font-extrabold text-text-primary mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Your Chance to Build, Lead, and Succeed as a Founder
        </motion.h1>
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-card-bg/20 backdrop-blur-xl rounded-xl p-6 shadow-3d border border-white/10">
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Building Billion-Dollar Companies: Startup-A-Thon Insights
            </h2>
            <div className="flex justify-center items-center space-x-4 text-text-secondary">
              <span>14 min</span>
              <span>•</span>
              <span>5.75K views</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}