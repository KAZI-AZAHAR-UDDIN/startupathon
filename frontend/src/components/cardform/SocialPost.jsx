import { motion } from 'framer-motion';
import { FaRetweet, FaRegComment, FaRegHeart, FaShare } from 'react-icons/fa';

const postVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

const buttonHover = {
  scale: 1.05,
  transition: { type: 'spring', stiffness: 300 }
};

export default function SocialPost({ post }) {
  return (
    <motion.div 
      className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-lg mb-6"
      variants={postVariants}
    >
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#582F9D]/20 rounded-full"></div>
          <div>
            <h3 className="font-bold text-white">{post.name}</h3>
            <p className="text-gray-300 text-sm">@{post.handle}</p>
          </div>
        </div>
        <motion.button
          className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-purple-300 transition-all"
          whileHover={buttonHover}
        >
          Follow
        </motion.button>
      </div>

      {/* Post Content */}
      <p className="text-gray-200 mb-6">{post.content}</p>

      {/* Post Metrics */}
      <div className="flex items-center justify-between text-gray-300">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
            <FaRegComment />
            <span>{post.replies}</span>
          </div>
          <div className="flex items-center gap-2 hover:text-green-400 cursor-pointer">
            <FaRetweet />
            <span>{post.retweets}</span>
          </div>
          <div className="flex items-center gap-2 hover:text-red-400 cursor-pointer">
            <FaRegHeart />
            <span>{post.likes}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm">{post.timestamp}</span>
          <motion.button 
            className="hover:text-white"
            whileHover={buttonHover}
          >
            <FaShare />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}