const router = require("express").Router();
const passport = require("passport");
const User = require("../models/auth/auth_user");

router.get("/login/success", async (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Success",
      user: req.user,
    });
  }
});
router.get("/login/failed", async (req, res) => {
  res.status(401).json({
    success: false,
    message: "Failed",
  });
});

router.get("/logout", async (req, res) => {
  req.logout();
  res.redirect("http://localhost:5173");
});

// ----------------- GOOGLE --------------------
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "/login/failed",
  })
);
// ----------------- GOOGLE --------------------

module.exports = router;
