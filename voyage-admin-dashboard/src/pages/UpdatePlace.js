import React from "react";
import { Container, Row, Col } from "reactstrap";
import PlaceFrom from "../components/PlaceForm";
import Sidebar from "../components/Sidebar";
import "../components/Sidebar";

const UpdatePlace = () => {
  return (
    <Container fluid="true">
      <Row className="me-0">
        <Col md={{ size: 2 }} className="bg-primary" style={{minHeight: "100vh"}}>
          <Sidebar />
        </Col>
        <Col md={{ size: 10 }} className="px-4 py-4">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Update Place</h1>
          </div>
          <PlaceFrom />
        </Col>
      </Row>
    </Container>
  );
};

export default UpdatePlace;
