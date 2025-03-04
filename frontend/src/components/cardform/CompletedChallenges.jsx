
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import { FaBullseye } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, staggerChildren: 0.2 }
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const buttonVariants = {
  hover: { 
    scale: 1.05, 
    transition: { duration: 0.3, type: "spring", stiffness: 300 }
  },
  tap: { scale: 0.95 },
};

export default function CompletedChallenges() {
  const { completers, fetchData } = useData();
  console.log('Completers Data:', completers);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-wavy-purple p-8 flex flex-col items-center">
      {/* Header with Animation */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-extrabold text-text-primary mb-4">
          Completed Startupathon Challenges
        </h1>
        <p className="text-lg text-text-secondary">
          People like you have cracked Startupathon challenges and are now leading thriving startups.
        </p>
      </motion.div>

      {/* Cards Grid with Animation (Dynamic based on completers) */}
      <motion.div 
        className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {completers.map((completer, index) => (
          <motion.div 
            key={completer._id || index} // Use _id if available from MongoDB
            className="bg-card-bg rounded-xl p-6 shadow-3d relative bg-card-pattern bg-contain bg-no-repeat hover:shadow-3d hover:scale-105 transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Project Logo/Icon */}
            <div className="absolute top-4 left-4 text-wave-purple text-2xl">
              {completer.project === "NeighborGood" ? "🏡" : 
               completer.project === "DeviSai" ? "😊" : 
               completer.project === "Ovadrive" ? "🚀" : <FaBullseye />}
            </div>

            {/* Profile Image and Details */}
            <div className="flex items-center gap-4 mb-6">
              <motion.img 
                src={`https://i.pravatar.cc/150?u=${completer.profile}`} // Placeholder avatar
                alt={completer.profile}
                className="w-24 h-24 rounded-full object-cover"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
              <div>
                <h3 className="text-xl font-bold text-text-primary">{completer.profile}</h3>
                <p className="text-sm text-text-secondary">{completer.position}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-text-secondary line-clamp-3">
                {completer.description}
              </p>
            </div>

            {/* Funding */}
            <p className="text-accent-yellow font-bold mt-4 mb-4">
              Initial Funding Offered: ${completer.funding || "61,500"}
            </p>

            {/* Social Links */}
            <p className="text-sm text-text-secondary mb-4">in</p>

            {/* View More Button with Animation */}
            <motion.button 
              className="bg-button-bg text-text-primary px-4 py-2 rounded-full hover:bg-button-hover transition-all duration-300 shadow-md"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              View More Details
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}