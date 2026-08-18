const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: function () {
        return this.authProvider == "local";
      },
    },

    role: {
      type: String,
      trim: true,
      default: "Full Stack Developer",
    },

    about: {
      type: String,
      trim: true,
      default: "",
    },

    college: {
      type: String,
      trim: true,
      default: "",
    },

    branch: {
      type: String,
      trim: true,
      default: "",
    },

    year: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    github: {
      type: String,
      trim: true,
      default: "",
    },

    linkedin: {
      type: String,
      trim: true,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    // Resume
    resume: {
      type: String,
      required: function () {
        return this.authProvider == "local";
      },
    },

    // Experience
    experience: [
      {
        company: {
          type: String,
          trim: true,
        },

        role: {
          type: String,
          trim: true,
        },

        location: {
          type: String,
          trim: true,
        },

        startDate: {
          type: String,
        },

        endDate: {
          type: String,
        },

        currentlyWorking: {
          type: Boolean,
          default: false,
        },

        description: {
          type: String,
          trim: true,
        },
      },
    ],

    projects: {
      type: Array,
      default: [],
    },

    certifications: {
      type: Array,
      default: [],
    },

    achievements: {
      type: Array,
      default: [],
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId: {
      type: String,
      default: "",
    },

    profilePicture: {
      type: String,
      default: "",
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);