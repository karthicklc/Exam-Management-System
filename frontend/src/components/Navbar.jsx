import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavigationBar = () => {
  const { user, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/dashboard">
          Exam Management System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/exams">
              Exams
            </Nav.Link>
            <Nav.Link as={Link} to="/classrooms">
              Classrooms
            </Nav.Link>
            <Nav.Link as={Link} to="/hallallotment">
              Hall Allotment
            </Nav.Link>
            <Nav.Link as={Link} to="/students">
              Students
            </Nav.Link>
            <Nav.Link as={Link} to="/timetable">
              Timetable
            </Nav.Link>
          </Nav>
          {user && (
            <Nav>
              <Navbar.Text className="me-3">
                Signed in as: {user.name}
              </Navbar.Text>
              <Button variant="outline-light" onClick={logout}>
                Logout
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;