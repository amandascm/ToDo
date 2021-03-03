import { React, useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import './ToDo.css';
import { FaTrash, FaPen } from 'react-icons/fa';

export default function ListItem({
  item, taskList, changeList, onEdit,
}) {
  // State to allow changing the item visual
  const [task, changeTask] = useState({
    name: item.name,
    isDone: item.isDone,
    id: item.id,
  });

  const onRemove = () => {
    changeList(
      taskList.filter((listItem) => (listItem.id !== task.id)),
    );
  };

  const onCheck = () => {
    // Update taskList from ToDo page
    const newTaskList = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < taskList.length; i++) {
      const listItem = taskList[i];
      if (listItem.id === item.id) {
        listItem.isDone = !listItem.isDone;
      }
      newTaskList.push(listItem);
    }
    changeList(newTaskList);

    // Update this item state
    changeTask({
      ...task,
      isDone: !task.isDone,
    });
  };

  return (
    <div className={task.isDone ? 'todoItemDone' : 'todoItemUndone'}>
      <Row>
        <Col className="todoCols" sm="1" md="1" xl="1">
          <input type="checkbox" onChange={onCheck} />
        </Col>
        <Col className="todoCols" sm="7" md="7" xl="7">{task.name}</Col>
        <Col className="todoCols" sm="4" md="4" xl="4">
          <Button variant="dark" onClick={() => onEdit({ ...task })}>
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
  );
}
