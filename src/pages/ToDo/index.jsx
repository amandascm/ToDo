import { React, useState } from 'react';
import Page from '../../components/Page';
import ToDoForm from '../../components/ToDoComps/Form';
import ToDoList from '../../components/ToDoComps/List';

export default function ToDo() {
  const [taskList, changeList] = useState([]);
  return (
    <Page title="Tasks">
      <ToDoForm taskList={taskList} changeList={changeList} />
      <ToDoList taskList={taskList} changeList={changeList} />
    </Page>
  );
}
