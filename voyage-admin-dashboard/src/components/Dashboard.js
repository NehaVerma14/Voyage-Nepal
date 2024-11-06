import React from "react";
import OverviewCard from "./OverviewCard";
import { useSelector, } from "react-redux";
import Loader from "./Loader";
import PlaceTable from "../components/PlaceTable";
import CategoryTable from "../components/CategoryTable";
import HotelTable from "../components/HotelTable";
import ItemTable from "./ItemTable";
import "./Dashboard.css";

//actions

const Dashboard = () => {
  const { loading, countData, success } = useSelector(
    (state) => state.docsCount
  );

  const {
    showUser,
    showCategory,
    showPlace,
    showHotel
  } = useSelector(state => state.overviewToggle);

  const getTableOverview = () => {
    if(showUser) {
      return <ItemTable />
    } else if (showPlace) {
      return <PlaceTable />
    } else if (showCategory) {
      return <CategoryTable />
    } else if (showHotel) {
      return <HotelTable />
    } else {
      return <Loader padding="50px"  loaderText="" />;
    }
  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-secondary">Dashboard</h1>
      </div>

      <div className="row">
        <div className="col-xl-3 col-md-6 mb-4">
          <OverviewCard
            title="registered users"
            info={
              !loading && success && countData.data ? (
                countData.data.userCount
              ) : (
                <Loader padding="5px" loaderText={null} />
              )
            }
            borderStyle="primary"
          />
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <OverviewCard
            title="total places"
            info={
              !loading && success && countData.data ? (
                countData.data.placeCount
              ) : (
                <Loader padding="5px" loaderText={null} />
              )
            }
            borderStyle="success"
          />
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <OverviewCard
            title="total categories"
            info={
              !loading && success && countData.data ? (
                countData.data.categoryCount
              ) : (
                <Loader padding="5px" loaderText={null} />
              )
            }
            borderStyle="info"
          />
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <OverviewCard
            title="Hotel and Restaurants"
            info={
              !loading && success && countData.data ? (
                countData.data.hotelCount
              ) : (
                <Loader padding="5px" loaderText={null} />
              )
            }
            borderStyle="warning"
          />
        </div>
      </div>

      <div className="row mt-4">
        {getTableOverview()}
      </div>
    </>
  );
};

export default Dashboard;
