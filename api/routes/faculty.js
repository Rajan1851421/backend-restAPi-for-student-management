const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "This is FACULTY get requested",
  });
});

router.post("/", (req, res, next) => {
    res.status(200).json({
      message: "This is FACULTY POST requested",
    });
  });

module.exports = router;
