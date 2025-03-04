import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import { FaBullseye } from 'react-icons/fa';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" }
  },
  hover: { 
    scale: 1.05,
    boxShadow: '0 20px 30px rgba(0, 0, 0, 0.3), 0 10px 15px rgba(0, 0, 0, 0.2)',
    transition: { duration: 0.3, type: "spring", stiffness: 300 }
  },
};


const buttonVariants = {
  hover: { 
    scale: 1.1,
    transition: { duration: 0.3, type: "spring", stiffness: 300 }
  },
  tap: { scale: 0.95 },
};

export default function FounderCard() {
  const { founders, fetchData } = useData();
  console.log('Founders Data:', founders);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen mt-4 max-w-6xl mx-auto bg-wavy-purple p-8 flex flex-col items-center">
      {/* Animated Header Section */}
      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-extrabold text-text-primary mb-3">
          By getting accepted you unlock access to our elite founder network.
        </h1>
        <p className="text-base text-text-secondary">
          Join Persist and access our 400+ millionaire and billionaire startup network
        </p>
      </motion.div>

      {/* Founder Cards Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {founders.map((founder, index) => (
          <motion.div 
            key={founder._id}
            className="bg-card-bg rounded-xl p-5 shadow-3d relative bg-card-pattern bg-contain bg-no-repeat hover:shadow-3d hover:scale-105 transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            {/* Target Icon (Left Corner) */}
            <div className="absolute top-3 left-3 text-wave-purple text-xl">
              <FaBullseye />
            </div>

            {/* Profile Header */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <img 
                  src={`https://i.pravatar.cc/150?u=${founder.profile}`} // Placeholder avatar
                  alt={founder.profile}
                  className="w-32 h-40 rounded-lg object-cover border border-white/20 bg-card-bg/30 backdrop-blur-lg shadow-3d"
                  onError={(e) => { e.target.src = `https://i.pravatar.cc/150?u=${founder.profile}`; }} // Fallback
                  />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">{founder.profile}</h3>
                <p className="text-xs text-text-secondary">{founder.position}</p>
              </div>
            </div>

            {/* Bio Section */}
            <div className="space-y-3"> {/* Reduced spacing */}
              <div className="bg-white/10 p-3 rounded-xl border border-white/20 backdrop-blur-lg shadow-3d"> {/* Enhanced glassmorphism */}
                <p className="text-text-secondary line-clamp-3 text-sm"> {/* Reduced text size */}
                  {founder.bioHighlights || 'Seasoned entrepreneur with multiple successful exits'}
                </p>
              </div>

              
              <div className="grid grid-cols-2 gap-2 text-xs"> {/* Reduced gap and text size */}
                <div className="col-span-2">
                  <span className="text-gray-400">Location:</span>
                  <p className="text-text-primary font-medium">
                    {founder.location}
                  </p>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-400">Languages:</span>
                  <p className="text-text-primary font-medium">
                    {founder.languages?.join(', ') || 'English, Spanish'}
                  </p>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-400">Expertise:</span>
                  <p className="text-text-primary font-medium">
                    {founder.techExpertise?.join(', ') || 'Blockchain, AI, FinTech'}
                  </p>
                </div>
              </div>

             
              <motion.a 
                href={founder.socialLinks}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-button-bg hover:bg-button-hover text-text-primary px-5 py-1.5 rounded-full transition-all duration-300 shadow-3d hover:shadow-3d hover:scale-105" /* Enhanced styling */
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                View Full Profile →
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}