import React from "react";
import { useSelector } from 'react-redux';
import { Container, Row, Col } from "reactstrap";
import HotelForm from "../components/HotelForm";
import Sidebar from "../components/Sidebar";
import "../components/Sidebar";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const CreateHotel = () => {
  const {
    loading,
    hotelInfo: createdHotel,
    error,
    success,
  } = useSelector((state) => state.createStayPlace);

  return (
    <Container fluid="true">
      <Row className="me-0">
        <Col md={{ size: 2 }} className="bg-primary" style={{minHeight: "100vh"}}>
          <Sidebar />
        </Col>
        <Col md={{ size: 10 }} className="px-4 py-4">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Create Hotel And Restaurant Page</h1>
          </div>
          {loading ? <Loader loaderText="Creating..." /> : <HotelForm />}
          {!loading &&
            success &&
            createdHotel.data._id &&
            toast("New Hotel Successfully Created", { type: "success" })}
          {!loading && error && toast(error, { type: "error" })}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateHotel;
