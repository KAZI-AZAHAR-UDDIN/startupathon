import axios from 'axios';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Pagination from '../components/admin/Pagination';
import SearchBar from '../components/admin/SearchBar';
import AdminTable from '../components/AdminTable';
import { useData } from '../contexts/DataContext';
import AddChallenge from './AddForms/AddChallenge';
import { motionContainer, motionButton, floatVariants } from '../utils/motionStyles';

// Truncate long text function
const truncateText = (text, maxLength = 20) => {
  if (!text) return "N/A";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

// Tooltip styles for glassmorphism
const tooltipStyle = {
  background: 'rgba(59, 45, 113, 0.9)', // card-bg with 90% opacity
  backdropFilter: 'blur(10px)', // Reduced blur for readability
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  padding: '8px 12px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.1)',
  maxWidth: '300px',
  wordWrap: 'break-word',
  color: '#FFFFFF', // Ensure tooltip text is white
};

export default function AdminChallenges() {
  const { challenges, searchQuery, currentPage, setCurrentPage, itemsPerPage, fetchData } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    fetchData(); // Fetch on mount
  }, [fetchData]);

  // Optimized search logic
  const filteredData = (challenges || []).filter(challenge =>
    challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id) => {
    console.log('Deleting challenge with ID:', id);
    try {
      await axios.delete(`/api/challenges/${id}`);
      await fetchData();
      setForceUpdate(prev => !prev);
    } catch (err) {
      console.error(err);
      alert("Failed to delete challenge.");
    }
  };

  return (
    <motion.div {...motionContainer('space-y-6 p-6')}>
      {/* Header Section */}
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        initial="hidden"
        animate="visible"
        variants={floatVariants}
      >
        <motion.h1 
          className="text-3xl font-extrabold text-text-primary"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Challenges Management
        </motion.h1>
        <motion.button
          onClick={() => setShowAddForm(true)}
          className="bg-button-bg text-text-primary px-4 py-2 rounded-full hover:bg-button-hover transition-all duration-300 shadow-3d"
          variants={floatVariants}
          whileHover="hover"
          whileTap="tap"
        >
          + ADD CHALLENGE
        </motion.button>
      </motion.div>

      <SearchBar />
      
      <AdminTable headers={['S.No', 'Title', 'Funding', 'Deadline', 'Description', 'Status', 'Actions']}>
        {paginatedData.map((challenge, index) => (
          <tr key={challenge._id || index} className="hover:bg-card-bg/10">
            <td className="p-4 text-text-primary">{(currentPage - 1) * itemsPerPage + index + 1}</td>
            <td className="p-4 text-text-primary">
              <motion.span 
                variants={floatVariants}
                whileHover="hover"
              >
                {truncateText(challenge.title, 20)}
                {challenge.title && challenge.title.length > 20 && (
                  <motion.div 
                    className="absolute z-50 hidden group-hover:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    variants={floatVariants}
                    style={tooltipStyle}
                  >
                    {challenge.title}
                  </motion.div>
                )}
              </motion.span>
            </td>
            <td className="p-4 text-text-primary">
              <motion.span 
                variants={floatVariants}
                whileHover="hover"
              >
                {truncateText(challenge.funding || 'N/A', 15)}
                {challenge.funding && challenge.funding.length > 15 && (
                  <motion.div 
                    className="absolute z-50 hidden group-hover:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    variants={floatVariants}
                    style={tooltipStyle}
                  >
                    {challenge.funding}
                  </motion.div>
                )}
              </motion.span>
            </td>
            <td className="p-4 text-text-primary">
              <motion.span 
                variants={floatVariants}
                whileHover="hover"
              >
                {truncateText(challenge.deadline || 'N/A', 15)}
                {challenge.deadline && challenge.deadline.length > 15 && (
                  <motion.div 
                    className="absolute z-50 hidden group-hover:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    variants={floatVariants}
                    style={tooltipStyle}
                  >
                    {challenge.deadline}
                  </motion.div>
                )}
              </motion.span>
            </td>
            <td className="p-4 max-w-xs">
              <motion.span 
                className="text-text-primary line-clamp-1"
                variants={floatVariants}
                whileHover="hover"
              >
                {truncateText(challenge.description, 30)}
                {challenge.description && challenge.description.length > 30 && (
                  <motion.div 
                    className="absolute z-50 hidden group-hover:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    variants={floatVariants}
                    style={tooltipStyle}
                  >
                    {challenge.description}
                  </motion.div>
                )}
              </motion.span>
            </td>
            <td className="p-4 text-text-primary">
              <motion.span 
                variants={floatVariants}
                whileHover="hover"
              >
                {truncateText(challenge.status || 'Visible', 15)}
                {challenge.status && challenge.status.length > 15 && (
                  <motion.div 
                    className="absolute z-50 hidden group-hover:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    variants={floatVariants}
                    style={tooltipStyle}
                  >
                    {challenge.status}
                  </motion.div>
                )}
              </motion.span>
            </td>
            <td className="p-4">
              <motion.button 
                onClick={() => handleDelete(challenge._id)} 
                className="text-accent-yellow hover:text-text-primary transition-colors"
                variants={floatVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Delete
              </motion.button>
            </td>
          </tr>
        ))}
      </AdminTable>

      <Pagination
        totalItems={filteredData.length}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      <AddChallenge isOpen={showAddForm} onClose={() => setShowAddForm(false)} />
    </motion.div>
  );
}