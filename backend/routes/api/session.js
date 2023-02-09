const express = require('express');
const { requireAuth, setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { route } = require('./users');
const router = express.Router();
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
  check('credential').exists({ checkFalsy: true }).notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password').exists({ checkFalsy: true })
    .withMessage('Please provide a password'),
  handleValidationErrors
];


router.delete('/', async (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' })
});

// get current user
router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      ...user.toSafeObject()
    });
  } else return res.json(null)
});

//login user
router.post('/', validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;
  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error('Validation error');
      err.status = 400;
      err.title = 'Validation error';
    err.errors = ["Invalid Credentials"]
      return next(err);
  }


  const token = await setTokenCookie(res, user);
  return res.json({ ...user.toSafeObject(), token })
})


module.exports = router;
