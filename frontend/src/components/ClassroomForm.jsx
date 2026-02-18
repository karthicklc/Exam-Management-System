import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from '../api/axiosConfig';

const ClassroomForm = ({ show, handleClose, classroom, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
  });

  useEffect(() => {
    if (classroom) {
      setFormData({
        name: classroom.name || '',
        capacity: classroom.capacity || '',
      });
    } else {
      setFormData({ name: '', capacity: '' });
    }
  }, [classroom]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (classroom) {
        await axios.put(`/classrooms/${classroom._id}`, formData);
      } else {
        await axios.post('/classrooms', formData);
      }
      onSave();
      handleClose();
    } catch (error) {
      console.error('Error saving classroom:', error);
      alert('Failed to save classroom');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{classroom ? 'Edit Classroom' : 'Add Classroom'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Room Name/Number</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Capacity</Form.Label>
            <Form.Control
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ClassroomForm;