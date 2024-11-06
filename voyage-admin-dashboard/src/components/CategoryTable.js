import React from "react";
import { useEffect } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Table, Button, Container } from "reactstrap";
import { deleteCategory, getNextCategory, getPreviousCategory } from "../actions/categoryActions";
import { getDocsCount } from "../actions/countActions";
import Loader from "../components/Loader";


const CategoryTable = () => {
  const dispatch = useDispatch();

  const {
    deleteMsg,
    loading: deleteLoading,
    success: successDelete,
    error
  } = useSelector((state) => state.categoryDelete);

  const {
    lastObjectId,
    isEndOfCategoryPage,
    isFirstPage,
    firstObjectId,
    categories,
    loading,
  } = useSelector((state) => state.categoryList);

  useEffect(() => {
    if(!deleteMsg) {
      return;
    }
    
    dispatch(getNextCategory());
    dispatch(getDocsCount());
  }, [deleteMsg, dispatch]);

  const handleNextPage = () => {
    if (!isEndOfCategoryPage) {
      dispatch(getNextCategory(lastObjectId));
    }
  };

  const handlePreviousPage = () => {
    dispatch(getPreviousCategory(firstObjectId));
  };

  const handleDelete = (catId) => {
    let isConfirmed = window.confirm("Are you sure to Delete it?");
    if (!isConfirmed) {
      return;
    }
    dispatch(deleteCategory(catId));
  };


  return (
    <Container className="col-xl-10 col-lg-10 offset-1">
      <h2 className="h2 text-center mb-4">Categories Details</h2>
      <Table bordered>
        <thead>
          <tr className="table-dark">
            <th>ID.</th>
            <th>Name</th>
            <th>Difficulty</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
        {deleteLoading && <Loader padding="0" loaderText="Deleting..." />}
        {!loading && lastObjectId ? (
            categories.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.difficulty}</td>
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
            disabled={isEndOfCategoryPage ? true : null}
          >
            Next
          </Button>
        </div>
      </div>
      {!deleteLoading &&
        successDelete &&
        deleteMsg &&
        toast("Category delete Success!", {
          type: "success",
        })}
      {error &&
        toast("Oops! Unable to delete Category!", {
          type: "error",
        })}
    </Container>
  );
};

export default CategoryTable;
