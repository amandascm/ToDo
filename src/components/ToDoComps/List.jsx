import { React } from 'react';
import ListItem from './ListItem';

export default function ToDoList({ taskList, changeList }) {
  return (
    <div>
      {taskList.map((item) => (
        <ListItem key={item.id} item={item} taskList={taskList} changeList={changeList} />
      ))}
    </div>
  );
}
