import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ClassroomTable = ({ classrooms, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Room Name</th>
          <th>Capacity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {classrooms.map((room) => (
          <tr key={room._id}>
            <td>{room.name}</td>
            <td>{room.capacity}</td>
            <td>
              <Button
                variant="warning"
                size="sm"
                onClick={() => onEdit(room)}
                className="me-2"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(room._id)}
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

export default ClassroomTable;