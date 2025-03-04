import { useData } from '../../contexts/DataContext';
import FormModal from '../../components/admin/FormModal';
import axios from 'axios';

export default function AddSubscriber({ isOpen, onClose, onSuccess }) {
  const { fetchData } = useData();

  const formFields = [
    {
      name: 'name',
      label: 'Full Name',
      placeholder: 'John Doe',
      required: false
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'john@example.com'
    }
  ];

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post('/api/subscribers', formData);
      if (response.status === 201) {
        await fetchData();
        onSuccess();
        onClose();
        alert('Subscriber added successfully!');
      }
    } catch (err) {
      alert(`Error: ${err.response?.data?.error || 'Submission failed'}`);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      fields={formFields}
      title="Add New Subscriber"
    />
  );
}