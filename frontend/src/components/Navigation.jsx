import AdminButton from './AdminButton';
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
      damping: 20, // Increased damping for smoother settling
      duration: 1
    }
  },
  hover: { 
    scale: 1.02,
    y: -5, // Reduced lift for smoother hover
    transition: { 
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  },
};

const linkVariants = {
  hover: { 
    scale: 1.1,
    color: '#FFFFFF', // White on hover for contrast
    boxShadow: '0 0 15px rgba(255, 255, 255, 0.7)', // Enhanced glowing effect
    transition: { 
      duration: 0.3, 
      type: "spring", 
      stiffness: 300,
      damping: 15 // Added damping for smoother hover
    }
  },
  tap: { scale: 0.95 }
};

export default function Navigation() {
  return (
    <motion.nav 
      className="fixed relative top-0 w-full bg-black shadow-3d z-50" /* Maintained full width and positioning */
      initial="hidden"
      animate="visible"
      variants={floatVariants}
      whileHover="hover"
    >
      <div className="w-full bg-black fixed top-0 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* PERSIST STARTUPATHON Logo - Left Corner, Matching Image */}
          <div className="flex items-start">
            <img 
              src="/logo2.jpg" /* Placeholder URL for the logo image */
              alt="PERSIST STARTUPATHON"
              className="h-16 w-28" /* Maintained height to match navbar height */
            />
          </div>
          
          {/* Links and Buttons - Right Side with Gap */}
          <div className="hidden md:flex justify-around space-x-4 ml-28"> {/* Maintained text size (text-sm), gap (space-x-4, ml-28) */}
            <motion.a 
              href="#" 
              className="text-sm text-text-secondary transition-colors duration-300 font-medium"
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Ongoing Startupathon
            </motion.a>
            <motion.a 
              href="#" 
              className="text-sm text-text-secondary transition-colors duration-300 font-medium"
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Completed Startupathona
            </motion.a>
            <motion.a 
              href="#" 
              className="text-sm text-text-secondary transition-colors duration-300 font-medium"
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Startupathon Guide
            </motion.a>
            <motion.a 
              href="#" 
              className="text-sm text-text-secondary transition-colors duration-300 font-medium"
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              How To Win
            </motion.a>
            <motion.a 
              href="#" 
              className="text-sm text-text-secondary transition-colors duration-300 font-medium"
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Mentor Network
            </motion.a>
            <div className="hidden md:flex items-center space-x-4">
              <AdminButton />
            </div>
            <motion.button 
              className="bg-button-bg text-text-primary px-6 py-2 rounded-full hover:bg-button-hover transition-all duration-300 shadow-md"
              variants={floatVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Apply for Fellowship
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}