import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormGroup,
  Input,
  Button,
  Card,
  CardBody,
  Form,
  Label,
} from "reactstrap";
import Select from "react-select";
import { createPlace } from "../actions/placeActions";
import "./PlaceForm.css";
import customStyles from "./MultiSelectStyle";
import { toast } from "react-toastify";
import placeBg from "../assets/images/bhaktapurDurbarSquare.webp";

const PlaceForm = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.placeCategory);
  const stayPlaceList = useSelector((state) => state.placeHotel);

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState([]);
  const [stayPlace, setStayPlace] = useState([]);
  const [categoryOption, setCategoryOption] = useState([]);
  const [stayPlaceOption, setStayPlaceOption] = useState([]);

  useEffect(() => {
    if (!categoryList || categoryList.error || categoryList.loading) {
      return setCategoryOption([]);
    }

    if (!stayPlaceList || stayPlaceList.error || stayPlaceList.loading) {
      return setStayPlaceOption([]);
    }

    let options;
    options = categoryList.categories.data.map((item) => {
      return { value: item._id, label: item.name };
    });

    setCategoryOption(options);

    const { hotels } = stayPlaceList;
    options = hotels.data.map((item) => {
      return { value: item._id, label: item.name };
    });
    setStayPlaceOption(options);
  }, [categoryList, stayPlaceList]);

  const onCreatePlace = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (!name || !description || !location) {
      return toast("Required fields cannot be empty", {
        type: "info",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }

    let categories = category.map((item) => item.value);
    let hotels = stayPlace.map((item) => item.value);
    formData.append("name", name);
    formData.append("category", JSON.stringify(categories));
    formData.append("location", location);
    formData.append("description", description);
    formData.append("stayPlace", JSON.stringify(hotels));
    formData.append("photo", photo);
    formData.append("ratings", 0);

    dispatch(createPlace(formData));
  };

  return (
    <Card className="align-items-center">
      <CardBody>
        <Form id="place-form" name="placeForm">
          <FormGroup>
            <Label htmlFor="place-photo">
              <div className="custom-place-photo">
                <h3 className="text-light" style={{ opacity: 0.85 }}>
                  {!photo ? "Upload Place Photo" : "Upload Done!"}
                </h3>
                <img src={placeBg} alt="religious" style={{ opacity: 0.4 }} />
              </div>
            </Label>
            <Input
              style={{ display: "none" }}
              id="place-photo"
              name="photo"
              type="file"
              placeholder="Place Name"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              id="place-name"
              name="name"
              placeholder="Place Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              id="place-location"
              name="location"
              placeholder="Place Location"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="textarea"
              id="place-description"
              name="description"
              placeholder="Place Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </FormGroup>
          <FormGroup className="my-4">
            <Select
              isMulti
              name="category"
              options={categoryOption}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select Categories"
              styles={customStyles}
              onChange={(val) => setCategory(val)}
            />
          </FormGroup>
          <FormGroup className="my-4">
            <Select
              isMulti
              name="stayPlace"
              options={stayPlaceOption}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select Stay Place"
              styles={customStyles}
              onChange={(val) => setStayPlace(val)}
            />
          </FormGroup>
          <Button onClick={onCreatePlace}>Create Place</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default PlaceForm;
