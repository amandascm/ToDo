import { React, useState, useEffect } from 'react';
import {
  Container, Button, Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Page from '../../components/Page';
import ListView from '../../components/ListView';
import api from '../../utils/api';
import ModalComponent from '../../components/Modal';
import { validName, validEmail } from '../../components/UserComps/Form';

export default function User() {
  const endpoint = '/users';
  const [user, setUser] = useState({
    email: '',
    name: '',
  });
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const onRemoveUser = async () => {
    try {
      await api.delete(`${endpoint}/${user.id}`);
      setUsers(users.filter((item) => item.id !== user.id));
      toast('Removed user');
    } catch (error) {
      toast(error.message);
    }
  };

  const onEditUser = (id) => {
    const mainUser = users.filter((item) => (item.id === id));
    if (mainUser.length) {
      setUser(mainUser[0]);
      setShowModal(!showModal);
    } else {
      toast("Can't find user");
    }
  };

  const onUpdateUser = async () => {
    try {
      if (validName(user.name) && validEmail(user.email)) {
        await api.put(`${endpoint}/${user.id}`, { ...user });
        toast('Updated user');
        setUsers(users.map((item) => {
          if (item.id === user.id) {
            return user;
          }
          return item;
        }));
        setShowModal(!showModal);
      } else {
        toast('Enter a valid input');
      }
    } catch (error) {
      toast(error.message);
    }
  };

  const onClose = () => {
    setShowModal(!showModal);
  };

  const columns = [
    {
      name: 'name',
      tag: 'User',
    },
    {
      name: 'email',
      tag: 'Email',
      render: ((email) => <i>{email}</i>),
    },
    {
      name: 'actions',
      tag: 'Actions',
      render: ((_, row) => (
        <div>
          <Button variant="dark" onClick={() => onEditUser(row.id)}>Edit</Button>
          <Button variant="danger" className="ml-2" onClick={onRemoveUser}>Remove</Button>
          <ModalComponent show={showModal} toggle={onClose} title="Edit User" onSubmit={onUpdateUser}>
            <Form>
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={({ target: { value } }) => (
                  setUser({ ...user, email: value }))}
                title="Email"
                type="email"
                placeholder={user.email}
              />
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={({ target: { value } }) => (
                  setUser({ ...user, name: value })
                )}
                type="text"
                maxLength={50}
                placeholder={user.name}
              />
            </Form>
          </ModalComponent>
        </div>
      )),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await api.get(endpoint);
      setUsers(response.data);
    } catch (error) {
      toast(`User page: ${error.message}`);
    }
  };

  useEffect(() => (
    fetchData()
  ), []);

  return (
    <Page title="User">
      <Link to="/newuser" className="btn btn-dark">New user</Link>
      <Container className="mt-5">
        <ListView columns={columns} list={users} />
      </Container>
    </Page>
  );
}
