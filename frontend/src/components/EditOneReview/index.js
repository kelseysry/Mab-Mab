import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getOneBusiness } from "../../store/business";
import { getReviews } from "../../store/review";
import isURL from 'validator/es/lib/isURL';
import { editOneReview } from '../../store/review';
import { useHistory } from 'react-router';

// will need to thread the review the user is passing in from the SingleBusinessPage component
const EditOneReview = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { businessId } = useParams();
  const { reviewId } = useParams();

    const review = useSelector((state) => state.review[reviewId])

  // console.log("one review from state", review)

  const [rating, setRating] = useState(review?.rating);
  const [answer, setAnswer] = useState(review?.answer);
  const [imageUrl, setImageUrl] = useState(review?.imageUrl);
  const [errors, setErrors] = useState([]);

  // grab the user from state so a user doesn't have the manually input their data into the form
  // we automatically know who's submitting the form
  const sessionUser = useSelector((state) => state.session.user)
  const userId = sessionUser.id

  // getOneBusiness thunk, have to import this in order to grab the business from the stata via useSelector
  useEffect(() => {
    dispatch(getOneBusiness(businessId));
  }, [dispatch, businessId]);

  // get all reviews
  useEffect(() => {
    dispatch(getReviews(businessId))
  },[dispatch, businessId])

  useEffect(() => {
    const validationErrors = [];
    if(!rating) validationErrors.push("Rating is required")
    if(rating > 5 || rating < 1) validationErrors.push("Rating must be between 1-5")
    if(!answer) validationErrors.push("Please write a review!")
    if(answer?.length < 10) validationErrors.push("Review must be at least 10 characters!")
    if(!imageUrl) {
      validationErrors.push("Please provide an image")
    } else if (!isURL(imageUrl)) {
      validationErrors.push("Please provide a valid link for the image")
    }
    setErrors(validationErrors)

  },[rating,answer,imageUrl,userId,businessId])



  const handleSubmit = async(e) => {
    e.preventDefault();

    const editReview = {
      rating,answer,imageUrl,userId,businessId
    }

    let createdReview = await dispatch(editOneReview(editReview, reviewId, businessId))

    if(createdReview) {
      history.push(`/business/${businessId}`)
    }

  }

  const handleCancelReviewFormClick = (e) => {
    e.preventDefault();
    history.push(`/business/${businessId}`)
  }

  return (
<>
    <form onSubmit={handleSubmit}>

      <label>
          <input
            type="number"
            placeholder="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
          </input>
      </label>
      <label>
          <input
            placeholder="review"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          >
          </input>
      </label>
      <label>
        <input
        type="text"
        placeholder="image url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        >
        </input>
      </label>
      <ul className="error">
      {errors.map((error) => <li key={error}>{error}</li>)}
      </ul>
      <button type="submit" disabled={errors?.length>0} >Submit Review</button>
      <button type="button" onClick={handleCancelReviewFormClick}>Cancel</button>

    </form>
    </>
  )

}


export default EditOneReview
