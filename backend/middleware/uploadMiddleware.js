const multer = require("multer");
const path = require("path");
const fs = require("fs");


// =========================================================
// UPLOAD DIRECTORIES
// =========================================================

const resumeDir = "uploads/resumes";
const profilePictureDir = "uploads/profile-pictures";


// Create directories if they don't exist

if (!fs.existsSync(resumeDir)) {
  fs.mkdirSync(resumeDir, {
    recursive: true,
  });
}

if (!fs.existsSync(profilePictureDir)) {
  fs.mkdirSync(profilePictureDir, {
    recursive: true,
  });
}


// =========================================================
// STORAGE
// =========================================================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    if (file.fieldname === "resume") {

      cb(null, resumeDir);

    } else if (
      file.fieldname === "profilePicture"
    ) {

      cb(null, profilePictureDir);

    } else {

      cb(
        new Error(
          "Invalid file field."
        )
      );

    }

  },


  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(
        file.originalname
      ).toLowerCase();

    cb(null, uniqueName);

  },

});


// =========================================================
// FILE FILTER
// =========================================================

const fileFilter = (
  req,
  file,
  cb
) => {

  // =========================
  // RESUME
  // =========================

  if (file.fieldname === "resume") {

    if (
      file.mimetype ===
      "application/pdf"
    ) {

      cb(null, true);

    } else {

      cb(
        new Error(
          "Only PDF files are allowed for resume."
        ),
        false
      );

    }

    return;
  }


  // =========================
  // PROFILE PICTURE
  // =========================

  if (
    file.fieldname ===
    "profilePicture"
  ) {

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];


    if (
      allowedTypes.includes(
        file.mimetype
      )
    ) {

      cb(null, true);

    } else {

      cb(
        new Error(
          "Profile picture must be JPG, PNG, or WEBP."
        ),
        false
      );

    }

    return;
  }


  // =========================
  // INVALID FIELD
  // =========================

  cb(
    new Error(
      "Invalid file field."
    ),
    false
  );

};


// =========================================================
// MULTER
// =========================================================

const upload = multer({

  storage,

  fileFilter,

  limits: {
    fileSize:
      5 * 1024 * 1024, // 5MB
  },

});


module.exports = upload;