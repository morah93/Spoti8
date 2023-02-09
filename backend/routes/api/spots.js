const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  SpotImage,
  Spot,
  User,
  Review,
  sequelize,
  Booking,
  ReviewImage,
} = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const spot = require("../../db/models/spot");
const { Op } = require("sequelize");
const e = require("express");

// get all spots
//Done DONT TOUCH
router.get("/", async (req, res, next) => {
  // let spotsArr = [];
  if (Object.keys(req.query).length) return next(); //if theres a query go next
  const allSpots = await Spot.findAll();
  for (let i = 0; i < allSpots.length; i++) {
    //loops thru allspots array
    allSpots[i].dataValues.previewImage = (
      await SpotImage.findOne({
        // creates previewimage key in allSpots
        where: {
          spotId: allSpots[i].id,
          preview: true,
        },
        attributes: ["url"],
      })
    )?.url; //keyed into the url and made that the value

    allSpots[i].dataValues.avgRating = (
      await Review.findOne({
        where: {
          spotId: allSpots[i].id,
        },
        attributes: [
          [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
        ],
        raw: true,
      })
    ).avgRating;
  }
  res.json(allSpots);
});

//get routes pagination

router.get("/", async (req, res) => {
  const { page, size } = req.query;
  const newQuery = {};

  if (!page) page = 1;
  if (!size || parseInt(size) > 20) size = 20;
  if (parseInt(page) > 10) page = 10;

  if (!(parseInt(page) > 0)) {
    res.status(400);
    res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        page: "Page must be greater than or equal to 1",
      },
    });
  }
  if (!(parseInt(size) > 0)) {
    res.status(400);
    res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        size: "Size must be greater than or equal to 1",
      },
    });
  }



  if (page > 0 && size > 0) {
    newQuery.offset = size * (page - 1);
    newQuery.limit = size;
  }

  const allSpots = await Spot.findAll({
    ...newQuery,
  });

  res.json({
    allSpots,
    page,
    size,
  });
});

//Get all Spots owned by the Current User
// Done DONT TOUCH
router.get("/current", requireAuth, async (req, res) => {
  const allSpots = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
  });
  for (let i = 0; i < allSpots.length; i++) {
    //loops thru allspots array

    allSpots[i].dataValues.previewImage = (
      await SpotImage.findOne({
        // creates previewimage key in allSpots
        where: {
          spotId: allSpots[i].id,
          preview: true,
        },
        attributes: ["url"],
      })
    ).url;

    const reviewRating = (allSpots[i].dataValues.avgRating = (
      await Review.findOne({
        where: {
          userId: allSpots[i].id,
          // spotId: allSpots[i].id
        },
        attributes: [
          [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
        ],
        raw: true,
      })
    ).avgRating);
    if (reviewRating === null) {
      //checks to see if there is no rating
      allSpots[i].dataValues.avgRating = "currently no ratings";
    } else {
      allSpots[i].dataValues.avgRating = reviewRating;
    }
  }
  res.json(allSpots);
});

//Get details of a Spot from an id
//Done DONT TOUCH
router.get("/:spotId", async (req, res) => {
  const userSpot = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"], // tryna get information from spotimages
      },
      {
        model: User, //ownerid info
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });
  if (!userSpot) {
    res.status(404)
    res.json({
        "message": "Spot couldn't be found",
        "statusCode": 404
    })
}

  const rating = await Review.findAll({
    where: {
      userId: userSpot.id,
      // spotId: allSpots[i].id
    },
    attributes: [
      [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
      [sequelize.fn("COUNT", sequelize.col("id")), "numReviews"],
    ],
    raw: true,
  });
  userSpot.dataValues.avgRating = rating[0].avgRating;
  userSpot.dataValues.numReviews = rating[0].numReviews;


  res.json(userSpot);
});

//Get all bookings for a spot by id
// Done DONT TOUCH
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  // const { Bookings, spotId, StartDate, endDate } = req.body
  const userId = req.user.id;
  const allBookings = await Spot.findByPk(req.params.spotId);
  if (!allBookings) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if (allBookings.ownerId !== userId) {
    const allBookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId,
      },
      attributes: ["spotId", "startDate", "endDate"],
    });

    res.json({
      Bookings: allBookings,
    });
  }

  if (allBookings.ownerId === userId) {
    const newBookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId,
      },
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    });
    res.json({
      Bookings: newBookings,
    });
  }
});

