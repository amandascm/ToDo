import { React, useState } from 'react';
import Page from '../../components/Page';
import ToDoForm from '../../components/ToDoComps/Form';

export default function ToDo() {
  const [taskList, changeList] = useState([]);
  return (
    <Page title="Tasks">
      <ToDoForm taskList={taskList} changeList={changeList} />
    </Page>
  );
}
