import React, { useEffect } from 'react';
import { useData } from "../contexts/DataContext";
import { motion } from 'framer-motion';
import { FaBullseye } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, staggerChildren: 0.25 } // Smoother, longer stagger for advanced effect
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30, rotate: -5 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    rotate: 0, 
    transition: { duration: 1.0, ease: "easeOut", type: "spring", stiffness: 100 } // Smoother spring animation
  },
  hover: { 
    scale: 1.1,
    boxShadow: '0 30px 50px rgba(0, 0, 0, 0.5), 0 20px 25px rgba(0, 0, 0, 0.3)',
    transition: { duration: 0.5, type: "spring", stiffness: 200 }
  },
};

const buttonVariants = {
  hover: { 
    scale: 1.15, 
    backgroundColor: '#7E22CE', // Deeper purple on hover
    boxShadow: '0 10px 20px rgba(126, 34, 206, 0.5)', // Glowing shadow on hover
    transition: { duration: 0.4, type: "spring", stiffness: 300 }
  },
  tap: { scale: 0.95 },
};

export default function Challenges() {
  const { challenges, fetchData, isLoading, error } = useData();
  console.log('Challenges Data:', challenges, 'Loading:', isLoading, 'Error:', error);

  useEffect(() => {
    if (!challenges.length && !isLoading) {
      fetchData();
    }
  }, [fetchData, challenges, isLoading]);

  if (isLoading) return <div className="min-h-screen text-text-primary flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen text-text-primary flex items-center justify-center">Error: {error}</div>;

  return (
    <section className="min-h- mt-2 screen bg-wavy-purple text-text-primary flex flex-col items-center justify-center p-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Increased max-w for advanced layout */}
        <motion.h2 
          className="text-5xl font-extrabold text-text-primary text-center mb-16 drop-shadow-xl"
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", type: "spring", stiffness: 100 }}
        >
          Ongoing Startupathon Challenges
        </motion.h2>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-12" /* Larger gap for advanced spacing */
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          whileHover="hover" /* Enhanced hover effect for container */
        >
          {challenges.map((challenge, index) => (
            <motion.div 
              key={index}
              className="glassmorphism bg-gradient-to-br from-card-bg/20 to-wave-purple/40 backdrop-blur-2xl rounded-2xl p-8 shadow-3d relative bg-card-pattern bg-contain bg-no-repeat hover:shadow-3d hover:scale-105 transition-all duration-500" /* Advanced glassmorphism, deeper blur, smoother transition */
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
            >
              <motion.div 
                className="absolute top-6 left-6 text-wave-purple text-3xl drop-shadow-2xl"
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 1.0, ease: "easeOut", type: "spring", stiffness: 150 }}
              >
                <FaBullseye />
              </motion.div>

              <h3 className="text-2xl font-extrabold text-text-primary mb-6 drop-shadow-lg">
                {challenge.title}
              </h3>
              <div className="bg-white/10 px-4 py-2 rounded-full text-lg mb-6 w-fit text-accent-yellow drop-shadow-xl">
                Initial Funding Offered: ${challenge.funding || "61,500"}
              </div>
              <p className="text-text-secondary mb-6 text-lg line-clamp-3 drop-shadow-lg">
                {challenge.description}
              </p>
              <div className="text-accent-yellow text-lg mb-6 drop-shadow-lg">
                Deadline approaching — Apply by {challenge.deadline}
              </div>
              <motion.button 
                className="w-full bg-button-bg text-text-primary py-3 rounded-xl hover:bg-button-hover transition-all duration-500 shadow-3d drop-shadow-xl hover:drop-shadow-2xl"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                View Challenge Details
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}