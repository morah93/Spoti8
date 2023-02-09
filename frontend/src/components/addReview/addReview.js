import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSpot, getOneSpot } from "../../store/spots";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { createReview } from "../../store/reviews";
import "./addReview.css";

const AddReview = ({ setAddReviewModal }) => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [errors, setErrors] = useState([]);
  const [hasSubmit, setHasSubmit] = useState(false);
  const history = useHistory();
  // const [createReviewModal, setCreateReviewModal] = useState(false)

  useEffect(() => {
    const errors = [];
    if (!review.length) errors.push("Review cannot be empty");
    if (review.length > 255) errors.push("Review too long");
    if (!stars) errors.push("Please put a valid number");
    setValidationErrors(errors);
  }, [review, stars]);

  // useEffect(() => {
  //   dispatch(getOneSpot(spotId))
  // }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmit(true);
    const payload = {
      review,
      stars,
    };

    console.log(validationErrors);

    if (validationErrors.length) return alert(`Cannot Add Review`);

    let newReview = await dispatch(createReview(payload, spotId));
    if (newReview) {
      dispatch(getOneSpot(spotId));
      history.push(`/spots/${spotId}`);
    }
    setAddReviewModal(false);

    dispatch(getOneSpot(spotId));
    history.push(`/spots/${spotId}`);
    // setErrors([]);
    // return dispatch(createReview())
    //   .then(() => {
    //     dispatch(getOneSpot(spotId));
    //     alert("Successful");
    //     // history.push(`/spots/${spotId}`);
    //   })
    //   .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    // alert("Failed");
    // });
  };

  return (
    <>
      <div className='createReview'>
        {validationErrors.length > 0 && setHasSubmit && (
          <div className="error">
            {" "}
            Required Fields
            <ul>
              {validationErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        {/* <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul> */}
        <form
          id='review-form'
          onSubmit={handleSubmit}
        >
          <h2 className='review'>Please Leave a Review</h2>
          {/* {validationErrors.length > 0 &&
            validationErrors.map((err) => {
              <div>{err}</div>;
            })} */}
          <div id='review-content'>
            <textarea
              id='review-text'
              placeholder='....type here'
              value={review}
              onChange={(e) => setReview(e.target.value)}
              // required
              maxLength={255}
            />
            <div className="bottom">

            <i className='fa fa-star'></i>
            <input
              id='input'
              type='number'
              min='1'
              max='5'
              placeholder=''
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              // required
            />
            <button
              className='submitButton'
              id='review-button'
              type='submit'
            >
              Submit Review
            </button>

            <button
              className='cancelButton'
              onClick={() => {
                setAddReviewModal(false);
                history.push(`/spots/${spotId}`);
              }}
            >
              Cancel
            </button>
            </div>
          </div>

          {/* {hasSubmit && validationErrors.length > 0 && (
            <div id='error-div'>
            The following errors were found:
            <ul id='error-list'>
            {validationErrors.map((error, idx) => <li id='errors' key={idx}>{error}</li>)}
            </ul>
            </div>
          )} */}
        </form>
      </div>
    </>
  );
};

export default AddReview;
