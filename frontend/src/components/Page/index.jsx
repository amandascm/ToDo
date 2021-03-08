import React from 'react';
import { Container } from 'react-bootstrap';
import PageCard from '../Card';

export default function Page({ title, children }) {
  return (
    <Container className="mt-5">
      <PageCard title={title}>
        {children}
      </PageCard>
    </Container>
  );
}
