import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import Loader from "../components/Loader";
import PlaceFrom from "../components/PlaceForm";
import Sidebar from "../components/Sidebar";
import "../components/Sidebar";
import { toast } from "react-toastify";

import { getAllCategory } from "../actions/categoryActions";
import { getAllStayPlace } from "../actions/stayPlaceActions";

const CreatePlace = () => {
  const {
    loading,
    placeInfo: createdPlace,
    error,
    success,
  } = useSelector((state) => state.createPlace);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllStayPlace());
  }, [dispatch])

  return (
    <Container fluid="true">
      <Row className="me-0">
        <Col md={{ size: 2 }} className="bg-primary" style={{minHeight: "100vh"}}>
          <Sidebar />
        </Col>
        <Col md={{ size: 10 }} className="px-4 py-4">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Create Place</h1>
          </div>
          {loading ? <Loader loaderText="Creating..." /> : <PlaceFrom />}
          {!loading &&
            success &&
            createdPlace._id &&
            toast("New Place Successfully Created", { type: "success" })}
          {!loading && error && toast(error, { type: "error" })}
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePlace;
