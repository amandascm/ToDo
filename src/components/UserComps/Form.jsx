import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../utils/api';

export default function FormComponent({
  endpoint, history,
}) {
  const [user, setUser] = useState({
    email: '',
    name: '',
  });

  const onChange = ({ target: { name, value } }) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // eslint-disable-next-line no-useless-escape
      const regex = /^.*[\!\,\%\&\*\@\.\;\:\[\]\(\)\=\#\$\?\_\-\<\>\°\"\'\ª].*/;
      if (user.name.trim && !regex.test(user.name)) {
        await api.post(endpoint, user);
        toast('Added user');

        setUser({
          name: '',
          email: '',
        });

        history.goBack();
      } else {
        toast('Enter a valid name');
        setUser({
          ...user,
          name: '',
        });
      }
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" value={user.email} type="email" placeholder="Enter your email" onChange={onChange} required />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" value={user.name} type="text" placeholder="Enter your name" maxLength={50} onChange={onChange} required />
        </Form.Group>
        <Button variant="dark" type="submit">
          Create user
        </Button>
      </Form>
    </div>
  );
}
