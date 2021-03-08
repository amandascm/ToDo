import React from 'react';
import Page from '../../components/Page';
import ToDoForm from '../../components/ToDoComps/Form';
import ToDoList from '../../components/ToDoComps/List';
import TaskContextProvider from './TaskContextProvider';

function ToDo() {
  return (
    <Page title="Tasks">
      <ToDoForm />
      <ToDoList />
    </Page>
  );
}

export default () => (
  <TaskContextProvider>
    <ToDo />
  </TaskContextProvider>
);
