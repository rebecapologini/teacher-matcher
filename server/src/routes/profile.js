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
} = require("../db/models");
const router = express.Router();

router.get("/levels", async (req, res) => {
  try {
    const levels = await Level.findAll();
    console.log("levels", levels);
    const languages = await Language.findAll();
    console.log("languages", languages);
    const goals = await Goal.findAll();
    console.log("goals", goals);
    res.json({ levels, languages, goals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/step_4", async (req, res) => {
  try {
    const studentPrice = await StudentPrice.findAll();
    const teacherExperience = await TeacherExperience.findAll();
    const preferredSex = await PreferredSex.findAll();
    res.json({ studentPrice, teacherExperience, preferredSex });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/step_1", async (req, res) => {
  try {
    const sex = await Sex.findAll();

    res.json({ sex });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const data = req.body;
    if (req.body.role === "student") {
      const { role, ...rest } = data;

      const result = await StudentProfile.create(rest);
      console.log("res", result.id);
      await User.update(
        { profile_id: result.id },
        { where: { id: req.session.userId } }
      );
      res.status(201).end();
    }
    console.log("req.session.userId", req.session.userId);
    // const user = await Profile.create(req.body);
    // res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
