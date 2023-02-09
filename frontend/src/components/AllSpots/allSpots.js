import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import "./allSpots.css";
import spotCard from "./spotCard";
// import spotReducer from "../../store/spots";

//Get All Spots Home
// get all spots will be displayed in home
const AllSpots = (spot) => {
  const dispatch = useDispatch();
  let allSpots = useSelector((state) => state.spot); //useSelector for the state being used to attain info
  let allSpotsArr;
  // = Object.values(allSpots) // attained info in array
  //create function for currentSpot

  useEffect(() => {
    dispatch(getAllSpots());
  }, []);

  if (allSpots) {
    allSpotsArr = Object.values(allSpots);
  }
  // const user = useSelector(state => state.session.user);
  // if (!allSpotsArr.length) return null;

  return (
    <>
      <div className='outerSpotContainer'>
        {allSpotsArr &&
          allSpotsArr.map((spot) => (
            <div
              className='spotCard'
              key={spot.id}
             >
              <NavLink to={`/spots/${spot.id}`}>
                <img
                  className='spotImg'
                  src={spot?.previewImage}
                />
              </NavLink>
              <div className='allSpotscardinfo'>
                <div className='cityState'>{`${spot?.city}, ${spot?.state}`}</div>
                <div id='starRating' >
                  <i className='fa fa-star' id="starIcon"></i>
                  {/* {Math.trunc(spot?.avgRating)} */}
                  {Number(spot?.avgRating).toFixed(1)}
                </div>
                <div className="price">{`$${spot?.price} night`}</div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default AllSpots;
