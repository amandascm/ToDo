import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavBar({ title = '', routes = [] }) {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">{title}</Navbar.Brand>
        <Nav className="mr-auto">
          {routes.map((route) => (
            <Nav.Link as={Link} key={route.path} to={route.path}>{route.name}</Nav.Link>
          ))}
        </Nav>
      </Navbar>
    </div>
  );
}
