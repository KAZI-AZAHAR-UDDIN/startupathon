import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState({
    challenges: [],
    completers: [],
    founders: [],
    subscribers: []
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (retries = 3, delay = 1000) => {
    if (isLoading) return; // Prevent multiple simultaneous calls
    setIsLoading(true);
    setError(null);
    try {
      const [challenges, completers, founders, subscribers] = await Promise.all([
        axios.get('/api/challenges'),
        axios.get('/api/completers'),
        axios.get('/api/founders'),
        axios.get('/api/subscribers')
      ]);

      setData(prevData => ({
        ...prevData,
        challenges: challenges.data.challenges || [],
        completers: completers.data.completers || [],
        founders: founders.data.founders || [],
        subscribers: subscribers.data.subscribers || []
      }));
      console.log('Data fetched successfully:', { challenges, completers, founders, subscribers });
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  
  return (
    <DataContext.Provider value={{
      ...data,
      searchQuery,
      setSearchQuery,
      currentPage,
      setCurrentPage,
      itemsPerPage,
      setItemsPerPage,
      setData,
      fetchData
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
