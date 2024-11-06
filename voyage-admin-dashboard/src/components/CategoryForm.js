import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import {
  FormGroup,
  Input,
  Button,
  Card,
  CardBody,
  Form,
} from "reactstrap";
import { createCategory } from "../actions/categoryActions";
import "./CategoryForm.css";

const CategoryForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState();

  const onCreateCategory = (e) => {
    e.preventDefault();

    const categoryData = {
      name,
      difficulty,
    };

    if (!name || !difficulty) {
      return toast("Required fields cannot be empty", {
        type: "info",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }

    dispatch(createCategory(categoryData));
  };

  return (
    <Card className="align-items-center">
      <CardBody>
        <Form id="category-form">
          <FormGroup>
            <Input
              type="text"
              id="category-name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category Name"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              id="category-difficulty"
              name="location"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              placeholder="Difficulty"
            />
          </FormGroup>
          <Button onClick={onCreateCategory}>Create Category</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CategoryForm;
