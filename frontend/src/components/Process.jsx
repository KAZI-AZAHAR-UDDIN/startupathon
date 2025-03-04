import React from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaTools, FaComments, FaCrown, FaBullseye } from 'react-icons/fa';

const Process = () => {
  // Array of steps with title, icon, and text
  const steps = [
    {
      title: "Dive into the Challenge Video",
      icon: <FaVideo className="text-2xl text-text-primary" />,
      text: "It all starts here!\nReceive an exciting task—your startup idea—with a detailed video to spark creativity and clarify our vision.\n\n💡Pro Tip: Pay attention—it’s more than just instructions, it’s your roadmap to success!",
    },
    {
      title: "Build, Submit & Shine",
      icon: <FaTools className="text-2xl text-text-primary" />,
      text: "Create a prototype that showcases your approach, then submit your work with a Loom video presentation (no GitHub repo or complex code required). Your creative solution is what matters most.\n\n💡Stay ahead: Submit on time or early to show your dedication!",
    },
    {
      title: "Get Feedback, Level Up!",
      icon: <FaComments className="text-2xl text-text-primary" />,
      text: "Three days after submission, we review your work. If it stands out, you’re in! If not, we’ll share feedback on how to improve. The cycle continues until we find the perfect fit.\n\n💡Pro Tip: This feedback is gold. Use it to sharpen your submission or learn what it takes to win!",
    },
    {
      title: "Claim Your Crown",
      icon: <FaCrown className="text-2xl text-text-primary" />,
      text: "Ace the challenge to become the project leader.\n\n💡Lead the Project. Ace the challenge, and take charge as BOSS. Enjoy ownership, 20% equity, and a competitive salary. Turn vision into impact with top-tier talent!",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05, // Removed rotate: 2 for consistency with FounderCard
      transition: { duration: 0.3, type: "spring", stiffness: 300 }
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-wavy-purple text-text-primary flex flex-col items-center justify-center p-8">
      {/* Introductory Text with Animation */}
      <motion.div 
        className="text-center mb-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h1 className="text-4xl font-extrabold text-text-primary mb-4">
          Found an idea that matches your skills?
        </h1>
        <p className="text-lg text-text-secondary">
          Here’s a simple guide on how the Startupathon process works once you find a project idea that suits your skills.
        </p>
      </motion.div>

      {/* Main Layout with Central Line */}
      <div className="relative w-full max-w-6xl">
        {/* Central Vertical Line with Pulse Animation */}
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-wave-purple animate-pulse-slow"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        ></motion.div>

        {/* Mapping through Steps with Animations */}
        {steps.map((step, index) => (
          <motion.div 
            key={index} 
            className="relative flex items-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Left Side: Title with Animation */}
            <motion.div 
              className="w-1/2 pr-8 text-right"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold text-text-primary">{step.title}</h2>
            </motion.div>

            {/* Icon on the Central Line with Bounce */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 z-10"
              initial={{ scale: 0, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              {step.icon}
            </motion.div>

            {/* Right Side: Text with Styled Lines and Smaller Text After \n\n */}
            <motion.div 
              className="w-1/2 pl-8"
              variants={itemVariants}
            >
              <p className="whitespace-pre-line">
                {step.text.split('\n').map((line, i) => {
                  const trimmedLine = line.trim();
                  if (trimmedLine === "It all starts here!" || trimmedLine === "Ace the challenge to become the project leader.") {
                    return (
                      <span key={i} className="highlight text-text-primary font-bold text-3xl block mb-2">
                        {line}
                      </span>
                    );
                  }
                  // Check if this line comes after "\n\n" (two newlines)
                  const linesBefore = step.text.substring(0, step.text.indexOf(line)).split('\n');
                  const isAfterDoubleNewline = linesBefore.filter(l => l.trim() === '').length >= 2;
                  
                  return (
                    <span key={i} className={`block ${isAfterDoubleNewline ? 'text-sm text-text-secondary' : 'text-text-secondary'}`}>
                      {line}
                    </span>
                  );
                })}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* New Fellowship Banner (Scrolls into View) with Advanced Animation */}
      <motion.div 
        className="mt-16 w-full max-w-6xl bg-card-bg rounded-xl p-6 shadow-3d flex flex-col items-center bg-card-pattern bg-contain bg-no-repeat"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
        }}
      >
        <div className="flex items-center justify-between w-full mb-4">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FaBullseye className="text-wave-purple text-2xl" />
          </motion.div>
          <div className="flex-1 text-center">
            <motion.h2 
              className="text-2xl font-bold text-text-primary mb-2"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Got an idea of your own?
            </motion.h2>
            <motion.p 
              className="text-sm text-text-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              We are always on the lookout for visionaries with great startup ideas, ready to become successful founders. If that’s you, apply below for our Fellowship program.
            </motion.p>
          </div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FaBullseye className="text-wave-purple text-2xl" />
          </motion.div>
        </div>
        {/* Centered Button Below the Banner with Advanced Animation */}
        <motion.button 
          className="bg-button-bg text-text-primary px-6 py-3 rounded-full hover:bg-button-hover transition-all duration-300 shadow-3d mt-6 animate-pulse-slow"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Apply For Fellowship
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Process;