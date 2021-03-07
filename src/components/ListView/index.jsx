import { React, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Table from '../Table';
import api from '../../utils/api';

export default function ListView({ columns = [], endpoint }) {
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get(endpoint);
      setRows(response.data);
    } catch (error) {
      toast(`${error.message}: can't fetch data`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Table columns={columns} rows={rows} />
    </div>
  );
}
