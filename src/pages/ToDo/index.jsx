import { React, useState, useEffect } from 'react';
import Page from '../../components/Page';
import ToDoForm from '../../components/ToDoComps/Form';
import ToDoList from '../../components/ToDoComps/List';
import axios from '../../utils/api';

export default function ToDo() {
  const [taskList, changeList] = useState([]);

  const fetchData = async () => {
    const response = await axios.get('/tasks');
    changeList(response.data);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <Page title="Tasks">
      <ToDoForm taskList={taskList} changeList={changeList} />
      <ToDoList taskList={taskList} changeList={changeList} />
    </Page>
  );
}
