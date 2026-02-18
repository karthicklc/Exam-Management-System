import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const StudentHallTicket = ({ show, handleClose, student, exam, classroom }) => {
  if (!student || !exam || !classroom) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Hall Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{student.name}</h5>
        <p><strong>Roll No:</strong> {student.rollNo}</p>
        <p><strong>Exam:</strong> {exam.name}</p>
        <p><strong>Date:</strong> {new Date(exam.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {exam.time}</p>
        <p><strong>Classroom:</strong> {classroom.name}</p>
        <p><strong>Seat No:</strong> {student.seatNo || 'TBD'}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => window.print()}>
          Print
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentHallTicket;