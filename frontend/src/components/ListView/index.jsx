import { React } from 'react';
import Table from '../Table';

export default function ListView({ columns = [], list }) {
  return (
    <div>
      <Table columns={columns} rows={list} />
    </div>
  );
}
