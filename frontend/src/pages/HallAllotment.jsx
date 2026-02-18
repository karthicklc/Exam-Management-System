import React, { useState, useEffect } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import axios from '../api/axiosConfig';
import HallAllotmentTable from '../components/HallAllotmentTable';
import HallAllotmentForm from '../components/HallAllotmentForm';

const HallAllotment = () => {
  const [allotments, setAllotments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentAllotment, setCurrentAllotment] = useState(null);
  const [error, setError] = useState('');

  const fetchAllotments = async () => {
    try {
      const res = await axios.get('/hallallotment');
      setAllotments(res.data);
    } catch (err) {
      setError('Failed to fetch hall allotments');
    }
  };

  useEffect(() => {
    fetchAllotments();
  }, []);

  const handleAdd = () => {
    setCurrentAllotment(null);
    setShowForm(true);
  };

  const handleEdit = (allotment) => {
    setCurrentAllotment(allotment);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this allotment?')) {
      try {
        await axios.delete(`/hallallotment/${id}`);
        fetchAllotments();
      } catch (err) {
        setError('Failed to delete allotment');
      }
    }
  };

  const handleSave = () => {
    fetchAllotments();
  };

  return (
    <Container fluid className="p-4">
      <h1>Hall Allotment</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={handleAdd} className="mb-3">
        Add Allotment
      </Button>
      <HallAllotmentTable
        allotments={allotments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <HallAllotmentForm
        show={showForm}
        handleClose={() => setShowForm(false)}
        allotment={currentAllotment}
        onSave={handleSave}
      />
    </Container>
  );
};

export default HallAllotment;