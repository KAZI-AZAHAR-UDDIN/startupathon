// import { useState, useEffect } from 'react';
// import { useData } from '../contexts/DataContext';
// import AdminTable from '../components/AdminTable';
// import Pagination from '../components/admin/Pagination';
// import AddSubscriber from './AddForms/AddSubscriber';
// import axios from 'axios';

// export default function AdminSubscribers() {
//   const { subscribers, currentPage, itemsPerPage, fetchData } = useData();
//   const [showAddForm, setShowAddForm] = useState(false);

//   const paginatedData = subscribers.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/subscribers/${id}`);
//       await fetchData();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Subscribers List</h1>
//       </div>

//       <AdminTable headers={['S.No', 'Name', 'Email']}>
//         {paginatedData.map((subscriber, index) => (
//           <tr key={subscriber._id}>
//             <td className="p-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
//             <td className="p-4">{subscriber.name}</td>
//             <td className="p-4">{subscriber.email}</td>
//             <td className="p-4">
//               <button
//                 onClick={() => handleDelete(subscriber._id)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 Delete
//               </button>
//             </td>
//           </tr>
//         ))}
//       </AdminTable>

//       <Pagination totalItems={subscribers.length} />
//     </div>
//   );
// }

import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import AdminTable from '../components/AdminTable';
import Pagination from '../components/admin/Pagination';
import AddSubscriber from './AddForms/AddSubscriber';
import axios from 'axios';

export default function AdminSubscribers() {
  const { subscribers, currentPage, itemsPerPage, fetchData } = useData();
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/subscribers/${id}`);
      await fetchData();
      alert('Subscriber deleted successfully!');
    } catch (err) {
      alert(`Error: ${err.response?.data?.error || 'Delete failed'}`);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Subscribers Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add New Subscriber
        </button>
      </div>

      <AdminTable headers={['#', 'Name', 'Email', 'Join Date', 'Actions']}>
        {subscribers.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        ).map((subscriber, index) => (
          <tr key={subscriber._id}>
            <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
            <td className="p-3">{subscriber.name || '-'}</td>
            <td className="p-3">{subscriber.email}</td>
            <td className="p-3">
              {new Date(subscriber.createdAt).toLocaleDateString()}
            </td>
            <td className="p-3">
              <button
                onClick={() => handleDelete(subscriber._id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </AdminTable>

      <Pagination 
        totalItems={subscribers.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />

      <AddSubscriber 
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSuccess={fetchData}
      />
    </div>
  );
}