import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import axios from '../api/axiosConfig';
import StudentHallTicket from '../components/StudentHallTicket';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [showTicket, setShowTicket] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [examDetails, setExamDetails] = useState(null);
  const [classroomDetails, setClassroomDetails] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('/students');
      setStudents(res.data);
    } catch (err) {
      setError('Failed to fetch students');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleGenerateTicket = async (student) => {
    try {
      // Assume each student is allotted to an exam via hall allotment
      const allotmentRes = await axios.get(`/hallallotment/student/${student._id}`);
      const allotment = allotmentRes.data;
      if (allotment) {
        setSelectedStudent(student);
        setExamDetails(allotment.exam);
        setClassroomDetails(allotment.classroom);
        setShowTicket(true);
      } else {
        alert('No hall allotment found for this student.');
      }
    } catch (err) {
      alert('Error fetching hall ticket details.');
    }
  };

  return (
    <Container fluid className="p-4">
      <h1>Students</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.rollNo}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleGenerateTicket(student)}
                >
                  Generate Hall Ticket
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <StudentHallTicket
        show={showTicket}
        handleClose={() => setShowTicket(false)}
        student={selectedStudent}
        exam={examDetails}
        classroom={classroomDetails}
      />
    </Container>
  );
};

export default Students;