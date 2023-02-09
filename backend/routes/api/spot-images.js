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
// const spot = require("../../db/models/spot");


router.delete('/:imageId', requireAuth, async (req, res) => {
  const userId = req.user.id
  const userImage = await SpotImage.findByPk(req.params.imageId)

  if (!userImage) {
    res.status(404)
    res.json({
      "message": "Spot Image couldn't be found",
      "statusCode": 404
    })
  }

  const spotId = await Spot.findOne({
    where: {
      id: userImage.spotId
    }
  })

  if (spotId.ownerId !== userId) {
    res.status(403)
    res.json({
      message: 'Unauthorizes user input',
      statusCode: 403
    })
  }
  await userImage.destroy(
    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
  )
})

module.exports = router
