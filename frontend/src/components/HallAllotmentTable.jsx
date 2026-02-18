import React from 'react';
import { Table, Button } from 'react-bootstrap';

const HallAllotmentTable = ({ allotments, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Exam</th>
          <th>Classroom</th>
          <th>Date</th>
          <th>Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {allotments.map((item) => (
          <tr key={item._id}>
            <td>{item.exam?.name}</td>
            <td>{item.classroom?.name}</td>
            <td>{new Date(item.date).toLocaleDateString()}</td>
            <td>{item.time}</td>
            <td>
              <Button
                variant="warning"
                size="sm"
                onClick={() => onEdit(item)}
                className="me-2"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(item._id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default HallAllotmentTable;