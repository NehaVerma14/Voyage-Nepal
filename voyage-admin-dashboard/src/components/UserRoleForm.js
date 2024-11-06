import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  FormGroup,
  Input,
  Button,
  Card,
  CardBody,
  Form,
  Label,
} from "reactstrap";
import "../components/UserRoleForm.css";
import { updateUserRole } from "../actions/userActions";

const UserRoleForm = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState(true);

  const handleOnSubmit = () => {
    dispatch(updateUserRole(userId, role));
  }

  return (
    <Card className="align-items-center">
      <CardBody>
        <Form id="user-role-form">
          <FormGroup>
            <Label for="user-id" className="mb-2">
              Enter User Id
            </Label>
            <Input
              type="text"
              id="user-id"
              name="userid"
              value={userId}
              onChange={(e) => setUserId(e.target.value.trim())}
              placeholder="Enter User ID"
            />
          </FormGroup>
          <FormGroup>
            <Label for="user-role" className="mb-2">
              Choose a user role
            </Label>
            <Input
              type="select"
              id="user-role"
              className="text-secondary"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value={role}>Admin</option>
              <option value={!role}>User</option>
            </Input>
          </FormGroup>
          <div className="d-grid gap-2">
            <Button onClick={handleOnSubmit}>Submit</Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default UserRoleForm;
