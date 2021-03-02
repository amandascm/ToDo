import { React, useState } from 'react';
import {
  Form, Button, Row, Col,
} from 'react-bootstrap';

export default function ToDoForm({ taskList, changeList }) {
  const [task, changeTask] = useState('');

  const addTask = (event) => {
    event.preventDefault();

    if (!task.trim()) {
      // eslint-disable-next-line
      alert('Task vazia');
    } else {
      changeList([
        ...taskList,
        {
          name: task,
          isDone: false,
          id: new Date().getTime(),
        },
      ]);
      changeTask('');
    }
  };

  const updateTask = ({ target: { value } }) => (
    changeTask(value)
  );
  return (
    <Form onSubmit={addTask}>
      <Row>
        <Col sm={9} md={9} xl={9}>
          <Form.Group controlId="formTask">
            <Form.Control value={task} onChange={updateTask} type="text" placeholder="Enter your task" />
          </Form.Group>
        </Col>
        <Col sm={3} md={3} xl={3}>
          <Button variant="dark" type="submit">
            Create
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
