import { React, useContext } from 'react';
import ListItem from './ListItem';
import { TaskContext } from '../../pages/ToDo/TaskContextProvider';

export default function ToDoList() {
  const [tasks] = useContext(TaskContext);
  return (
    <div>
      {tasks.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
}
