import { React, useState } from 'react';
import ListItem from './ListItem';
import Modal from '../Modal';

export default function ToDoList({ taskList, changeList }) {
  const [showModal, setShowModal] = useState(false);
  const [editionTask, setEditionTask] = useState({});

  const onEdit = (task) => {
    setEditionTask(task);
    setShowModal(!showModal);
  };

  const onClose = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <div>
        {taskList.map((item) => (
          <ListItem key={item.id} item={item} taskList={taskList} changeList={changeList} onEdit={onEdit} />
        ))}
      </div>
      <Modal show={showModal} toggle={onClose} title={editionTask.name} />
    </>
  );
}
