import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import UserRoleForm from "../components/UserRoleForm";


const UserRole = () => {
  const {
    loading,
    error,
    updateMsg,
  } = useSelector((state) => state.userUpdateRole);

  return (
    <Container fluid="true">
    <Row className="me-0">
      <Col md={{ size: 2 }} className="bg-primary" style={{minHeight: "100vh"}}>
          <Sidebar />
        </Col>
      <Col md={{ size: 10 }} className="px-4 py-4">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Update Role</h1>
        </div>
        {loading ? <Loader loaderText="Updating..." /> : <UserRoleForm /> }
        {updateMsg && toast("Update Role Success!", { type: "success" })}
        { error && toast(error, { type: "error" })}
      </Col>
    </Row>
  </Container>
  );
};

export default UserRole;
