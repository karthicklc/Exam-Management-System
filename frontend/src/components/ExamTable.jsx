import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ExamTable = ({ exams, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Duration (min)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {exams.map((exam) => (
          <tr key={exam._id}>
            <td>{exam.name}</td>
            <td>{new Date(exam.date).toLocaleDateString()}</td>
            <td>{exam.duration}</td>
            <td>
              <Button
                variant="warning"
                size="sm"
                onClick={() => onEdit(exam)}
                className="me-2"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(exam._id)}
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

export default ExamTable;