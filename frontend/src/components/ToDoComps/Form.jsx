import { React, useState, useContext } from 'react';
import {
  Form, Button, Row, Col,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from '../../utils/api';
import { TaskContext } from '../../pages/ToDo/TaskContextProvider';

export default function ToDoForm() {
  // State to keep track of the task being inserted
  const [tasks, setTasks] = useContext(TaskContext);
  const [task, changeTask] = useState('');

  const addTask = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/tasks', {
        name: task,
        isDone: false,
      });

      setTasks([
        ...tasks,
        response.data,
      ]);

      changeTask('');
      toast('Created new task');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateTask = (event) => (
    changeTask(event.target.value)
  );
  return (
    <Form onSubmit={addTask}>
      <Row>
        <Col sm={9} md={9} xl={9}>
          <Form.Group controlId="formTask">
            <Form.Control maxLength="80" value={task} onChange={updateTask} type="text" placeholder="Enter your task" />
          </Form.Group>
        </Col>

        <Col sm={3} md={3} xl={3}>
          <Button disabled={!task.trim()} variant="dark" type="submit">
            Create
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
