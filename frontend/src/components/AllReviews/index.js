import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import pictures from "../../data/pictures";

import { getReviews } from "../../store/review";
import DotDotButton from "../DotDotButton";

// import ReviewForm from "../CreateReview";
import './AllReviews.css';

// weird bug

const BusinessReviews = ({business}) => {

  const dispatch = useDispatch();
  const reviewsObj = useSelector((state) => state.review)

  const sessionUser = useSelector(state => state.session.user);


  const reviews = Object.values(reviewsObj).filter(review => review.businessId === business.id)
  // console.log("review components", reviews)

  useEffect(() => {
    dispatch(getReviews(business.id))
  },[dispatch, business.id])

  console.log("reviews in allReview Component", reviews)

  return (

    <>
   <div className="desktop-review">
    {reviews.map((review) =>
      <div className="review-container" key={review.id}>
        <ul>
          <li>
            <div className="user-icon-and-dot">
              <div className="profile">
                <span className="icon">
                <img src={pictures.collection[10].imageUrl} alt="bayon_user"/>
                </span>
                <span className="review-username">
                {review.User.username}
                </span>
              </div>
              { sessionUser?.username == review?.User?.username ?
                <div className="dotStyle">
                  <DotDotButton businessId={business.id} reviewId={review.id}/>
                </div>
                : null
              }
            </div>
            <div className="rating-profile">
              {Array(review.rating).fill(
              <span className="star-color-blue"><i className="fas fa-star fa-xs"></i></span>).map((ele, idx) => <span key={idx}>{ele}</span>)
              }
            </div>
              <div className="review-container">
                {review.answer}
              </div>
              <div>
              </div>
              <div className="image-container">
                <img className="reviewImage" src ={review.imageUrl} alt={review.imageUrl}/>
              </div>
          </li>
        </ul>
      </div>


    )}
  </div>


  <div className="mobile-review">
    {reviews.map((review) =>
      <div className="review-container" key={review.id}>
        <ul>
          <li>
            <div className="user-icon-and-dot-mobile">
              <div className="profile">
                <span className="icon">
                <img src={pictures.collection[10].imageUrl} alt="bayon_user"/>
                </span>
                <span className="review-username">
                {review.User.username}
                </span>
              </div>
              { sessionUser?.username == review?.User?.username ?

              <div className="dotStyle">
                <DotDotButton businessId={business.id} reviewId={review.id}/>
              </div>
              : null
              }
            </div>
            <div className="rating-profile-mobile">
              {Array(review.rating).fill(

              <span className="star-color-blue"><i className="fas fa-star"></i></span>).map((ele, idx) => <span key={idx}>{ele}</span>)

             }
            </div>
              <div className="review-container">
              {review.answer}
              </div>
              <div>

              </div>
              <div className="image-container">
                <img className="reviewImage" src ={review.imageUrl} alt={review.imageUrl}/>
              </div>
          </li>
        </ul>
        <hr className="blank-review-hr"></hr>
        <hr className="each-review-hr"></hr>
      </div>

    )}
  </div>

</>
  )

   }

export default BusinessReviews
