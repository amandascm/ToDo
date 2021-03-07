import { React, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Page from '../../components/Page';
import ListView from '../../components/ListView';
import Form from '../../components/UserComps/Form';
import api from '../../utils/api';

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
];

export default function User() {
  const endpoint = '/users';
  const [users, setUsers] = useState([]);

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
        <Form endpoint="/users" users={users} setUsers={setUsers} />
      </Container>
      <Container className="mt-5">
        <ListView columns={columns} endpoint={endpoint} />
      </Container>
    </Page>
  );
}
