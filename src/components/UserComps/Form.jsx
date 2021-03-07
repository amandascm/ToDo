import { React } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../utils/api';

export default function FormComponent({
  endpoint, user, setUser, users, setUsers, submitButton,
}) {
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
        const response = await api.post(endpoint, user);
        toast('Added user');

        setUser({
          name: '',
          email: '',
        });

        setUsers([
          ...users,
          response.data,
        ]);
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
          {submitButton}
        </Button>
      </Form>
    </div>
  );
}
