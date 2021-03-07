import { React, useState, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Page from '../../components/Page';
import ListView from '../../components/ListView';
import FormComponent from '../../components/UserComps/Form';
import api from '../../utils/api';
import ModalComponent from '../../components/Modal';

export default function User() {
  const endpoint = '/users';
  const [user, setUser] = useState({
    email: '',
    name: '',
  });
  const [newUser, setNewUser] = useState({
    email: '',
    name: '',
  });
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const onRemoveUser = async (id) => {
    try {
      await api.delete(`${endpoint}/${id}`);
      setUsers(users.filter((item) => item.id !== id));
      toast('Removed user');
    } catch (error) {
      toast(error.message);
    }
  };

  const onEditUser = async (id) => {
    try {
      const response = await api.get(`${endpoint}/${id}`);
      setUser(response.data);
      setShowModal(!showModal);
    } catch (error) {
      toast(error.message);
    }
  };

  const onUpdate = async (id) => {
    try {
      await api.put(`${endpoint}/${id}`, user);
      toast('Updated user');
      setShowModal(!showModal);
      setUsers(users.map((item) => {
        if (item.id === user.id) {
          return user;
        }
        return item;
      }));
    } catch (error) {
      toast(error.message);
    }
  };

  const onClose = () => (setShowModal(!showModal));

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
          <Button variant="danger" className="ml-2" onClick={() => onRemoveUser(row.id)}>Remove</Button>
          <ModalComponent show={showModal} toggle={onClose} title="Edit User" onSubmit={() => onUpdate(row.id)}>
            <Form>
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={({ target: { value } }) => (
                  setUser({ ...user, email: value }))}
                title="Email"
                type="email"
                placeholder={row.email}
              />
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={({ target: { value } }) => (
                  setUser({ ...user, name: value })
                )}
                type="text"
                maxLength={50}
                placeholder={row.name}
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
      <Container>
        <FormComponent submitButton="Create user" endpoint="/users" user={newUser} setUser={setNewUser} users={users} setUsers={setUsers} />
      </Container>
      <Container className="mt-5">
        <ListView columns={columns} list={users} />
      </Container>
    </Page>
  );
}
