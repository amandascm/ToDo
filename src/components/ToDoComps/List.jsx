import { React, useState } from 'react';
import { Form } from 'react-bootstrap';
import ListItem from './ListItem';
import ModalComponent from '../Modal';

export default function ToDoList({ taskList, changeList }) {
  const [showModal, setShowModal] = useState(false);
  const [editionTask, setEditionTask] = useState({});
  const [newTaskName, setNewTaskName] = useState('');

  const updateNewTaskName = ({ target: { value } }) => {
    setNewTaskName(value);
  };

  const onSubmit = () => {
    changeList(taskList.map((item) => {
      if (item.id === editionTask.id) {
        return {
          ...item,
          name: newTaskName,
        };
      }
      return item;
    }));
    setShowModal(!showModal);
  };

  const onEdit = (task) => {
    setEditionTask(task);
    setNewTaskName(task.name);
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
      <ModalComponent show={showModal} toggle={onClose} onSubmit={onSubmit} title={editionTask.name}>
        <Form.Control maxLength="80" value={newTaskName} onChange={updateNewTaskName} type="text" />
      </ModalComponent>
    </>
  );
}
