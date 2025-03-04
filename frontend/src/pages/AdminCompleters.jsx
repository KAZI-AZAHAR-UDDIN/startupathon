import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import AdminTable from '../components/AdminTable';
import SearchBar from '../components/admin/SearchBar';
import Pagination from '../components/admin/Pagination';
import AddCompleter from './AddForms/AddCompleter';
import axios from 'axios';
import { FiTrash2 } from 'react-icons/fi';
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

export default function AdminCompleters() {
  const { completers, searchQuery, currentPage, setCurrentPage, itemsPerPage, fetchData } = useData();
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchData(); // Fetch on mount
  }, [fetchData]);

  const filteredData = useMemo(() => {
    return completers.filter(completer =>
      completer.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      completer.profile.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [completers, searchQuery]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/completers/${id}`);
      fetchData();
    } catch (err) {
      console.error("Error deleting completer:", err);
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
          Completers Management
        </motion.h1>
        <motion.button
          onClick={() => setShowAddForm(true)}
          className="bg-button-bg text-text-primary px-4 py-2 rounded-full hover:bg-button-hover transition-all duration-300 shadow-3d"
          variants={floatVariants}
          whileHover="hover"
          whileTap="tap"
        >
          + ADD COMPLETER
        </motion.button>
      </motion.div>

      <SearchBar />
      
      <AdminTable headers={['S.No', 'Project', 'Profile', 'Position', 'Description', 'Funding', 'Social Links', 'Status', 'Visibility', 'Actions']}>
        {paginatedData.map((completer, index) => (
          <tr key={completer._id} className="hover:bg-card-bg/10">
            <td className="p-4 text-text-primary">{(currentPage - 1) * itemsPerPage + index + 1}</td>
            <td className="p-4 text-text-primary">
              <motion.span 
                variants={floatVariants}
                whileHover="hover"
              >
                {truncateText(completer.project, 20)}
                {completer.project && completer.project.length > 20 && (
                  <motion.div 
                    className="absolute z-50 hidden group-hover:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    variants={floatVariants}
                    style={tooltipStyle}
                  >
                    {completer.project}
                  </motion.div>
                )}
              </motion.span>
            </td>
            <td className="p-4 flex items-center">
              <div className="w-12 h-12 rounded-full mr-3 overflow-hidden border border-white/20 bg-card-bg/30 backdrop-blur-lg shadow-3d"> {/* DP-style avatar with beauty */}
                <img 
                  src={`https://i.pravatar.cc/150?u=${completer.profile}`} // Pravatar avatar
                  alt={completer.profile}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = `https://i.pravatar.cc/150?u=${completer.profile}`; }} // Fallback
                />
              </div>
              <motion.span 
                className="font-medium text-text-primary"
                variants={floatVariants}
                whileHover="hover"
              >
                {truncateText(completer.profile, 20)}
                {completer.profile && completer.profile.length > 20 && (
                  <motion.div 
                    className="absolute z-50 hidden group-hover:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    variants={floatVariants}
                    style={tooltipStyle}
                  >
                    {completer.profile}
                  </motion.div>
                )}
              </motion.span>
            </td>
            <td className="p-4 text-text-primary">
              <motion.span 
                variants={floatVariants}
                whileHover="hover"
              >
                {truncateText(completer.position, 15)}
                {completer.position && completer.position.length > 15 && (
                  <motion.div 
                    className="absolute z-50 hidden group-hover:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    variants={floatVariants}
                    style={tooltipStyle}
                  >
                    {completer.position}
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
                {truncateText(completer.description, 30)}
                {completer.description && completer.description.length > 30 && (
                  <motion.div 
                    className="absolute z-50 hidden group-hover:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    variants={floatVariants}
                    style={tooltipStyle}
                  >
                    {completer.description}
                  </motion.div>
                )}
              </motion.span>
            </td>
            <td className="p-4 text-text-primary">
              <motion.span 
                variants={floatVariants}
                whileHover="hover"
              >
                {truncateText(completer.funding, 15)}
                {completer.funding && completer.funding.length > 15 && (
                  <motion.div 
                    className="absolute z-50 hidden group-hover:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    variants={floatVariants}
                    style={tooltipStyle}
                  >
                    {completer.funding}
                  </motion.div>
                )}
              </motion.span>
            </td>
            <td className="p-4">
              <motion.a 
                href={completer.socialLinks} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-wave-purple hover:text-text-primary hover:underline transition-colors"
                variants={floatVariants}
                whileHover="hover"
              >
                Social Links
              </motion.a>
            </td>
            <td className="p-4 text-text-primary">
              <motion.span 
                variants={floatVariants}
                whileHover="hover"
              >
                {truncateText(completer.status, 15)}
                {completer.status && completer.status.length > 15 && (
                  <motion.div 
                    className="absolute z-50 hidden group-hover:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    variants={floatVariants}
                    style={tooltipStyle}
                  >
                    {completer.status}
                  </motion.div>
                )}
              </motion.span>
            </td>
            <td className="p-4 text-text-primary">
              <motion.span 
                variants={floatVariants}
                whileHover="hover"
              >
                {truncateText(completer.visibility, 15)}
                {completer.visibility && completer.visibility.length > 15 && (
                  <motion.div 
                    className="absolute z-50 hidden group-hover:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    variants={floatVariants}
                    style={tooltipStyle}
                  >
                    {completer.visibility}
                  </motion.div>
                )}
              </motion.span>
            </td>
            <td className="p-4">
              <motion.button 
                onClick={() => handleDelete(completer._id)} 
                className="text-accent-yellow hover:text-text-primary transition-colors"
                variants={floatVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FiTrash2 size={18} /> {/* Same delete icon as AdminFounders.jsx */}
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

      <AddCompleter isOpen={showAddForm} onClose={() => setShowAddForm(false)} />
    </motion.div>
  );
}