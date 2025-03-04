import { motion } from 'framer-motion';
import SocialPost from './SocialPost';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function SocialFeed() {
  const posts = [
    {
      id: 1,
      name: "Joanny Clifford",
      handle: "johnycifford",
      content: "Maddening how many people think that not doing a startup is best way to get better at doing a startup",
      replies: "24",
      retweets: "142",
      likes: "892",
      timestamp: "Jul 20, 2024"
    },
    // Add more posts as needed
  ];

  return (
    <div className="w-full mt-4 mb-2 min-h-screen">
      <motion.div
        className="max-w-4xl mx-auto px-8 py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="text-4xl font-extrabold text-white mb-8 text-center">
          You are just one Startupathon Challenge away from 
          <span className="block text-purple-300 mt-2">an exciting founder career</span>
        </h2>
        
        {posts.map((post, index) => (
          <SocialPost 
            key={post.id} 
            post={post} 
            custom={index}
          />
        ))}
      </motion.div>
    </div>
  );
}