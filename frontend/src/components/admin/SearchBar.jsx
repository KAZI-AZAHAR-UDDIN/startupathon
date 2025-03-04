import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import { motionContainer, motionButton } from '../../utils/motionStyles';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useData();

  return (
    <motion.div {...motionContainer('mb-6 p-0')}>
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-3 border rounded-full focus:ring-2 focus:ring-wave-purple focus:outline-none bg-card-bg/20 backdrop-blur-xl border-white/10"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </motion.div>
  );
}