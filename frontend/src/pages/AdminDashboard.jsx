import { Outlet, Link } from 'react-router-dom';
import { FaChartLine, FaUsers, FaUserTie, FaEnvelope, FaHome } from 'react-icons/fa'; // Added FaHome for Main Site
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

const linkVariants = {
  hover: { 
    scale: 1.1,
    color: '#FFFFFF', // White on hover for contrast
    boxShadow: '0 0 15px rgba(255, 255, 255, 0.7)', // Enhanced glowing effect
    backgroundColor: '#4A1E70', // Subtle background on hover for glass effect
    transition: { 
      duration: 0.3, 
      type: "spring", 
      stiffness: 300,
      damping: 15 // Smoother hover transition
    }
  },
  tap: { scale: 0.95 }
};

export default function AdminDashboard() {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-background-start to-background-end bg-wavy-purple"
      initial="hidden"
      animate="visible"
      variants={floatVariants}
    >
      <div className="flex">
        {/* Sidebar */}
        <motion.div 
          className="w-64 bg-card-bg/20 backdrop-blur-xl h-screen shadow-3d p-4 fixed border-r border-white/10"
          variants={floatVariants}
          whileHover="hover"
        >
          <motion.h2 
            className="text-2xl font-extrabold text-text-primary mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Admin Panel
          </motion.h2>
          <nav className="space-y-2">
            <motion.div variants={floatVariants}>
              <Link 
                to="/admin/challenges" 
                className="flex items-center p-2 bg-card-bg/10 backdrop-blur-lg rounded-xl text-text-secondary hover:text-text-primary transition-all duration-300 shadow-3d border border-white/20 hover:bg-card-bg/20"
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaChartLine className="mr-2 text-wave-purple text-xl drop-shadow-md" />
                Challenges
              </Link>
            </motion.div>
            <motion.div variants={floatVariants}>
              <Link 
                to="/admin/completers" 
                className="flex items-center p-2 bg-card-bg/10 backdrop-blur-lg rounded-xl text-text-secondary hover:text-text-primary transition-all duration-300 shadow-3d border border-white/20 hover:bg-card-bg/20"
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaUsers className="mr-2 text-wave-purple text-xl drop-shadow-md" />
                Completers
              </Link>
            </motion.div>
            <motion.div variants={floatVariants}>
              <Link 
                to="/admin/founders" 
                className="flex items-center p-2 bg-card-bg/10 backdrop-blur-lg rounded-xl text-text-secondary hover:text-text-primary transition-all duration-300 shadow-3d border border-white/20 hover:bg-card-bg/20"
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaUserTie className="mr-2 text-wave-purple text-xl drop-shadow-md" />
                Founders
              </Link>
            </motion.div>
            <motion.div variants={floatVariants}>
              <Link 
                to="/admin/subscribers" 
                className="flex items-center p-2 bg-card-bg/10 backdrop-blur-lg rounded-xl text-text-secondary hover:text-text-primary transition-all duration-300 shadow-3d border border-white/20 hover:bg-card-bg/20"
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaEnvelope className="mr-2 text-wave-purple text-xl drop-shadow-md" />
                Subscribers
              </Link>
            </motion.div>
          </nav>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="ml-64 p-8 w-full"
          variants={floatVariants}
          whileHover="hover"
        >
          <Outlet />
        </motion.div>
      </div>

      {/* Main Site Link - Moved to Webpage Bottom with Best Design */}
      <motion.div 
        className="fixed bottom-0 left-0 w-full bg-card-bg/10 backdrop-blur-xl shadow-3d p-4 border-t border-white/10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 1
        }}
        whileHover="hover"
      >
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={floatVariants}
        >
          <Link 
            to="/" 
            className="flex items-center justify-center p-3 bg-card-bg/20 backdrop-blur-lg rounded-xl text-text-secondary hover:text-text-primary transition-all duration-300 shadow-3d border border-white/20 hover:bg-card-bg/30"
            variants={linkVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FaHome className="mr-2 text-wave-purple text-xl drop-shadow-md" />
            Main Site
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}