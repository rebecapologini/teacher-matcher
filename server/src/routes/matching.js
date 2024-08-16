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
  Disliked_profile,
} = require("../db/models");
const { where } = require("sequelize");
const router = express.Router();
router.post("/teachers", async (req, res) => {
  try {
    const teacher = JSON.parse(
      JSON.stringify(
        await TeacherProfile.findAll({
          include: [
            { model: Level },
            { model: Goal },
            { model: StudentProfile, as: "matched" },
          ],
        })
      )
    );

    const student_profile_id = await User.findOne({
      where: { id: req.body.id },
      include: { model: StudentProfile },
    });
    const { matched } = JSON.parse(
      JSON.stringify(
        await StudentProfile.findOne({
          where: { id: student_profile_id.student_profile_id },
          include: { model: TeacherProfile, as: "matched" },
        })
      )
    );
    const { disliked } = JSON.parse(
      JSON.stringify(
        await StudentProfile.findOne({
          where: { id: student_profile_id.student_profile_id },
          include: { model: TeacherProfile, as: "disliked" },
        })
      )
    );
    console.log("disliked", disliked);
    const teacherProfilesIdMatched = matched.map((el) => el.id);
    const teacherProfilesIdDisliked = disliked.map((el) => el.id);
    const teacherProfilesId = teacherProfilesIdMatched.concat(
      teacherProfilesIdDisliked
    );
    const filteredTeachers = teacher.filter(
      (el) => !teacherProfilesId.includes(el.id)
    );

    res.json(filteredTeachers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/requests", async (req, res) => {
  try {
    const teacher_profile_id = await User.findOne({
      where: { id: req.body.id },
      include: { model: TeacherProfile },
    });
    console.log("teacher_profile_id", teacher_profile_id.teacher_profile_id);
    const { matched } = JSON.parse(
      JSON.stringify(
        await TeacherProfile.findOne({
          where: { id: teacher_profile_id.teacher_profile_id },
          include: {
            model: StudentProfile,
            as: "matched",
            include: [{ model: Level }, { model: Goal }, { model: Language }],
          },
        })
      )
    );
    const newStudents = matched.filter(
      (el) => el.Matched_profile.accepted === null
    );
    const acceptedStudents = matched.filter(
      (el) => el.Matched_profile.accepted
    );
    console.log("Aaaaaaaaaaa");
    res.json({ newStudents, acceptedStudents });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/profile", async (req, res) => {
  try {
    const student_profile_id = await User.findOne({
      where: { id: req.body.id },
      include: { model: StudentProfile },
    });
    console.log("student_profile_id", student_profile_id);

    const { matched } = JSON.parse(
      JSON.stringify(
        await StudentProfile.findOne({
          where: { id: student_profile_id.student_profile_id },
          include: {
            model: TeacherProfile,
            as: "matched",
            include: [{ model: Level }, { model: Goal }, { model: Language }],
          },
        })
      )
    );
    console.log("matched", matched);
    const teachers = matched.filter(
      (el) => el.Matched_profile.accepted === true
    );

    console.log("teachers", teachers);

    console.log("Aaaaaaaaaaa");
    res.json({ teachers });
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
    console.log("AAAAAAAAAAAA", req.body.id);
    await Matched_profile.create({
      teacher_id: Number(req.body.id),
      student_id: student_profile_id,
    });
    res.sendStatus(201);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/accept", async (req, res) => {
  try {
    const { teacher_profile_id } = JSON.parse(
      JSON.stringify(
        await User.findOne({
          where: { id: req.session.userId },
        })
      )
    );
    await Matched_profile.update(
      { accepted: true },
      {
        where: [
          { teacher_id: Number(teacher_profile_id) },
          { student_id: Number(req.body.id) },
        ],
      }
    );
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/decline", async (req, res) => {
  const { teacher_profile_id } = JSON.parse(
    JSON.stringify(
      await User.findOne({
        where: { id: req.session.userId },
      })
    )
  );
  try {
    await Matched_profile.update(
      { accepted: false },
      {
        where: [
          { teacher_id: Number(teacher_profile_id) },
          { student_id: Number(req.body.id) },
        ],
      }
    );
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/dislike", async (req, res) => {
  try {
    const { student_profile_id } = JSON.parse(
      JSON.stringify(
        await User.findOne({
          where: { id: req.session.userId },
        })
      )
    );
    await Disliked_profile.create({
      teacher_id: Number(req.body.id),
      student_id: student_profile_id,
    });
    res.sendStatus(201);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
