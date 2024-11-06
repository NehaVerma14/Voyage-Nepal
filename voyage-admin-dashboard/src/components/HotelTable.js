import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { Table, Button, Container } from "reactstrap";
import {
  getNextStayPlace,
  getPreviousStayPlace,
  deleteStayPlace
} from "../actions/stayPlaceActions";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { getDocsCount } from "../actions/countActions";


const HotelTable = () => {
  const dispatch = useDispatch();

  const {
    error,
    success: successDelete,
    loading: deleteLoading,
    deletedHotel,
  } = useSelector((state) => state.hotelDelete);

  const {
    lastObjectId,
    isEndOfHotelPage,
    isFirstPage,
    firstObjectId,
    hotels,
    loading,
  } = useSelector((state) => state.hotelList);

  useEffect(() => {
    if(!deletedHotel) {
      return;
    }
    dispatch(getNextStayPlace());
    dispatch(getDocsCount());
  }, [deletedHotel, dispatch]);

  const handleNextPage = () => {
    if (!isEndOfHotelPage) {
      dispatch(getNextStayPlace(lastObjectId));
    }
  };

  const handlePreviousPage = () => {
    dispatch(getPreviousStayPlace(firstObjectId));
  };

  const handleDelete = (hotelId) => {
    let isConfirmed = window.confirm("Are you sure to Delete it?");
    if (!isConfirmed) {
      return;
    }
    dispatch(deleteStayPlace(hotelId));
  };


  return (
    <Container className="col-xl-10 col-lg-10 offset-1">
      <h2 className="h2 text-center mb-4">Hotels Detail</h2>
      <Table bordered>
        <thead>
          <tr className="table-dark">
            <th>ID.</th>
            <th>Name</th>
            <th>Rating</th>
            <th>Stay Type</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
        {deleteLoading && <Loader padding="0" loaderText="Deleting..." />}
        {!loading && lastObjectId ? (
            hotels.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.rating}</td>
                <td>{item.stayType}</td>
                <td>
                  <span className="mx-2">
                    <FaTrashAlt
                      onClick={() => handleDelete(item._id)}
                      className="text-danger"
                    ></FaTrashAlt>
                  </span>
                  <span className="float-end me-2">
                    <FaPen></FaPen>
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <Loader padding="20px" loaderText="" />
          )}
        </tbody>
      </Table>

      <div className="row mt-4">
        <div className="">
          <Button
            id="prev-btn"
            color="primary"
            outline
            onClick={handlePreviousPage}
            disabled={isFirstPage ? true : null}
          >
            Previous
          </Button>
          <Button
            id="next-btn"
            color="info"
            className="float-end"
            onClick={handleNextPage}
            disabled={isEndOfHotelPage ? true : null}
          >
            Next
          </Button>
        </div>
      </div>
      {!deleteLoading &&
        successDelete &&
        deletedHotel._id &&
        toast("Deleted Successfully", {
          type: "success",
        })}
      {error &&
        toast("Oops! Failed to deleted!", {
          type: "error",
        })}
    </Container>
  );
};

export default HotelTable;
