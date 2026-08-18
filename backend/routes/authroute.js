const express = require("express")
const {
  registerUser,
  loginUser,
  googleLogin,
  updateProfile
} = require("../controllers/authController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post('/login',loginUser)
router.post('/register',registerUser)
router.put(
  "/profile",
  protect,
  upload.fields([
    {
      name: "resume",
      maxCount: 1,
    },
    {
      name: "profilePicture",
      maxCount: 1,
    },
  ]),
  updateProfile
);
router.post("/google", googleLogin);

module.exports = router;