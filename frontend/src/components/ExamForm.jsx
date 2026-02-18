import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from '../api/axiosConfig';

const ExamForm = ({ show, handleClose, exam, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    duration: '',
  });

  useEffect(() => {
    if (exam) {
      setFormData({
        name: exam.name || '',
        date: exam.date ? exam.date.slice(0, 10) : '',
        duration: exam.duration || '',
      });
    } else {
      setFormData({ name: '', date: '', duration: '' });
    }
  }, [exam]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (exam) {
        await axios.put(`/exams/${exam._id}`, formData);
      } else {
        await axios.post('/exams', formData);
      }
      onSave();
      handleClose();
    } catch (error) {
      console.error('Error saving exam:', error);
      alert('Failed to save exam');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{exam ? 'Edit Exam' : 'Add Exam'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Exam Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Duration (minutes)</Form.Label>
            <Form.Control
              type="number"
              name="duration"
              value={formData.duration}
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

export default ExamForm;