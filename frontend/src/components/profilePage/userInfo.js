import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { getUsersSpots, viewUserSpots } from "../../store/spots";
import { getUserReviews } from "../../store/reviews";
import { deleteReview } from "../../store/reviews";
import "./userSpots.css";

const AllUserSpots = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const state = useState()
  const userSpots = useSelector((state) => state.spot.spot); //useSelector for the state being used to attain info
  const allUserSpotsArr = Object.values(userSpots);
  const user = useSelector((state) => state.session.user);
  const { spotId, reviewId } = useParams();
  const oneSpot = useSelector((state) => state.spot);

  useEffect(() => {
    dispatch(getUsersSpots(user.id))
  }, []);


console.group(userSpots, "userSpotsArr")
  // useEffect(() => {
  //   dispatch(getUsersSpots(user.id))
  //     .then((userId) => {
  //     dispatch(viewUserSpots(userId))
  //   })
  // }, []);

  useEffect(() => {
    dispatch(getUserReviews(spotId));
  }, []);

  const userReviews = useSelector((state) => state.spot.spot.review);
  if (!allUserSpotsArr.length) return null;


  const reviewDelete = () => {
    dispatch(deleteReview(reviewId));
    alert("Deletion Successful");
    history.push(`/spots/${spotId}/reviews`);
  };

  return (
    <>
      <div className='userSpotPageContainer'>
        <ul>
          {allUserSpotsArr.map((spot) => (
            <div className='userSpotPage'>
              <div>{spot.name}</div>
              <div>{spot.address}</div>
              <div>{spot.city}</div>
              <div>{spot.state}</div>
              <div>{spot.description}</div>
              <div>{spot.avgRating}</div>
              <div>{spot.price}</div>
              <NavLink to={`/spots/${spot.id}`}>
                <img
                  className='spotImg'
                  src={spot.previewImage}
                />
              </NavLink>
            </div>
          ))}
        </ul>
        <div className="userReview">
          {/* <ul> */}
            {userReviews.map((review) => (
              <div key={review.id}>
                <div>{review.User.firstName}</div>
                <div>{review.User.lastName}</div>
                <div>{review.review}</div>
                <div>{review.stars}</div>
              </div>
            ))}
          {/* </ul> */}
          {oneSpot?.review?.userId === user?.id && (
            <button className="deleteReviewButton" onClick={() => reviewDelete()}>delete Review</button>
          )}
        </div>
      </div>
    </>
  );
};

export default AllUserSpots;
