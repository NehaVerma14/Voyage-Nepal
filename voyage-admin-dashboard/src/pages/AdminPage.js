import React from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import { 
  Container,
  Row,
  Col
} from "reactstrap";

const AdminPage = () => {
  return (
    <Container fluid="true">
      <Row className="me-0">
        <Col md={{ size: 2 }} className="bg-primary" style={{minHeight: "100vh"}}>
          <Sidebar />
        </Col>
        <Col md={{ size: 10 }} className="px-4 py-4">
          <Dashboard />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
