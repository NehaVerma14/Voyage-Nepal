import React, {useEffect} from "react";
import { Button, Container } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import { Table } from "reactstrap";
import {
  getNextUsers,
  getPreviousUsers,
  deleteUser,
} from "../actions/userActions";
import { getDocsCount } from "../actions/countActions";
import { toast } from "react-toastify";

const ItemTable = () => {
  const dispatch = useDispatch();

  const {
    deleteMsg,
    loading: deleteLoading,
    success: successDelete,
    error
  } = useSelector((state) => state.userDelete);

  const {
    lastObjectId,
    isEndOfUserPage,
    isFirstPage,
    firstObjectId,
    users,
    loading,
  } = useSelector((state) => state.userList);

  useEffect(() => {
    if(!deleteMsg) {
      return;
    }
    
    dispatch(getNextUsers());
    dispatch(getDocsCount());
  }, [deleteMsg, dispatch]);

  const handleNextPage = () => {
    if (!isEndOfUserPage) {
      dispatch(getNextUsers(lastObjectId));
    }
  };

  const handlePreviousPage = () => {
    dispatch(getPreviousUsers(firstObjectId));
  };

  const handleDelete = (userId) => {
    let isConfirmed = window.confirm("Are you sure to Delete it?");
    if (!isConfirmed) {
      return;
    }
    dispatch(deleteUser(userId));
  };

  return (
    <Container fluid className="col-xl-10 col-lg-10 offset-1">
      <h2 className="h2 text-center mb-4">Users Detail</h2>
      <Table bordered>
        <thead>
          <tr className="table-dark">
            <th>ID.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>City</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
        {deleteLoading && <Loader padding="0" loaderText="Deleting..." />}
          {!loading && lastObjectId ? (
            users.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.isAdmin ? "Admin" : "User"}</td>
                <td>{item.city}</td>
                <td>
                  <span className="mx-2">
                    <FaTrashAlt
                      onClick={() => handleDelete(item._id)}
                      className="text-danger"
                    ></FaTrashAlt>
                  </span>
                  <span className="mx-2">
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
            disabled={isEndOfUserPage ? true : null}
          >
            Next
          </Button>
        </div>
      </div>
      {!deleteLoading &&
        successDelete &&
        deleteMsg &&
        toast("Deleted Successfully", {
          type: "success",
        })}
      {error &&
        toast("Oops! Admin user cannot be deleted", {
          type: "error",
        })}
    </Container>
  );
};

export default ItemTable;
