import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../utils/api';

export const validName = (name) => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^.*[\!\,\%\&\*\@\.\;\:\[\]\(\)\=\#\$\?\_\-\<\>\°\"\'\ª].*/;
  if (name.trim() && !regex.test(name)) {
    return true;
  }
  return false;
};

export const validEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const regexEmail = /^.*[\@].*/;
  // eslint-disable-next-line no-useless-escape
  const regexEmailWrong = /^.*[\!\,\%\&\*\;\:\[\]\(\)\=\#\$\?\ \<\>\°\"\'\ª].*/;
  if (email.trim() && regexEmail.test(email) && !regexEmailWrong.test(email)) {
    return true;
  }
  return false;
};

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
      if (validName(user.name) && validEmail(user.email)) {
        await api.post(endpoint, user);
        toast('Added user');

        setUser({
          name: '',
          email: '',
        });

        history.push('/user');
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
        <Button variant="secondary" type="button" onClick={() => history.goBack()}>
          Back
        </Button>
        <Button variant="dark" type="submit" className="ml-3">
          Create user
        </Button>
      </Form>
    </div>
  );
}
