import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function AdminButton() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsLoading(true);
    navigate('/admin');
    setTimeout(() => setIsLoading(false), 1000); // Simulate loading
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3, type: "spring", stiffness: 300 }
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div 
      className="ml-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
      }}
    >
      <Link 
        to="/admin"
        onClick={(e) => { e.preventDefault(); handleClick(); }}
        className="bg-button-bg text-text-primary px-4 py-2 rounded-full hover:bg-button-hover transition-all duration-300 shadow-md"
        whileHover="hover"
        whileTap="tap"
      >
        {isLoading ? 'Loading...' : 'Admin Dashboard'}
      </Link>
    </motion.div>
  );
}