import { motion } from 'framer-motion';
import { useRef } from 'react';

const rewards = [
  { title: "Competitive Salary", value: "≥ $10,000 USD", icon: "🏢" },
  { title: "Company Funding", value: "≥ $10,000 USD", icon: "💰" },
  { title: "Founder Equity", value: "≥ 10%", icon: "📈" },
  { title: "AWS Credits", value: "≥ $100,000 USD", icon: "☁️" },
  { title: "OpenAI Credits", value: "$1,000", icon: "🤖" },
  { title: "IBM Cloud Credits", value: "$120,000 USD", icon: "🌐" },
  { title: "Twilio Credits", value: "$2,500", icon: "📞" },
  { title: "Airtable Credits", value: "$2,000", icon: "📊" },
];

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

export default function Rewards() {
  const challengesRef = useRef(null);
  const processRef = useRef(null);
  const completedChallengesRef = useRef(null);
  const foundersCardRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.section 
      className="min-h-screen bg-wavy-purple text-text-primary flex flex-col items-center justify-center py-16"
      initial="hidden"
      animate="visible"
      variants={floatVariants}
      whileHover="hover"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Links (Top) */}
        <motion.div 
          className="flex justify-center space-x-4 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.button 
            onClick={() => scrollToSection(challengesRef)}
            className="bg-button-bg/50 text-text-primary px-6 py-2 rounded-full hover:bg-button-hover transition-all duration-300 shadow-md"
            variants={floatVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Ongoing Startupathon 🏃‍♂️
          </motion.button>
          <motion.button 
            onClick={() => scrollToSection(processRef)}
            className="bg-button-bg/50 text-text-primary px-6 py-2 rounded-full hover:bg-button-hover transition-all duration-300 shadow-md"
            variants={floatVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Startupathon Guide 📖
          </motion.button>
          <motion.button 
            onClick={() => scrollToSection(completedChallengesRef)}
            className="bg-button-bg/50 text-text-primary px-6 py-2 rounded-full hover:bg-button-hover transition-all duration-300 shadow-md"
            variants={floatVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Past Startupathons ✅
          </motion.button>
          <motion.button 
            onClick={() => scrollToSection(foundersCardRef)}
            className="bg-button-bg/50 text-text-primary px-6 py-2 rounded-full hover:bg-button-hover transition-all duration-300 shadow-md"
            variants={floatVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Mentor Network 🌟
          </motion.button>
        </motion.div>

        <motion.h2 
          className="text-4xl font-extrabold text-text-primary text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Startupathon Success Comes with Extraordinary Rewards
        </motion.h2>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1, 
              transition: { 
                staggerChildren: 0.2,
                delayChildren: 0.1
              }
            }
          }}
        >
          {rewards.map((reward, index) => (
            <motion.div 
              key={index}
              className="bg-card-bg/20 backdrop-blur-xl rounded-xl p-6 shadow-3d border border-white/10 text-center hover:shadow-3d hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center"
              variants={floatVariants}
            >
              <span className="text-4xl mb-4">{reward.icon}</span>
              <h3 className="text-xl font-semibold text-text-primary mb-2">{reward.title}</h3>
              <p className="text-accent-yellow font-medium">{reward.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Hidden refs for scrolling to sections */}
      <div ref={challengesRef} className="h-1"></div>
      <div ref={processRef} className="h-1"></div>
      <div ref={completedChallengesRef} className="h-1"></div>
      <div ref={foundersCardRef} className="h-1"></div>
    </motion.section>
  );
}