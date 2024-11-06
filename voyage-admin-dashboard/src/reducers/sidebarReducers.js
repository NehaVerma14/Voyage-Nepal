import {
  TOGGLE_PLACE,
  TOGGLE_CATEGORY,
  TOGGLE_HOTEL,
  TOGGLE_USER,
  TOGGLE_REVIEW
} from "../actions/action.types";

const sidebarReducers = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_PLACE:
      return {
        placeToggle: !state.placeToggle,
        categoryToggle: false,
        hotelToggle: false,
        userToggle: false,
        reviewToggle: false,
      };
    case TOGGLE_CATEGORY:
      return {
        placeToggle: false,
        categoryToggle: !state.categoryToggle,
        hotelToggle: false,
        userToggle: false,
        reviewToggle: false
      };
    case TOGGLE_HOTEL:
      return {
        placeToggle: false,
        categoryToggle: false,
        hotelToggle: !state.hotelToggle,
        userToggle: false,
        reviewToggle: false
      };
    case TOGGLE_USER:
      return {
        placeToggle: false,
        categoryToggle: false,
        hotelToggle: false,
        userToggle: !state.userToggle,
        reviewToggle: false
      };
    case TOGGLE_REVIEW:
      return {
        placeToggle: false,
        categoryToggle: false,
        hotelToggle: false,
        userToggle: false,
        reviewToggle: !state.reviewToggle
      }
    default: 
      return {}
  }
};

export { sidebarReducers };