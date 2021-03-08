import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Components
import Home from './pages/Home';
import ToDo from './pages/ToDo';
import User from './pages/User';
import CreateUser from './pages/User/CreateUser';
import NavBar from './components/NavBar';

// Array of routes
const routes = [
  {
    component: Home,
    path: '/',
    name: 'Home',
  },
  {
    component: ToDo,
    path: '/todo',
    name: 'ToDo',
  },
  {
    component: User,
    path: '/user',
    name: 'User',
  },
  {
    component: CreateUser,
    path: '/newuser',
    name: 'CreateUser',
  },
];

export default function Routes() {
  return (
    <BrowserRouter>
      <NavBar routes={routes.filter((route) => (route.component !== CreateUser))} />
      <Switch>
        {routes.map((route) => (
          <Route key={route.path} exact path={route.path} component={route.component} />
        ))}
      </Switch>
    </BrowserRouter>
  );
}