//Add an Image to a Spot based on the Spot's id
// Done Dont Touch
router.post("/:spotId/images", async (req, res) => {
  // const {id, url, preview,  address, city, state, country, lat, lng, name, description, price  } = req.body;
  const { url, preview } = req.body;
  console.log(url, preview)
  const userId = req.user.id;
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  if (userId !== spot.ownerId) {
    res.status(403); //unauthorized
    return res.json("user doesnt have credential to add image");
  }

  const newImg = await SpotImage.create({
    spotId: req.params.spotId,
    url,
    preview,
  });

  const response = await SpotImage.scope("test").findByPk(newImg.id); // for creating
  res.json(response);
});

// edit a spot
//Done DONT TOUCH
router.put("/:spotId", requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const userId = req.user.id;

  const spotInfo = await Spot.findByPk(req.params.spotId);

  if (!spotInfo) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: res.statusCode,
    });
  }

  if (userId !== spotInfo.ownerId) {
    res.status(403);
    return res.json({
      message: "unauthorized for such action!",
      statusCode: res.statusCode,
    });
  }

  const updatedSpot = await spotInfo.update({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  return res.json(updatedSpot);
});

//Create a Booking for a Spot based on the Spot's id
// Done DONT TOUCH
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const spotInfo = await Spot.findByPk(req.params.spotId);
  if (!spotInfo) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  if (spotInfo.ownerId === userId) {
    res.status(403);
    return res.json({
      message: "Invalid operation",
      statusCode: 403,
    });
  }

  const userBookings = await Booking.findAll({
    where: {
      spotId: spotInfo.id,
    },
  });
  const { startDate, endDate } = req.body;
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (start >= end) {
    res.status(400);
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot be on or before startDate",
      },
    });
  }
  for (let i = 0; i < userBookings.length; i++) {
    const bookedStart = new Date(userBookings[i].dataValues.startDate);
    const bookedEnd = new Date(userBookings[i].dataValues.endDate);
    if (
      (start >= bookedStart && start <= bookedEnd) ||
      (end >= bookedStart && end <= bookedEnd) ||
      (start < bookedStart && end > bookedEnd)
    ) {
      res.status(403);
      return res.json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }
  }

  const newBooking = await Booking.create({
    spotId: spotInfo.id,
    userId: req.user.id,
    startDate: startDate,
    endDate: endDate,
  });

  return res.json(newBooking);
});

//create a spot
// DONE DONT TOUCH
router.post("/", requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  // const id = user.id
  // await setTokenCookie(res, user);
  return res.json(newSpot);
});

//Create a Review for a Spot based on the Spot's id
router.post("/:spotId/reviews", requireAuth, async (req, res) => {
  const { review, stars } = req.body;
  const spotInfo = await Spot.findByPk(req.params.spotId);

  if (!spotInfo) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const allReviews = await Review.findAll({
    where: {
      spotId: spotInfo.id,
      userId: req.user.id,
    },
  });

  if (allReviews.length > 0) {
    res.status(403);
    return res.json({
      message: "User already has a review for this spot",
      statusCode: 403,
    });
  }

  for (let i = 0; i < allReviews.length; i++) {
    if (stars < 1 || stars > 5 || review === null) {
      res.status(400);
      return res.json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          review: "Review text is required",
          stars: "Stars must be an integer from 1 to 5",
        },
      });
    }
  }

  const newReview = await Review.create({
    spotId: spotInfo.id,
    userId: req.user.id,
    review: review,
    stars: stars,
  });
  res.status(201)
  res.json(newReview);
});

// get reviews by spot id
router.get("/:spotId/reviews", async (req, res) => {
  const userSpot = await Spot.findByPk(req.params.spotId);
  if (!userSpot) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  const userReviews = await Review.findAll({
    where: {
      spotId: req.params.spotId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });
  res.json({
    Reviews: userReviews,
  });
});

//Delete a spot
//Done DONT TOUCH
router.delete("/:spotId", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const userSpot = await Spot.findByPk(req.params.spotId);
  if (!userSpot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if (userSpot.ownerId !== userId) {
    res.status(403);
    return res.json({
      message: "Unauthorized user input",
      statusCode: 403,
    });
  }

  await userSpot.destroy();
  res.status(200);
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
