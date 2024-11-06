import React, { useEffect } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Table, Button, Container } from "reactstrap";
import { getDocsCount } from "../actions/countActions";
import {
  getNextPlaces,
  getPreviousPlaces,
  deletePlace,
} from "../actions/placeActions";
import Loader from "../components/Loader";

const PlaceTable = () => {
  const dispatch = useDispatch();
  const {
    error,
    success: successDelete,
    loading: deleteLoading,
    deletedPlace,
  } = useSelector((state) => state.placeDelete);

  const {
    lastObjectId,
    isEndOfPlacePage,
    isFirstPage,
    firstObjectId,
    places,
    loading,
  } = useSelector((state) => state.placeList);

  useEffect(() => {
    if(!deletedPlace) {
      return;
    }
    dispatch(getNextPlaces());
    dispatch(getDocsCount());
  }, [deletedPlace, dispatch]);

  const handleNextPage = () => {
    if (!isEndOfPlacePage) {
      dispatch(getNextPlaces(lastObjectId));
    }
  };

  const handlePreviousPage = () => {
    dispatch(getPreviousPlaces(firstObjectId));
  };

  const handleDelete = (placeId) => {
    let isConfirmed = window.confirm("Are you sure to Delete it?");
    if (!isConfirmed) {
      return;
    }
    dispatch(deletePlace(placeId));
  };

  return (
    <Container className="col-xl-10 col-lg-10 offset-1">
      <h2 className="h2 text-center mb-4">Places Detail</h2>
      <Table bordered>
        <thead>
          <tr className="table-dark">
            <th>ID.</th>
            <th>Name</th>
            <th>Nearby Hotels</th>
            <th>Location</th>
            <th>Ratings</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {deleteLoading && <Loader padding="0" loaderText="Deleting..." />}
          {!loading && lastObjectId ? (
            places.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.stayPlace.length}</td>
                <td>{item.location}</td>
                <td>{item.ratings}</td>
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
            disabled={isEndOfPlacePage ? true : null}
          >
            Next
          </Button>
        </div>
      </div>
      {!deleteLoading &&
        successDelete &&
        deletedPlace._id &&
        toast("Deleted Successfully", {
          type: "success",
        })}
      {error &&
        toast("Unable to Delete an item", {
          type: "error",
        })}
    </Container>
  );
};

export default PlaceTable;
