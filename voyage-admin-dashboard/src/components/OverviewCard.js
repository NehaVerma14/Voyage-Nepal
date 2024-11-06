import React from "react";
import {
  TOGGLE_OVERVIEW_USER,
  TOGGLE_OVERVIEW_PLACE,
  TOGGLE_OVERVIEW_CATEGORY,
  TOGGLE_OVERVIEW_HOTEL
} from "../actions/action.types";
import { getNextPlaces } from "../actions/placeActions";
import { getNextCategory } from "../actions/categoryActions";
import { getNextStayPlace } from "../actions/stayPlaceActions";
import { useDispatch } from "react-redux";

const OverviewCard = ({ title, info, borderStyle = "primary" }) => {
  const dispatch = useDispatch();

  const handleOnClick = (e) => {
    switch (borderStyle) {
      case 'primary':
        dispatch({ type: TOGGLE_OVERVIEW_USER });
        break;
      case 'success':
        dispatch({ type: TOGGLE_OVERVIEW_PLACE });
        dispatch(getNextPlaces())
        break;
      case 'info':
        dispatch({ type: TOGGLE_OVERVIEW_CATEGORY });
        dispatch(getNextCategory())
        break;
      case 'warning':
        dispatch({ type: TOGGLE_OVERVIEW_HOTEL });
        dispatch(getNextStayPlace())
        break;
      default:
        break;
    }
  }

  return (
    <div className={`card border-start border-${borderStyle} border-5 py-1 shadow h-100`}
    style={{ cursor: 'pointer'}}
    onClick={handleOnClick}
    >
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col">
            <div
              className={`fw-bold text-${borderStyle} text-uppercase mb-1`}
              style={{ fontSize: "12px"}}
            >
              {title}
            </div>
            <div className="h6 fw-bold text-muted">{info}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
