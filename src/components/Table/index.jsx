import { React } from 'react';
import { Table } from 'react-bootstrap';

export default function TableComponent({ columns = [], rows = [] }) {
  // The column tag is the visible part of it in the table head
  // The column name is the name it's used by the rows to map their values into the table
  return (
    <Table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.tag}>{column.tag}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.name}>{column.render ? column.render(row[column.name]) : row[column.name]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
