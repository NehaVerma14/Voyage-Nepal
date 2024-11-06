import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Alert } from "reactstrap";
import ReviewTable from "../components/ReviewTable";
import Sidebar from "../components/Sidebar";
import "../components/Sidebar";
import { getAllPendingReview } from "../actions/reviewAction";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const ReviewPage = () => {
  const dispatch = useDispatch();
  const { error, loading, reviews } = useSelector((state) => state.reviewList);
  const { approveMsg, onApproveReset } = useSelector((state) => state.approveReview);
  const { rejectMsg, onRejectReset } = useSelector((state) => state.rejectReview);

  useEffect(() => {
    dispatch(getAllPendingReview());
  }, [dispatch, onApproveReset, onRejectReset]);

  return (
    <Container fluid="true">
      <Row className="me-0">
        <Col
          md={{ size: 2 }}
          className="bg-primary"
          style={{ minHeight: "100vh" }}
        >
          <Sidebar />
        </Col>
        <Col md={{ size: 10 }} className="px-4 py-4">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800 ms-4">
              Manage Pending Review
            </h1>
          </div>
          {loading && <Loader loaderText="Loading..." />}
          {reviews?.length === 0 && (
            <Alert color="warning" className="w-50 ms-4">
              No any pending Reviews
            </Alert>
          )}
          {!loading && reviews?.length !== 0 && <ReviewTable />}
          {error && toast(error, { type: "error" })}
          {approveMsg && toast(approveMsg, { type: "success" })}
          {rejectMsg && toast(rejectMsg, { type: "error" })}
        </Col>
      </Row>
    </Container>
  );
};

export default ReviewPage;
