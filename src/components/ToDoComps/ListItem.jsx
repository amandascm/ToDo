import { React, useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import './ToDo.css';

export default function ListItem({ item, taskList, changeList }) {
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
        <Col className="todoCols" xl="1">
          <input type="checkbox" onChange={onCheck} />
        </Col>
        <Col className="todoCols">{task.name}</Col>
        <Col className="todoCols" xl="3">
          <Button variant="dark">Edit</Button>
          <Button variant="danger" className="ml-3" onClick={onRemove}>Remove</Button>
        </Col>
      </Row>
    </div>
  );
}
