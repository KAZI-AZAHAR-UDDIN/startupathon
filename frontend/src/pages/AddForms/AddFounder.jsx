import { useData } from '../../contexts/DataContext'
import FormModal from '../../components/admin/FormModal'
import axios from 'axios';

export default function AddFounder({ isOpen, onClose }) {
  const { fetchData } = useData();

  const formFields = [
    { name: 'profile', label: 'Full Name', required: true },
    { name: 'position', label: 'Position', required: true },
    { name: 'location', label: 'Location' },
    { name: "bioHighlights", label: "Bio & Highlights", type: "textarea", required: true },
    { name: 'languages', label: 'Languages (comma separated)' },
    { name: 'regionsOfExpertise', label: 'Regions of Expertise (comma separated)' },
   { name: 'techExpertise', label: 'Tech Expertise (comma separated)' },
   { name: 'businessExpertise', label: 'Business Expertise (comma separated)' },
   { name: 'socialLinks', label: 'Social Links', required: true }

  ];

  const handleSubmit = async (formData) => {
    try {
      const processedData = {
        ...formData,
        languages: formData.languages?.split(',').map(l => l.trim()) || [],
        regionsOfExpertise: formData.regionsOfExpertise?.split(',').map(r => r.trim()) || [],
        techExpertise: formData.techExpertise?.split(',').map(t => t.trim()) || [],
        businessExpertise: formData.businessExpertise?.split(',').map(b => b.trim()) || [],
      };
  
     await axios.post('/api/founders', processedData);
      await fetchData();
      onClose();
    } catch (err) {
      console.error('Error adding founder:', err.response?.data || err.message);
    }
  };
  

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      fields={formFields}
      title="Add New Founder"
    />
  );
}