const express = require("express");

const {
  searchDatasets,
} = require("../controllers/datasetController");

const router = express.Router();


// ================= DATASET SEARCH =================

router.post(
  "/search",
  searchDatasets
);


module.exports = router;