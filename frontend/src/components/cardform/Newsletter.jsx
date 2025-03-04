import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiSend, FiCheckCircle } from 'react-icons/fi';

const containerVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.0, ease: "easeOut", type: "spring", stiffness: 100 } // Smoother spring animation
  },
};

const inputVariants = {
  focus: { 
    borderColor: '#8B5CF6',
    boxShadow: '0 0 0 4px rgba(139, 92, 246, 0.3)' // Enhanced glowing effect
  },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.3, type: "spring", stiffness: 300 }
  }
};

const buttonVariants = {
  hover: { 
    scale: 1.15, 
    backgroundColor: '#7E22CE', // Deeper purple on hover
    boxShadow: '0 10px 20px rgba(126, 34, 206, 0.5)', // Glowing shadow on hover
    transition: { duration: 0.4, type: "spring", stiffness: 300 }
  },
  tap: { scale: 0.95 },
  loading: { 
    rotate: 360,
    transition: { duration: 1, repeat: Infinity, ease: "linear" }
  }
};

const statusVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: 20, 
    transition: { duration: 0.4, ease: "easeIn" }
  }
};

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSuccess(true);
    setIsSubmitting(false);
    setEmail('');
    
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="mt-2 mb-2 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen"> {/* Removed background color */}
      <motion.div 
        className="relative mb-2 max-w-4xl mx-auto px-4 text-center bg-white/5 backdrop-blur-2xl rounded-2xl p-6 shadow-3d border border-white/10 max-h-[500px] overflow-y-auto" /* Reduced height, advanced glassmorphism */
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
          Got an idea of your own?
        </h2>
        <p className="text-base text-gray-200 mb-6 drop-shadow-md">
          We are always on the lookout for visionaries with great startup ideas, ready to become successful founders. If that’s you, apply below for our Fellowship program.
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
          <motion.div
            className="flex gap-3 justify-center items-center"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none drop-shadow-md"
              variants={inputVariants}
              whileFocus="focus"
              whileHover="hover"
              disabled={isSubmitting}
              required
            />
            
            <motion.button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#9333EA] hover:bg-[#7F2FD3] text-white font-medium shadow-3d flex items-center gap-2 drop-shadow-lg"
              disabled={isSubmitting || !validateEmail(email)}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              animate={isSubmitting ? "loading" : isSuccess ? "visible" : "hover"}
            >
              {isSubmitting ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white rounded-full border-t-transparent"
                  variants={buttonVariants}
                />
              ) : isSuccess ? (
                <FiCheckCircle className="text-xl" />
              ) : (
                <FiSend className="text-xl" />
              )}
              {isSuccess ? 'Subscribed!' : 'Subscribe'}
            </motion.button>
          </motion.div>
        </form>

        {/* Status Messages - Enhanced with advanced animation */}
        <motion.div
          className="mt-4"
          initial="hidden"
          animate={isSuccess ? "visible" : "exit"}
          variants={statusVariants}
        >
          <p className="text-green-400 text-sm drop-shadow-md">
            🎉 Thank you! We'll notify you as soon as a new Startupathon challenge is added.
          </p>
        </motion.div>

        <p className="mt-2 text-gray-400 text-sm drop-shadow-md"> {/* Changed mt-6 to mt-2 for reduced top margin */}
          Join 50,000+ founders already getting exclusive insights
        </p>
      </motion.div>
    </div>
  );
}