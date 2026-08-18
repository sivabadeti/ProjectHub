const User = require("../models/user");


// =========================================================
// GET ALL TEAMMATES
// =========================================================

const getTeammates = async (req, res) => {
  try {

    // Logged-in user's ID comes from auth middleware
    const currentUserId = req.userId;


    const users = await User.find({
      _id: {
        $ne: currentUserId,
      },
    })
      .select(
        "-password -googleId"
      )
      .sort({
        createdAt: -1,
      })
      .lean();


    const formattedUsers = users.map(
      (user) => ({
        id: user._id,

        name: user.name || "",

        email: user.email || "",

        role: user.role || "",

        about: user.about || "",

        college: user.college || "",

        branch: user.branch || "",

        year: user.year || "",

        location: user.location || "",

        github: user.github || "",

        linkedin: user.linkedin || "",

        skills: user.skills || [],

        experience:
          user.experience || [],

        projects:
          user.projects || [],

        certifications:
          user.certifications || [],

        achievements:
          user.achievements || [],

        profilePicture:
          user.profilePicture || "",

        resume:
          user.resume || "",

        profileCompleted:
          user.profileCompleted || false,
      })
    );


    return res.status(200).json({

      success: true,

      count:
        formattedUsers.length,

      users:
        formattedUsers,

    });

  } catch (error) {

    console.error(
      "Get Teammates Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Unable to fetch teammates.",

    });

  }
};


module.exports = {
  getTeammates,
};