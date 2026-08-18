const express = require("express");

const router = express.Router();

const {
  searchProjects,
} = require("../controllers/projectController");

router.post("/search", searchProjects);

module.exports = router;