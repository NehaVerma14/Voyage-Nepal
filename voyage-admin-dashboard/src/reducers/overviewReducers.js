import {
    TOGGLE_OVERVIEW_PLACE,
    TOGGLE_OVERVIEW_CATEGORY,
    TOGGLE_OVERVIEW_HOTEL,
    TOGGLE_OVERVIEW_USER,
  } from "../actions/action.types";
  
  const overviewReducers = (state = {}, action) => {
    switch (action.type) {
      case TOGGLE_OVERVIEW_PLACE:
        return {
          showPlace: true,
        };
      case TOGGLE_OVERVIEW_USER:
        return {
         showUser: true,
        };
      case TOGGLE_OVERVIEW_CATEGORY:
        return {
          showCategory: true,
        };
      case TOGGLE_OVERVIEW_HOTEL:
        return {
          showHotel: true
        };
      default: 
        return state;
    }
  };
  
  export { overviewReducers };