import React, { useState, useEffect } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import axios from '../api/axiosConfig';
import ClassroomTable from '../components/ClassroomTable';
import ClassroomForm from '../components/ClassroomForm';

const Classrooms = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentClassroom, setCurrentClassroom] = useState(null);
  const [error, setError] = useState('');

  const fetchClassrooms = async () => {
    try {
      const res = await axios.get('/classrooms');
      setClassrooms(res.data);
    } catch (err) {
      setError('Failed to fetch classrooms');
    }
  };

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const handleAdd = () => {
    setCurrentClassroom(null);
    setShowForm(true);
  };

  const handleEdit = (classroom) => {
    setCurrentClassroom(classroom);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this classroom?')) {
      try {
        await axios.delete(`/classrooms/${id}`);
        fetchClassrooms();
      } catch (err) {
        setError('Failed to delete classroom');
      }
    }
  };

  const handleSave = () => {
    fetchClassrooms();
  };

  return (
    <Container fluid className="p-4">
      <h1>Classrooms</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={handleAdd} className="mb-3">
        Add Classroom
      </Button>
      <ClassroomTable
        classrooms={classrooms}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ClassroomForm
        show={showForm}
        handleClose={() => setShowForm(false)}
        classroom={currentClassroom}
        onSave={handleSave}
      />
    </Container>
  );
};

export default Classrooms;