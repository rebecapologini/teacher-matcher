const express = require("express");
const {
  Level,
  Language,
  Goal,
  StudentPrice,
  TeacherExperience,
  PreferredSex,
  Sex,
  StudentProfile,
  User,
  TeacherProfile,
  CometenceArr,
  Matched_profile,
} = require("../db/models");
const router = express.Router();
router.get("/teachers", async (req, res) => {
  try {
    const teacher = JSON.parse(
      JSON.stringify(
        await TeacherProfile.findAll({
          include: [{ model: Level }, { model: Goal }],
        })
      )
    );
    console.log("111req.session", req.session);
    res.json(teacher);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { student_profile_id } = JSON.parse(
      JSON.stringify(
        await User.findOne({
          where: { id: req.session.userId },
        })
      )
    );
    await Matched_profile.create({
      teacher_id: Number(req.body.id),
      student_id: student_profile_id,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
