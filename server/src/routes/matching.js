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
} = require("../db/models");
const router = express.Router();

router.get("/teachers", async (req, res) => {
  try {
    const teacher = JSON.parse(
      JSON.stringify(
        await TeacherProfile.findOne({
          where: { id: 1 },
          include: [{ model: Level }, { model: Goal }],
        })
      )
    );
    console.log("teacher", teacher);
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.get("/step_4", async (req, res) => {
//   try {
//     const studentPrice = await StudentPrice.findAll();
//     const teacherExperience = await TeacherExperience.findAll();
//     const preferredSex = await PreferredSex.findAll();
//     res.json({ studentPrice, teacherExperience, preferredSex });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get("/step_1", async (req, res) => {
//   try {
//     const sex = await Sex.findAll();

//     res.json({ sex });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post("/register", async (req, res) => {
//   try {
//     console.log("req.body", req.body);
//     const data = req.body;
//     if (req.body.role === "student") {
//       const { role, ...rest } = data;

//       const result = await StudentProfile.create(rest);
//       console.log("res", result.id);
//       await User.update(
//         { student_profile_id: result.id },
//         { where: { id: req.session.userId } }
//       );
//       res.status(201).end();
//     } else if (req.body.role === "teacher") {
//       const { role, competence, ...rest } = data;
//       console.log("rest", rest);

//       const result = await TeacherProfile.create(rest);
//       console.log("aaaa", req.body);
//       const competenceArr = competence.map((el) => {
//         console.log("el", el);
//         return { profile_id: result.id, goal_id: el };
//       });
//       await CometenceArr.bulkCreate(competenceArr);
//       await User.update(
//         { teacher_profile_id: result.id },
//         { where: { id: req.session.userId } }
//       );
//       res.status(201).end();
//     }
//     console.log("req.session.userId", req.session.userId);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;
