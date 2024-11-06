import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaLaughWink } from "react-icons/fa";
import { logout } from "../actions/userActions";
import { RiLogoutBoxLine } from "react-icons/ri";

import SidebarMenu from "./SidebarMenu";
import "./Sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { userData } = userInfo;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ul className="navbar-nav bg-primary" id="accordionSidebar">
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center nav-link"
        to="/"
      >
        <div className="sidebar-brand-icon py-3">
          <FaLaughWink size={32} className="text-light"/>
        </div>
        <div className="sidebar-brand-text mx-3 fw-bold text-light fs-4">
          {userData.name.split(" ")[0]}
        </div>
      </Link>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item active mx-3 pt-3">
        <Link className="nav-link" to="/">
          <FaTachometerAlt className="menu-icon" />
          <span className="ms-2 text-light fw-bold">Dashboard</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <div className="ms-3 text-uppercase interface-text">Interface</div>

      <SidebarMenu
        menuTitle="Place"
        utilityMenu={[
          { subMenuTitle: "Create Place", linkText: "/place/create" },
          { subMenuTitle: "Update Place", linkText: "/place/update" },
          { subMenuTitle: "Delete Place", linkText: "/place/delete" },
        ]}
        toggleKey="placeToggle"
      />

      <SidebarMenu
        menuTitle="Categories"
        utilityMenu={[
          { subMenuTitle: "Create Category", linkText: "/category/create" },
          { subMenuTitle: "Update Category", linkText: "/category/update" },
          { subMenuTitle: "Delete Category", linkText: "/category/delete" },
        ]}
        toggleKey="categoryToggle"
      />

      <SidebarMenu
        menuTitle="Hotel"
        utilityMenu={[
          { subMenuTitle: "Create Hotel", linkText: "/hotel/create" },
          { subMenuTitle: "Update Hotel", linkText: "/hotel/update" },
          { subMenuTitle: "Delete Hotel", linkText: "/hotel/delete" },
        ]}
        toggleKey="hotelToggle"
      />

      <SidebarMenu
        menuTitle="User"
        utilityMenu={[
          { subMenuTitle: "User Role", linkText: "/user/update/role" },
          { subMenuTitle: "Delete User", linkText: "/user/delete" },
        ]}
        toggleKey="userToggle"
      />

      <SidebarMenu
        menuTitle="Review"
        utilityMenu={[
          { subMenuTitle: "Manage Review", linkText: "/user/review" },
        ]}
        toggleKey="reviewToggle"
      />

      <hr className="sidebar-divider" />

      <div className="text-center d-none d-md-inline">
        <RiLogoutBoxLine
          size={32}
          className="text-light"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        />
      </div>
    </ul>
  );
};

export default Sidebar;
