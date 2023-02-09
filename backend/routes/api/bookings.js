const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  SpotImage,
  Spot,
  User,
  Review,
  sequelize,
  ReviewImage,
  Booking,
} = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
// const spot = require("../../db/models/spot");
const { Op } = require("sequelize");

//Get all of the Current User's Bookings

router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const userBookings = await Booking.findAll({
    where: {
      userId: userId,
    },
    include: {
      model: Spot,
    },
  });
  return res.json({ Bookings: userBookings });
});

//Edit a Booking

router.put("/:bookingId", requireAuth, async (req, res) => {
  const userId = req.user.id;

  const { startDate, endDate } = req.body;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const userBooking = await Booking.findByPk(req.params.bookingId);

  if (!userBooking) {
    res.status(404);
    res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }

  if (userBooking.userId !== userId) {
    res.status(403);
    res.json({
      message: "Unauthorized user input",
      statusCode: 403,
    });
  }


  if (start >= end) {
    res.status(403);
    res.json({
      message: "Past bookings can't be modified",
      statusCode: 403,
    });
  }

  const alluserBookings = await Booking.findAll({
    where: {
      spotId: userBooking.spotId,
    },
  });

  for (let i = 0; i < alluserBookings.length; i++) {
    const oldStart = new Date(alluserBookings[i].dataValues.startDate);
    const oldEnd = new Date(alluserBookings[i].dataValues.endDate);

    if (
      oldStart <= start &&
      start <= oldEnd &&
      oldStart <= end &&
      end <= oldEnd
    ) {
      res.status(403);
      res.json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }
    if (start >= oldStart && start <= oldEnd) {
      res.status(403);
      res.json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          startDate: "Start date conflicts with an existing booking",
        },
      });
    }


    if (end >= oldStart && end <= oldEnd) {
      res.status(403);
      res.json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          startDate: "Start date conflicts with an existing booking",
        },
      });
    }
    if (start < oldStart && end > oldEnd) {
      res.status(403);
      res.json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          startDate: "Start date conflicts with an existing booking",
        },
      });
    }

  }
  await userBooking.update({
    startDate,
    endDate,
  });

  res.json(userBooking);
});

// Delete a booking

router.delete("/:bookingId", requireAuth, async (req, res) => {
  let userId = req.user.id;
  const userBooking = await Booking.findByPk(req.params.bookingId);
  if (!userBooking) {
    res.status(404);
    res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }

  const userSpot = await Spot.findOne({
    where: {
      id: userBooking.spotId,
    },
  });

  if (new Date() > userBooking.startDate) {
    res.status(403);
    return res.json({
      message: "Bookings that have been started can't be deleted",
      statusCode: 403,
    });
  }
  if (userBooking.userId !== userId && userSpot.ownerId !== userId) {
    res.status(403);
    return res.json({
      message: "Unauthorized user input!",
      statusCode: 403,
    });
  }

  userBooking.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});
module.exports = router;
