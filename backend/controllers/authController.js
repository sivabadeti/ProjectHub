const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

const  registerUser = async(req,res) =>{
    try{
        const {
            name,
            email,
            password,
            confirmPassword,
            college,
            branch,
            year,
            location
        } = req.body;

        //Required all fields 
        if(
            !name || !email || !password || !confirmPassword || !college || !branch || !year ||!location
        ){
            return res.status(400).json({
                success:false,
                message:"Please Fill All fields"
            });
        }

        // password checking 
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password doesn't match"
            })
        }

        //loose password
        if(password.length <6){
            return res.status(400).json({
                success:false,
                message:"Password must contain Atleast 6 characters"
            })
        }

        // Check whether email already exists
        const existingUser =await User.findOne({
            email:email.toLowerCase(),
        });

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User Already exist"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        // Create user
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            college,
            branch,
            year,
            location,
            authProvider: "local",
            profileCompleted: true,
        });

        // Response
        res.status(201).json({
            success:true,
            message:"Account Created Sucessfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                college: user.college,
                branch: user.branch,
                year: user.year,
                location: user.location
            },
        });
    }
    catch(error){
        console.error("Register Error:", error.message);

        res.status(500).json({
            success:false,
            message:"Server error while registering user"
        });
    };
}


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check whether this is a Google account
    if (user.authProvider === "google") {
      return res.status(400).json({
        success: false,
        message: "This account uses Google login. Please continue with Google.",
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful",

      token,

      user: {
          id: user._id,
          name: user.name,
          email: user.email,

          role: user.role,
          about: user.about,

          college: user.college,
          branch: user.branch,
          year: user.year,
          location: user.location,

          github: user.github,
          linkedin: user.linkedin,

          resume: user.resume,

          skills: user.skills,
          experience: user.experience,
          projects: user.projects,

          certifications: user.certifications,
          achievements: user.achievements,

          authProvider: user.authProvider,
          profileCompleted: user.profileCompleted
        },
    });
    } catch (error) {
    console.error("Login Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error while logging in",
    });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required",
      });
    }

    // Verify Google credential
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const {
      sub: googleId,
      email,
      name,
      picture,
    } = payload;

    // Find user using Google email
    let user = await User.findOne({
      email: email.toLowerCase(),
    });

    // =========================
    // GOOGLE REGISTER
    // =========================

    if (!user) {
      user = await User.create({
        name: name || "",
        email: email.toLowerCase(),

        googleId,

        profilePicture: picture || "",

        authProvider: "google",

        profileCompleted: false,

        college: "",
        branch: "",
        year: "",
        location: "",

        role: "Full Stack Developer",
        about: "",

        github: "",
        linkedin: "",

        resume: "",

        skills: [],
        experience: [],
        projects: [],
        certifications: [],
        achievements: [],
      });
    }

    // =========================
    // GOOGLE LOGIN
    // =========================

    else {

      // If email already belongs to normal account
      if (user.authProvider === "local") {
        return res.status(400).json({
          success: false,
          message:
            "An account with this email already exists. Please login using your email and password.",
        });
      }

      // Update Google information
      user.googleId = googleId;

      if (picture) {
        user.profilePicture = picture;
      }

      await user.save();
    }

    // =========================
    // CREATE PROJECTHUB JWT
    // =========================

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // =========================
    // RESPONSE
    // =========================

    res.status(200).json({
      success: true,

      message: user.profileCompleted
        ? "Google login successful"
        : "Google account created successfully",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,

        role: user.role,
        about: user.about,

        college: user.college,
        branch: user.branch,
        year: user.year,
        location: user.location,

        github: user.github,
        linkedin: user.linkedin,

        resume: user.resume,

        skills: user.skills,
        experience: user.experience,
        projects: user.projects,

        certifications: user.certifications,
        achievements: user.achievements,

        profilePicture: user.profilePicture,

        authProvider: user.authProvider,
        profileCompleted: user.profileCompleted,
      },
    });

  } catch (error) {
    console.error("Google Login Error:", error);

    res.status(401).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const {
      name,
      email,
      role,
      about,
      college,
      branch,
      location,
      github,
      linkedin,
      skills,
      experience,
      projects,
      certifications,
      achievements,
    } = req.body;

    // ===============================
    // REQUIRED SOCIAL LINKS
    // ===============================

    if (!github || !linkedin) {
      return res.status(400).json({
        success: false,
        message: "GitHub and LinkedIn links are required.",
      });
    }

    // ===============================
    // FILES
    // ===============================

    const resumeFile =
      req.files?.resume?.[0];

    const profilePictureFile =
      req.files?.profilePicture?.[0];

    // Resume is required only if
    // user doesn't already have one

    if (!resumeFile && !user.resume) {
      return res.status(400).json({
        success: false,
        message: "Resume is required.",
      });
    }

    // ===============================
    // BASIC INFORMATION
    // ===============================

    user.name = name;
    user.role = role;
    user.about = about;
    user.college = college;
    user.branch = branch;
    user.location = location;

    // ===============================
    // SOCIAL LINKS
    // ===============================

    user.github = github;
    user.linkedin = linkedin;

    // ===============================
    // EMAIL
    // ===============================

    if (
      email &&
      email.toLowerCase() !== user.email
    ) {
      const existingEmail =
        await User.findOne({
          email: email.toLowerCase(),
          _id: { $ne: user._id },
        });

      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message:
            "Email already belongs to another account.",
        });
      }

      user.email = email.toLowerCase();
    }

    // ===============================
    // SKILLS
    // ===============================

    if (skills) {
      user.skills =
        typeof skills === "string"
          ? JSON.parse(skills)
          : skills;
    }

    // ===============================
    // EXPERIENCE
    // ===============================

    if (experience) {
      user.experience =
        typeof experience === "string"
          ? JSON.parse(experience)
          : experience;
    }

    // ===============================
    // PROJECTS
    // ===============================

    if (projects) {
      user.projects =
        typeof projects === "string"
          ? JSON.parse(projects)
          : projects;
    }

    // ===============================
    // CERTIFICATIONS
    // ===============================

    if (certifications) {
      user.certifications =
        typeof certifications === "string"
          ? JSON.parse(certifications)
          : certifications;
    }

    // ===============================
    // ACHIEVEMENTS
    // ===============================

    if (achievements) {
      user.achievements =
        typeof achievements === "string"
          ? JSON.parse(achievements)
          : achievements;
    }

    // ===============================
    // RESUME
    // ===============================

    if (resumeFile) {
      user.resume =
        `/uploads/resumes/${resumeFile.filename}`;
    }

    // ===============================
    // PROFILE PICTURE
    // ===============================

    if (profilePictureFile) {
      user.profilePicture =
        `/uploads/profile-pictures/${profilePictureFile.filename}`;
    }

    // ===============================
    // PROFILE COMPLETED
    // ===============================

    user.profileCompleted = true;

    await user.save();

    // ===============================
    // RESPONSE
    // ===============================

    return res.status(200).json({
      success: true,

      message:
        "Profile updated successfully.",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,

        role: user.role,
        about: user.about,

        college: user.college,
        branch: user.branch,
        year: user.year,
        location: user.location,

        github: user.github,
        linkedin: user.linkedin,

        resume: user.resume,

        profilePicture:
          user.profilePicture,

        skills: user.skills,
        experience: user.experience,
        projects: user.projects,

        certifications:
          user.certifications,

        achievements:
          user.achievements,

        authProvider:
          user.authProvider,

        profileCompleted:
          user.profileCompleted,
      },
    });

  } catch (error) {

    console.error(
      "Update Profile Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error while updating profile.",
    });
  }
};


module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  updateProfile
};