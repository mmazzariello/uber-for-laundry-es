const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/dashboard", (req, res, next) => {
  res.render("laundry/dashboard");
});

router.post('/launderers', (req, res, next) => {
  console.log(req.session)
  const userId = req.session.currentUser._id;
  const laundererInfo = {
    fee: req.body.fee,
    isLaunderer: true
  };

  User.findByIdAndUpdate(userId, laundererInfo, { new: true }, (err, theUser) => {
    if (err) {
      console.log(err)
      next(err);
      return;
    }

    req.session.currentUser = theUser;

    res.redirect('/dashboard');
  });
});

module.exports = router;
