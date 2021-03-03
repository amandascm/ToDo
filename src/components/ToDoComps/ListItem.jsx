import { React, useState } from 'react';
import {
  Button, Row, Col, Form,
} from 'react-bootstrap';
import './ToDo.css';
import { FaTrash, FaPen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ModalComponent from '../Modal';
import axios from '../../utils/api';

export default function ListItem({
  item, taskList, changeList,
}) {
  // State to allow changing the item visual
  const [task, changeTask] = useState({
    name: item.name,
    isDone: item.isDone,
    id: item.id,
  });
  // State to allow changing modal visibility
  const [showModal, setShowModal] = useState(false);
  // State to allow changing the modal input value
  const [newTaskName, setNewTaskName] = useState('');

  const updateNewTaskName = ({ target: { value } }) => {
    // Update task in edition name to be the modal input value
    setNewTaskName(value);
  };

  const onSubmit = async () => {
    try {
      await axios.put(`/tasks/${task.id}`, {
        ...task,
        name: newTaskName,
      });

      // Update tasks list with this task renamed when changes are saved in modal
      changeList(taskList.map((listItem) => {
        if (listItem.id === task.id) {
          const newObj = {
            ...listItem,
            name: newTaskName,
          };
          return newObj;
        }
        return listItem;
      }));

      // Update this item state
      changeTask({
        ...task,
        name: newTaskName,
      });
      setShowModal(!showModal);
      toast('Saved changes');
    } catch (error) {
      console.log(error.message);
    }
  };

  const onEdit = () => {
    // Edit task name in modal
    setNewTaskName(task.name);
    setShowModal(!showModal);
  };

  const onClose = () => {
    // Close modal
    setShowModal(!showModal);
  };

  const onRemove = async () => {
    // Remove this item from task lists
    try {
      await axios.delete(`/tasks/${task.id}`);

      changeList(
        taskList.filter((listItem) => (listItem.id !== task.id)),
      );
      toast('Removed task');
    } catch (error) {
      console.log(error.message);
    }
  };

  const onCheck = async () => {
    // Update taskList from ToDo page when it is marked as done/undone
    try {
      await axios.put(`/tasks/${task.id}`, {
        ...task,
        isDone: !task.isDone,
      });

      changeList(taskList.map((listItem) => {
        if (listItem.id === item.id) {
          return { ...listItem, isDone: !listItem.isDone };
        }
        return listItem;
      }));

      // Update this item state
      changeTask({
        ...task,
        isDone: !task.isDone,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className={task.isDone ? 'todoItemDone' : 'todoItemUndone'}>
        <Row>
          <Col className="todoCols" sm="1" md="1" xl="1">
            <input checked={task.isDone} type="checkbox" onChange={onCheck} />
          </Col>
          <Col className="todoCols" sm="7" md="7" xl="7">{task.name}</Col>
          <Col className="todoCols" sm="4" md="4" xl="4">
            <Button variant="dark" onClick={onEdit}>
              <FaPen />
              {' Edit'}
            </Button>
            <Button variant="danger" className="ml-3" onClick={onRemove}>
              <FaTrash />
              {' Remove'}
            </Button>
          </Col>
        </Row>
      </div>

      <ModalComponent show={showModal} toggle={onClose} title={task.name} onSubmit={onSubmit}>
        <Form.Control maxLength="80" value={newTaskName} onChange={updateNewTaskName} type="text" />
      </ModalComponent>
    </>

  );
}
