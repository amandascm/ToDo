import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../utils/api';

export const TaskContext = createContext();

export default function TaskContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    const response = await api.get('/tasks');
    setTasks(response.data);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  return (
    <TaskContext.Provider value={[tasks, setTasks]}>
      {children}
    </TaskContext.Provider>
  );
}