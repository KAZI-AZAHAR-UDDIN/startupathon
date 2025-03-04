import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { useData } from "../contexts/DataContext";
import axios from "axios";
import AdminTable from "../components/AdminTable";
import SearchBar from "../components/admin/SearchBar";
import Pagination from "../components/admin/Pagination";
import AddFounder from "./AddForms/AddFounder";
import { FiTrash2 } from "react-icons/fi";
import { motionContainer, motionButton, floatVariants } from "../utils/motionStyles";

// Truncate long text function
const truncateText = (text, maxLength = 20) => {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

// Tooltip styles for glassmorphism
const tooltipStyle = {
  background: 'rgba(59, 45, 113, 0.9)', // card-bg with 90% opacity
  backdropFilter: 'blur(10px)', // Reduced blur to improve readability
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  padding: '8px 12px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.1)',
  maxWidth: '300px',
  wordWrap: 'break-word',
  color: '#FFFFFF', // Ensure tooltip text is white
};

export default function AdminFounders() {
  const { founders, searchQuery, currentPage, itemsPerPage, fetchData } = useData();
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchData(); // Fetch on mount
  }, [fetchData]);
  
  // Optimized search logic
  const searchString = searchQuery.toLowerCase();
  const filteredFounders = founders.filter(({ profile = "", position = "", location = "", bioHighlights = "" }) =>
    [profile, position, location, bioHighlights].some(field => field.toLowerCase().includes(searchString))
  );

  // Pagination
  const paginatedFounders = (filteredFounders || []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle delete with confirmation
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this founder?")) return;
    
    try {
      await axios.delete(`/api/founders/${id}`);
      await fetchData();
    } catch (err) {
      console.error("Error deleting founder:", err);
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
          Founders Management
        </motion.h1>
        <motion.button
          onClick={() => setShowAddForm(true)}
          className="bg-button-bg text-text-primary px-4 py-2 rounded-full hover:bg-button-hover transition-all duration-300 shadow-3d"
          variants={floatVariants}
          whileHover="hover"
          whileTap="tap"
        >
          + ADD FOUNDER
        </motion.button>
      </motion.div>

      <SearchBar />

      <AdminTable headers={['S.No', 'Profile', 'Position', 'Location', 'Bio & Highlights', 'Languages', 'Expertise', 'Regions', 'Tech Expertise', 'Business Expertise', 'Social Links', 'Actions']}>
        {paginatedFounders.map((founder, index) => (
          <tr key={founder._id} className="hover:bg-card-bg/10">
            <td className="p-4 text-text-primary">{(currentPage - 1) * itemsPerPage + index + 1}</td>
            <td className="p-4 flex items-center">
              <div className="w-12 h-12 rounded-full mr-3 overflow-hidden border border-white/10 bg-card-bg/20 backdrop-blur-md shadow-3d">
              
              <img 
                  src={`https://i.pravatar.cc/150?u=${founder.profile}`} // Use same avatar as FoundersCard.jsx
                  alt={founder.profile}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = `https://i.pravatar.cc/150?u=${founder.profile}`; }} // Fallback
                />
              </div>
              <motion.span 
                className="font-medium text-text-primary"
                variants={floatVariants}
                whileHover="hover"
              >
                {truncateText(founder.profile, 20)}
                {founder.profile && founder.profile.length > 20 && (
                  <motion.div 
                    className="absolute z-50 hidden group-hover:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    variants={floatVariants}
                    style={tooltipStyle}
                  >
                    {founder.profile}
                  </motion.div>
                )}
              </motion.span>
            </td>
            <td className="p-4 text-text-primary">
              <motion.span 
                variants={floatVariants}
                whileHover="hover"
              >
                {truncateText(founder.position, 15)}
                {founder.position && founder.position.length > 15 && (
                  <motion.div 
                    className="absolute z-50 hidden group-hover:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    variants={floatVariants}
                    style={tooltipStyle}
                  >
                    {founder.position}
                  </motion.div>
                )}
              </motion.span>
            </td>
            <td className="p-4 text-text-primary">
              <motion.span 
                variants={floatVariants}
                whileHover="hover"
              >
                {truncateText(founder.location, 15)}
                {founder.location && founder.location.length > 15 && (
                  <motion.div 
                    className="absolute z-50 hidden group-hover:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    variants={floatVariants}
                    style={tooltipStyle}
                  >
                    {founder.location}
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
                {truncateText(founder.bioHighlights, 30)}
                {founder.bioHighlights && founder.bioHighlights.length > 30 && (
                  <motion.div 
                    className="absolute z-50 hidden group-hover:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    variants={floatVariants}
                    style={tooltipStyle}
                  >
                    {founder.bioHighlights}
                  </motion.div>
                )}
              </motion.span>
            </td>
            <td className="p-4 text-text-primary">
              <motion.span 
                variants={floatVariants}
                whileHover="hover"
              >
                {truncateText(founder.languages?.join(", "), 20)}
                {founder.languages && founder.languages.join(", ").length > 20 && (
                  <motion.div 
                    className="absolute z-50 hidden group-hover:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    variants={floatVariants}
                    style={tooltipStyle}
                  >
                    {founder.languages.join(", ")}
                  </motion.div>
                )}
              </motion.span>
            </td>
            <td className="p-4 text-text-primary">
              <motion.span 
                variants={floatVariants}
                whileHover="hover"
              >
                {truncateText(founder.regionsOfExpertise?.join(", "), 20)}
                {founder.regionsOfExpertise && founder.regionsOfExpertise.join(", ").length > 20 && (
                  <motion.div 
                    className="absolute z-50 hidden group-hover:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    variants={floatVariants}
                    style={tooltipStyle}
                  >
                    {founder.regionsOfExpertise.join(", ")}
                  </motion.div>
                )}
              </motion.span>
            </td>
            <td className="p-4 text-text-primary">
              <motion.span 
                variants={floatVariants}
                whileHover="hover"
              >
                {truncateText(founder.techExpertise?.join(", "), 20)}
                {founder.techExpertise && founder.techExpertise.join(", ").length > 20 && (
                  <motion.div 
                    className="absolute z-50 hidden group-hover:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    variants={floatVariants}
                    style={tooltipStyle}
                  >
                    {founder.techExpertise.join(", ")}
                  </motion.div>
                )}
              </motion.span>
            </td>
            <td className="p-4 text-text-primary">
              <motion.span 
                variants={floatVariants}
                whileHover="hover"
              >
                {truncateText(founder.businessExpertise?.join(", "), 20)}
                {founder.businessExpertise && founder.businessExpertise.join(", ").length > 20 && (
                  <motion.div 
                    className="absolute z-50 hidden group-hover:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    variants={floatVariants}
                    style={tooltipStyle}
                  >
                    {founder.businessExpertise.join(", ")}
                  </motion.div>
                )}
              </motion.span>
            </td>
            <td className="p-4">
              <motion.a 
                href={founder.socialLinks} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-wave-purple hover:text-text-primary hover:underline transition-colors"
                variants={floatVariants}
                whileHover="hover"
              >
                View Profile
              </motion.a>
            </td>
            <td className="p-4 flex items-center gap-3">
              <motion.button 
                onClick={() => handleDelete(founder._id)} 
                className="text-accent-yellow hover:text-text-primary transition-colors"
                variants={floatVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FiTrash2 size={18} />
              </motion.button>
            </td>
          </tr>
        ))}
      </AdminTable>

      <Pagination totalItems={filteredFounders.length} />
      <AddFounder isOpen={showAddForm} onClose={() => setShowAddForm(false)} />
    </motion.div>
  );
}