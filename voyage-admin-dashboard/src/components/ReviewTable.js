import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Container, Button } from "reactstrap";
import "./ReviewTable.css";
import { approvePendingReview, rejectPendingReview } from "../actions/reviewAction";

const ReviewTable = () => {
  const dispatch = useDispatch();
  const { reviews, loading } = useSelector(state => state.reviewList);

  const onApprove = (reviewId) => {
    dispatch(approvePendingReview(reviewId));
  } 

  const onReject = (reviewId) => {
    dispatch(rejectPendingReview(reviewId));
  }

  return (
    <Container fluid className="pt-4">
      <Table bordered>
        <thead>
          <tr className="table-dark">
            <th>Review Id.</th>
            <th>User Id</th>
            <th>Review Text</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!loading && reviews && (
            reviews.map(item => (
              <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.user}</td>
              <td id="review-text">{item.reviewText}</td>
              <td id="review-action">
                  <Button
                  color="danger"
                  className="float-start"
                  onClick={() => onReject(item._id)}
                  >
                      Reject
                  </Button>
                  <Button
                  color="success"
                  className="float-end"
                  onClick={() => onApprove(item._id)}
                  >
                      Approve
                  </Button>
              </td>
            </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* <div className="row mt-4">
        <div className="">
          <Button
            id="prev-btn"
            color="primary"
            outline
          >
            Previous
          </Button>
          <Button
            id="next-btn"
            color="info"
            className="float-end"
          >
            Next
          </Button>
        </div>
      </div> */}
    </Container>
  );
};

export default ReviewTable;
