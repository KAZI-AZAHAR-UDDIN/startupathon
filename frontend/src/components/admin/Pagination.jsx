import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import { motionContainer, motionButton, activePageButton, disabledButton } from '../../utils/motionStyles';

export default function Pagination({ totalItems }) {
  const { currentPage, itemsPerPage, setCurrentPage } = useData();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <motion.div {...motionContainer()}>
      <div className="text-sm text-text-secondary">
        Showing {((currentPage - 1) * itemsPerPage) + 1} - 
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
      </div>
      
      <div className="flex gap-2">
        <motion.button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          {...(currentPage === 1 ? disabledButton() : motionButton())}
        >
          Previous
        </motion.button>
        
        {pageNumbers.map(number => (
          <motion.button
            key={number}
            onClick={() => setCurrentPage(number)}
            {...(currentPage === number ? activePageButton() : motionButton('text-text-secondary'))}
          >
            {number}
          </motion.button>
        ))}
        
        <motion.button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          {...(currentPage === totalPages ? disabledButton() : motionButton())}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );
}