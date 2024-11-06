import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  FormGroup,
  Input,
  Button,
  Card,
  CardBody,
  Form,
  Label,
} from "reactstrap";
import "./HotelForm.css";

import { createStayPlace } from "../actions/stayPlaceActions";
import hotelBg from "../assets/images/hotel-min.webp";

const HotelForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [rating, setRating] = useState("");
  const [stayPlace, setStayPlace] = useState("");

  const onCreateHotel = (e) => {
    e.preventDefault();

    if (!name || !photo) {
      return toast("Required Fields cannot be empty", {
        type: "info",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("photo", photo);
    formData.append("rating", rating);
    formData.append("stayPlace", stayPlace);

    dispatch(createStayPlace(formData));
  };

  return (
    <Card className="align-items-center">
      <CardBody>
        <Form id="hotel-form">
          <FormGroup>
            <Label htmlFor="hotel-photo">
              <div className="custom-hotel-photo">
                <h3 className="text-light" style={{ opacity: 0.95 }}>
                  {!photo ? "Upload Hotel Photo" : "Upload Done!"}
                </h3>
                <img src={hotelBg} alt="hotels" style={{ opacity: 0.6 }} />
              </div>
            </Label>
            <Input
              style={{ display: "none" }}
              id="hotel-photo"
              name="photo"
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              id="hotel-name"
              name="name"
              placeholder="Hotel Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              id="hotel-rating"
              name="hotel"
              placeholder="Hotel Rating"
              onChange={(e) => setRating(e.target.value)}
              value={rating}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="select"
              name="hotel-type"
              id="hotel-select"
              onChange={(e) => setStayPlace(e.target.value)}
            >
              <option value="Hotel" selected>
                Hotel
              </option>
              <option value="Restaurant">Restaurant</option>
            </Input>
          </FormGroup>
          <Button onClick={onCreateHotel}>Create Hotel</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default HotelForm;
