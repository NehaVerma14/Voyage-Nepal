import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    FaHotel,
    FaList,
    FaStar,
    FaUserAlt,
} from "react-icons/fa";
import {
    MdLocationOn,
    MdKeyboardArrowRight,
    MdKeyboardArrowDown,
} from "react-icons/md";
import {
  TOGGLE_CATEGORY,
  TOGGLE_PLACE,
  TOGGLE_HOTEL,
  TOGGLE_USER,
  TOGGLE_REVIEW
} from "../actions/action.types";
import CollapseUtility from "./CollapseUtility";
import "./Sidebar.css"

const SidebarMenu = ({
  menuTitle = "Place",
  utilityMenu,
  toggleKey,
}) => {
  const dispatch = useDispatch();
  const sidebarToggle = useSelector(state => state.sidebarToggle);

  const handleToggle = (title) => {
    switch (title) {
      case "Place":
        dispatch({ type: TOGGLE_PLACE });
        break;
      case "Categories":
        dispatch({ type: TOGGLE_CATEGORY });
        break;
      case "Hotel":
        dispatch({ type: TOGGLE_HOTEL });
        break;
      case "User":
        dispatch({ type: TOGGLE_USER });
        break;
      case "Review":
        dispatch({ type: TOGGLE_REVIEW });
        break;
      default:
        break;
    }
  };

  //get review based on menu title
  const getConditionalIcon = () => {
    switch (menuTitle) {
        case "Place":
          return <MdLocationOn size="20" className="menu-icon" />
        case "Categories":
          return <FaList className="menu-icon" />
        case "Hotel":
          return <FaHotel className="menu-icon" />
        case "User":
          return  <FaUserAlt className="menu-icon" />
        case "Review":
          return <FaStar size="20" className="menu-icon" />
        default:
          break;
    }
  }

  return (
    <li
      className="nav-item nav-link ms-3"
      onClick={() => handleToggle(menuTitle)}
    >
      <Link className="nav-link collapsed" to="#">
        {getConditionalIcon()}
        <span className="ms-2 text-light">{menuTitle}</span>
        {!sidebarToggle[toggleKey] ? (
          <MdKeyboardArrowRight size="18" className="float-end text-light" />
        ) : (
          <MdKeyboardArrowDown size="18" className="float-end text-light" />
        )}

        {sidebarToggle[toggleKey] && <CollapseUtility menu={utilityMenu} />}
      </Link>
    </li>
  );
};

export default SidebarMenu;
