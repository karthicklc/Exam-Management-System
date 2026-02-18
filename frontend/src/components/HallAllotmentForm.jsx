import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from '../api/axiosConfig';

const HallAllotmentForm = ({ show, handleClose, allotment, onSave }) => {
  const [formData, setFormData] = useState({
    exam: '',
    classroom: '',
    date: '',
    time: '',
  });
  const [exams, setExams] = useState([]);
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examsRes, classroomsRes] = await Promise.all([
          axios.get('/exams'),
          axios.get('/classrooms'),
        ]);
        setExams(examsRes.data);
        setClassrooms(classroomsRes.data);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (allotment) {
      setFormData({
        exam: allotment.exam?._id || '',
        classroom: allotment.classroom?._id || '',
        date: allotment.date ? allotment.date.slice(0, 10) : '',
        time: allotment.time || '',
      });
    } else {
      setFormData({ exam: '', classroom: '', date: '', time: '' });
    }
  }, [allotment]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (allotment) {
        await axios.put(`/hallallotment/${allotment._id}`, formData);
      } else {
        await axios.post('/hallallotment', formData);
      }
      onSave();
      handleClose();
    } catch (error) {
      console.error('Error saving allotment:', error);
      alert('Failed to save allotment');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {allotment ? 'Edit Hall Allotment' : 'Add Hall Allotment'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Exam</Form.Label>
            <Form.Select
              name="exam"
              value={formData.exam}
              onChange={handleChange}
              required
            >
              <option value="">Select Exam</option>
              {exams.map((ex) => (
                <option key={ex._id} value={ex._id}>
                  {ex.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Classroom</Form.Label>
            <Form.Select
              name="classroom"
              value={formData.classroom}
              onChange={handleChange}
              required
            >
              <option value="">Select Classroom</option>
              {classrooms.map((rm) => (
                <option key={rm._id} value={rm._id}>
                  {rm.name} (Capacity: {rm.capacity})
                </option>
              ))}
            </Form.Select>
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
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={formData.time}
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

export default HallAllotmentForm;