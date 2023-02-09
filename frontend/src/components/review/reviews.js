import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllReviews } from "../../store/reviews";
import './review.css';

const AllReviews = (id) => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const allReviews = useSelector((state) => state.spot.spot); //useSelector for the state being used to attain info
  const allReviewsArr = Object.values(spotId || {})


  useEffect(() => {
    dispatch(getAllReviews())
  }, [])

  const user = useSelector(state => state.session.user);
  if (!allReviewsArr.length) return null;

  return (
    <>
     <div className="reviews">
        {/* <ul> */}
          {
            allReviewsArr.map(review => (
              <div>
                <div>{ review?.Reviews[0].user.firstName }</div>
                <div>{ review?.Reviews[0].user.lastName}</div>
                <div>{ review?.Reviews[1].previewImage}</div>
                <div>{ review?.Reviews[0].review }</div>
                <div>{ review?.Reviews[0].stars}</div>
                <div>{ review?.Reviews[1].name}</div>
                <div>{ review?.Reviews[1].address}</div>
                <div>{ review?.Reviews[1].city}</div>
                <div>{ review?.Reviews[1].state}</div>
                {/* <div>{ }</div> */}
              </div>
            ))
        }
      {/* </ul> */}
     </div>
    </>
  )

}

export default AllReviews
