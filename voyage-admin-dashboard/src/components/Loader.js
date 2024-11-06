import React from "react";
const Loader = ({padding = "250px", loaderText="Loading" }) => {
  return (
      <div className="text-center" style={{paddingTop: padding, color: "#7578D3"}}>
        <div className="spinner-border"></div>
        {loaderText && <h3 className="text-muted">{loaderText}</h3>}
      </div>
  );
};

export default Loader;
