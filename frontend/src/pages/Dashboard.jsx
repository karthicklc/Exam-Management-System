import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from '../api/axiosConfig';

const Dashboard = () => {
  const [stats, setStats] = useState({
    exams: 0,
    classrooms: 0,
    students: 0,
    allotments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [exams, classrooms, students, allotments] = await Promise.all([
          axios.get('/exams/count'),
          axios.get('/classrooms/count'),
          axios.get('/students/count'),
          axios.get('/hallallotment/count'),
        ]);
        setStats({
          exams: exams.data.count,
          classrooms: classrooms.data.count,
          students: students.data.count,
          allotments: allotments.data.count,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <Container fluid className="p-4">
      <h1>Dashboard</h1>
      <Row>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Exams</Card.Title>
              <Card.Text style={{ fontSize: '2rem' }}>{stats.exams}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Classrooms</Card.Title>
              <Card.Text style={{ fontSize: '2rem' }}>{stats.classrooms}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Students</Card.Title>
              <Card.Text style={{ fontSize: '2rem' }}>{stats.students}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Allotments</Card.Title>
              <Card.Text style={{ fontSize: '2rem' }}>{stats.allotments}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;