import React from 'react';
import { Card } from 'react-bootstrap';

export default function PageCard({ title, children }) {
  return (
    <Card>
      <Card.Header as="h5">{title}</Card.Header>
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  );
}
