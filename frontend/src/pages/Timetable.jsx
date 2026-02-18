import React, { useState, useEffect } from 'react';
import { Container, Table, Alert } from 'react-bootstrap';
import axios from '../api/axiosConfig';

const Timetable = () => {
  const [allotments, setAllotments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const res = await axios.get('/hallallotment?sort=date,time');
        setAllotments(res.data);
      } catch (err) {
        setError('Failed to fetch timetable');
      }
    };
    fetchTimetable();
  }, []);

  return (
    <Container fluid className="p-4">
      <h1>Exam Timetable</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Exam</th>
            <th>Classroom</th>
          </tr>
        </thead>
        <tbody>
          {allotments.map((item) => (
            <tr key={item._id}>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>{item.time}</td>
              <td>{item.exam?.name}</td>
              <td>{item.classroom?.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Timetable;