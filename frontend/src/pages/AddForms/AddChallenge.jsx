import { useData } from '../../contexts/DataContext'
import FormModal from '../../components/admin/FormModal'
import axios from 'axios'

export default function AddChallenge({ isOpen, onClose }) {
  const { fetchData } = useData()


  const formFields = [
    { name: 'title', label: 'Title', required: true },
    { name: 'funding', label: 'Funding', required: true },
    { name: 'deadline', label: 'Deadline', type: 'date' },
    { name: 'description', label: 'Description', required: true }
  ]

  const handleSubmit = async (formData) => {
    try {
      await axios.post('/api/challenges', formData); // No extra formatting needed!
      await fetchData();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create challenge.");
    }
  };
  

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      fields={formFields}
      title="Add New Challenge"
    />
  )
}