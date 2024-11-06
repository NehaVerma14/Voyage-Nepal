import React from "react";
import "./CollapseUtility.css";
import { useHistory } from "react-router-dom";

const CollapseUtility = ({
  menu
}) => {
  const history = useHistory();

  const handleClick = (val) => {
    return history.push(val);
  }

  return (
    <div id="collapseUtilities" className="mt-2 py-3">
      <div className="bg-white rounded d-flex flex-column align-items-center">
        {menu.map((item, index) => (
          <p
            className="nav-link py-1 px-3 my-1 w-100"
            key={index}
            onClick={() => handleClick(item.linkText)}
          >
            {item.subMenuTitle}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CollapseUtility;
