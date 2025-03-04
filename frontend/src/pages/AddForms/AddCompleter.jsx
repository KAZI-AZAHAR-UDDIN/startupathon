import { useData } from '../../contexts/DataContext';
import FormModal from '../../components/admin/FormModal';
import axios from 'axios';

export default function AddCompleter({ isOpen, onClose }) {
  const { fetchData } = useData();

  const formFields = [
    { name: 'project', label: 'Project', required: true },
    { name: 'profile', label: 'Profile', required: true },
    { name: 'position', label: 'Position', required: true },
    { name: 'description', label: 'Description' },
    { name: 'funding', label: 'Funding' },
    { name: 'socialLinks', label: 'Social Links', required: true }
  ];

  const handleSubmit = async (formData) => {
    try {
      await axios.post('/api/completers', formData);
      await fetchData();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      fields={formFields}
      title="Add New Completer"
    />
  );
}