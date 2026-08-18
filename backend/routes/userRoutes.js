const express = require("express");

const {
  getTeammates,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// =========================================================
// GET TEAMMATES
// =========================================================

router.get(
  "/teammates",
  protect,
  getTeammates
);


module.exports = router;