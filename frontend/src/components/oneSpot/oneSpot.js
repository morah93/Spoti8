import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneSpot } from "../../store/spots";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deleteSpot } from "../../store/spots";
import { getAllReviews } from "../../store/reviews";
import { createReview } from "../../store/reviews";
import { deleteReview, removeReview } from "../../store/reviews";
// import { getUserReviews } from "../../store/reviews";
import "./oneSpot.css";
import EditSpotModal from "../editSpot";
import AddReviewModal from "../addReview";
// import editASpot from "../editSpot/editSpot";

const OneSpot = ({ setEditSpotModal, setAddReviewModal }) => {
  const dispatch = useDispatch();
  const { spotId, reviewId } = useParams();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);

  const allReviews = useSelector((state) => state.reviews.spotReviews); //useSelector for the state being used to attain info
  const allReviewsArr = Object.values(allReviews);
  // const [createReviewModal, setCreateReviewModal] = useState(false);

  const singleSpot = useSelector((state) => state.spot.singleSpot);

  useEffect(() => {
    // console.log('oneSpot useEffect+++++++++')
    dispatch(getOneSpot(spotId));
  }, [spotId, singleSpot, allReviews]);

  const oneSpot = useSelector((state) => state.spot[spotId]); //useSelector for the state being used to attain info

  // console.log(oneSpot, "onespot----------------=======");
  useEffect(() => {
    dispatch(getAllReviews(spotId));
  }, [spotId]);

  const spotDelete = () => {
    dispatch(deleteSpot(spotId)).then(() => {
      alert("Deletion Successful");
      history.push("/");
    });
  };

  const addReview = (spotId) => {
    dispatch(createReview(spotId));
    // setAddReviewModal(true)
    history.push(`/spots/${spotId}/reviews`);
  };

  const reviewDelete = (reviewId) => {
    dispatch(deleteReview(reviewId)).then(() => {
      alert("Deletion Successful");
      // history.push(`/spots/${spotId}/reviews`);
      dispatch(removeReview(reviewId));
    });
  };
  let foundReview = true;
  for (let i = 0; i < allReviewsArr.length; i++) {
    if (user) {
      if (user.id === allReviewsArr[i].userId) foundReview = false;
    }
  }

  if (!oneSpot?.SpotImages) return null;

  return (
    <>
      <div className='outerContainer'>
        <div className='innerContainer'>
          {/* <ul> */}
          <div id='spotName'>{oneSpot?.name}
          <div
            id='rating'
            className='fa fa-star'
            >
            {/* {
              { for(i = 0; i<allReviews.length; i++) {

                console.log(allReviews[i], 'starrssssss')
            }
            }} */}
              <div id='number'>

            {Number(oneSpot?.avgRating).toFixed(1)}
                </div>
          </div>
          </div>
          <img
            className='spotImg1'
            src={oneSpot?.SpotImages[0]?.url}
          />

          <div className='spotInfo'>
            {/* <div id='address'>{oneSpot?.address}</div> */}
            <div id='cityState'>{`${oneSpot?.city}, ${oneSpot?.state}`}</div>
            <div id='country'>{oneSpot?.country}</div>
            <div id='description'>{`${oneSpot?.description}`}</div>
            <div id='price'>{`$${oneSpot?.price} night`}</div>
          </div>
          {oneSpot?.ownerId === user?.id && (
            // <button
            //   className='editButton'
            //   onClick={() => {
            //     setEditSpotModal(true)
            //     history.push(`${oneSpot.id}/edit`);
            //   }}
            // >
            //   Edit Spot
            // </button>
            <EditSpotModal spot={oneSpot} />
          )}
          {user && foundReview && (
            <AddReviewModal />
            // <button
            //   className='createReviewButton'
            //   onClick={() => {
            //     // setAddReviewModal(true)
            //     addReview(spotId);
            //   }}
            // >
            //   Create Review
            // </button>
          )}
          {oneSpot?.ownerId === user?.id && (
            <button
              className='deleteButton'
              onClick={() => spotDelete()}
            >
              Delete Spot
            </button>
          )}
          {/* </ul> */}
          <h3 className='review'>Reviews</h3>
          {/* <ul> */}
          <div className='reviewContainer'>
            {allReviewsArr.map((review) => (
              <div
                className='userReview'
                key={review.id}
              >
                <div>
                  <i
                    id='starReview'
                    className='fa fa-star'
                  ></i>
                  {`Stars: ${review.stars}`}
                  {review.length}
                </div>
                <div className='userReviewNames'>{`${review?.User?.firstName} ${review?.User?.lastName}`}</div>
                <div className='userReview1'>{`"${review.review}"`}</div>
                {review?.userId === user?.id && (
                  <button
                    className='deleteReviewButton'
                    onClick={() => reviewDelete(review.id)}
                  >
                    Delete Review
                  </button>
                )}
              </div>
            ))}
          </div>
          {/* </ul> */}
        </div>
      </div>
    </>
  );
};

export default OneSpot;
