import React from "react";
import { useDispatch } from "react-redux";
import { 
  Container,
  Row,
  Col,
  Alert,
  Button
} from "reactstrap";
import { logout } from "../actions/userActions";

const UserDashboard = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <Container fluid="true">
      <Row className="me-0">
        <Col md={{ size: 8, offset: 2 }} className="px-4 py-4">
          <Alert color="info">
              Sorry! Dashboard is not available for regular user!
          </Alert>
          <Button color="primary" onClick={handleLogout}>Logout</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
