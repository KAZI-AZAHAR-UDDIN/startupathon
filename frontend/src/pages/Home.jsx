import { motion } from 'framer-motion';
import { useRef } from 'react';
import CompletedChallenges from '../components/cardform/CompletedChallenges';
import FoundersCard from '../components/cardform/FoundersCard';
import Newsletter from '../components/cardform/Newsletter';
import SocialFeed from '../components/cardform/SocialFeed';
import Challenges from '../components/Challenges';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navigation from '../components/Navigation';
import Process from '../components/Process';
import Rewards from '../components/Rewards';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  },
};

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

export default function Home() {
  const challengesRef = useRef(null);
  const processRef = useRef(null);
  const completedChallengesRef = useRef(null);
  const foundersCardRef = useRef(null);

  return (
    <div className="m-2 min-h-screen bg-gradient-to-b from-background-start to-background-end bg-wavy-purple overflow-y-auto scroll-smooth">
      <motion.div 
        className="mx-auto flex flex-col items-center gap-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          variants={floatVariants}
          whileHover="hover"
          className="w-full"
        >
          <Navigation />
        </motion.div>

        <motion.div 
          variants={floatVariants}
          whileHover="hover"
          className="w-full"
        >
          <Hero />
        </motion.div>

        <motion.div 
          variants={floatVariants}
          whileHover="hover"
          className="w-full"
        >
          <Rewards />
        </motion.div>

        <motion.div 
          ref={challengesRef}
          variants={floatVariants}
          whileHover="hover"
          className="w-full"
        >
          <Challenges />
        </motion.div>

        <motion.div 
          ref={processRef}
          variants={floatVariants}
          whileHover="hover"
          className="w-full"
        >
          <Process />
        </motion.div>

        <motion.div 
          ref={completedChallengesRef}
          variants={floatVariants}
          whileHover="hover"
          className="w-full"
        >
          <CompletedChallenges />
        </motion.div>

        <motion.div 
        ref={foundersCardRef}
          variants={floatVariants}
          whileHover="hover"
          className="w-full"
        >
          <FoundersCard />
        </motion.div>

        <motion.div 
          variants={floatVariants}
          whileHover="hover"
          className="w-full"
        >
          <SocialFeed />
        </motion.div>

        <motion.div 
          variants={floatVariants}
          whileHover="hover"
          className="w-full"
        >
          <Newsletter />
        </motion.div>

        <motion.div 
          variants={floatVariants}
          whileHover="hover"
          className="w-full"
        >
          <Footer />
        </motion.div>
      </motion.div>
    </div>
  );
}