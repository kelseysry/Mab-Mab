// api


const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')

const { Business } = require('../../db/models');
const { Review } = require('../../db/models')
const { User } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')

const businessNotFoundError = businessId => {
  const err = Error('Business not found');
  err.errors = [`Business with id of ${businessId} could not be found.`];
  err.title = 'Business not found.';
  err.status = 404;
  return err;
}

const oneReviewNotFoundError = reviewId => {
  const err = Error('Review not found');
  err.errors = [`Review with id of ${reviewId} could not be found.`];
  err.title = 'Review not found';
  err.status = 404;
  return err
}

router.get('/', asyncHandler(async (req, res) => {
  const businesses = await Business.findAll({include : [Review]});
  res.json(businesses) // sends an array of businesses to the front end

}));


router.get('/:businessId(\\d+)', asyncHandler(async (req, res) => {
  const business = await Business.findByPk(req.params.businessId, {
    include: [User, Review]
  });
  // console.log("this is business maybe User", business.User)
  return res.json(business) // sends one business to the front end

}));

// create one business
router.post('/', asyncHandler(async (req, res) =>{
  const id = await Business.create(req.body);
  // console.log("this is in api", id)
  // res.redirect(`/${id}`)
  return res.json(id)
})
)

// edit one business
router.put('/:businessId(\\d+)', requireAuth, asyncHandler(async (req, res, next) => {
  const business = await Business.findByPk(req.params.businessId, {
    include: [User]
  })

  // console.log("business in api route", business)
  if(business) {
    business.title = req.body.title || business.title;
    business.description = req.body.description || business.description;
    business.address = req.body.address || business.address;
    business.city = req.body.city || business.city;
    business.zipCode = req.body.zipCode || business.zipCode;
    business.imageUrl = req.body.imageUrl || business.imageUrl;
    business.lat = req.body.lat || business.lat;
    business.lng = req.body.lng || business.lng;

    await business.save();
    // console.log("api route, res.json(business)", business) // business is saving properly
    res.json({business})
  } else {
    // next(businessNotFoundError(req.params.businessId))


  }
  // const {title, description, address, city, zipCode, imageUrl} = req.body
  // await previousObj.update({title:title, description:description, address:address, city, zipCode, imageUrl})
  // let newobj = await previousObj.save()
  // return res.json(newobj)
  })
);

// delete one business
router.delete('/:businessId(\\d+)', asyncHandler(async(req, res, next) => {
  const business = await Business.findByPk(req.params.businessId);
  if (business) {
    await business.destroy();
    res.status(204).end();
  } else {
    next(businessNotFoundError(req.params.businessId))
  }
}));

// get reviews for one business
router.get('/:businessId(\\d+)/reviews', asyncHandler(async(req, res) => {
  // const business = await Business.findByPk(req.params.businessId);

  const reviews = await Review.findAll({
    where: {
      businessId: req.params.businessId
    },
    include: [User]
  })

  // console.log("this is reviews", reviews)
  // console.log("this is reviews.User, no array", reviews.User)
  // console.log("this is reviews.User in the api yaaaa", reviews[0].User)

  return res.json(reviews)
}))

// create one review for one business
router.post('/:businessId(\\d+)/reviews', asyncHandler(async(req,res) => {
  const review = await Review.create(req.body);

  const reviewAndUser = await Review.findByPk(review.id, {
    include: [User]
  })

  // console.log("review in backend", reviewAndUser)
  return res.json(reviewAndUser)
}))

// edit one review for one business
router.put('/:businessId(\\d+)/reviews/:reviewId(\\d+)', asyncHandler(async(req, res, next) => {

  const oneReview = await Review.findByPk(req.params.reviewId, {
      include: [User]
  })

  console.log("edit review in API", oneReview)

  if(oneReview) {
    oneReview.rating = req.body.rating || oneReview.rating;
    oneReview.answer = req.body.answer || oneReview.answer;
    oneReview.imageUrl = req.body.imageUrl || oneReview.imageUrl;

    await oneReview.save();
    res.json({oneReview})
  }
}))

// delete one review for a business
router.delete('/:businessId(\\d+)/reviews/:reviewId(\\d+)', asyncHandler(async(req, res, next) => {
  const oneReview = await Review.findByPk(req.params.reviewId);
  console.log("oneReview API", oneReview)
  if(oneReview) {
    await oneReview.destroy();
    res.status(204).end();
  } else {
    next(oneReviewNotFoundError(req.params.reviewId))
  }
}));



module.exports = router;
