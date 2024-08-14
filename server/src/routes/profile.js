const express = require("express");
const path = require('path');
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
const { error } = require("console");
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
        { student_profile_id: result.id },
        { where: { id: req.session.userId } }
      );
      res.status(201).end();
    } else if (req.body.role === "teacher") {
      const { role, competence, ...rest } = data;
      console.log("rest", rest);

      const result = await TeacherProfile.create(rest);
      console.log("aaaa", req.body);
      const competenceArr = competence.map((el) => {
        console.log("el", el);
        return { profile_id: result.id, goal_id: el };
      });
      await CometenceArr.bulkCreate(competenceArr);
      await User.update(
        { teacher_profile_id: result.id },
        { where: { id: req.session.userId } }
      );
      res.status(201).end();
    }
    console.log("req.session.userId", req.session.userId);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/studentprofile', async(req,res) => {
  try {
    const studentProfile = await StudentProfile.findOne({
      where: {id:3},
      include: [
        { model: Level }, 
        { model: Goal },
        { model: StudentPrice},
        {model: PreferredSex},
        {  
          model: User, // Включаем данные из модели User
          attributes: ['email'], // Выбираем только поле email
        },
      ],
    })
    if (!studentProfile) {
      return res.status(404).json({error: 'Студент не найден'});
    }
    const studentProfileData = {
      name: studentProfile.name,
      surname: studentProfile.surname,
      email: studentProfile.User.email,
      age: studentProfile.age,
      picture_link: studentProfile.picture_link,
      level: studentProfile.Level.level,
      duration: studentProfile.duration,
      prefsex: studentProfile.preferred_sex_id,
      lessons: studentProfile.lessons,
      price: studentProfile.StudentPrice.name,
      teacherExperience: studentProfile.teacher_experience_id,
      about: studentProfile.about,
      picture_link: studentProfile.picture_link,
      level_id: studentProfile.Level.level_id,
      sex: studentProfile.PreferredSex.name
    }
    console.log("STUDENTPROFILEDATA", studentProfileData);
    res.json(studentProfileData)
  } catch (error) {
    console.error("Ошибка при получении данных профиля студента", error);
    res.status(500).json({ error: error.message });
  }
});
router.put("/studentprofileupdate", async (req, res) => {
  try {
    const { 
      name, 
      surname, 
      age, 
      level, 
      duration, 
      prefsex, 
      lessons, 
      price, 
      teacherExperience, 
      about, 
      picture_link,
      preferred_sex_id,
    } = req.body;
    console.log(req.body)
    // Объявление и инициализация переменной uploadPath
    const newFileName = picture_link.replace(/\s+/g, '_');
    const uploadPath = path.join(newFileName);

    // Найти профиль
    const profile = await StudentProfile.findByPk(3);

    if (!profile) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    
    // Обновление профиля
    profile.name = name || profile.name;
    profile.surname = surname || profile.surname;
    profile.age = age || profile.age;
    profile.level = level || profile.level;
    profile.duration = duration || profile.duration;
    profile.prefsex = prefsex || profile.prefsex;
    profile.lessons = lessons || profile.lessons;
    profile.price = price || profile.price;
    profile.teacherExperience = teacherExperience || profile.teacherExperience;
    profile.about = about || profile.about;
    profile.picture_link = uploadPath || profile.picture_link; // Обновление имени файла
    profile.level_id = level || profile.level_id,
    profile.price_id = price || profile.price_id,
    profile.preferred_sex_id = preferred_sex_id || profile.preferred_sex_id
    await profile.save();

    console.log("Обновленный профиль:", profile);
    res.status(200).json(profile);
  } catch (error) {
    console.error("Ошибка при обновлении профиля", error);
    res.status(500).json({ error: error.message });
  }
});


router.get("/userprofile", async (req, res) => {
  try {
    // Найти профиль учителя вместе с данными уровня и целей
    const teacherProfile = await TeacherProfile.findOne({
      where: { id: 1 }, // Убедитесь, что ID правильно передается
      include: [
        { model: Level }, 
        { model: Goal },
        {
          model: User, // Включаем данные из модели User
          attributes: ['email'], // Выбираем только поле email
        },
      ],
    });

    if (!teacherProfile) {
      return res.status(404).json({ error: "Учитель не найден" });
    }

    // Подготовка данных профиля учителя для ответа, включая email
    const teacherProfileData = {
      name: teacherProfile.name,
      surname: teacherProfile.surname,
      age: teacherProfile.age,
      picture_link: teacherProfile.picture_link,
      level: teacherProfile.Level, 
      goals: teacherProfile.Goals,
      teachingExperience: teacherProfile.teachingExperience,
      almaMater: teacherProfile.almaMater,
      faculty: teacherProfile.faculty,
      academicDegree: teacherProfile.academicDegree,
      aboutYourself: teacherProfile.aboutYourself,
      videoPresentation: teacherProfile.videoPresentation,
      lessonCost: teacherProfile.lessonCost,
      convenientTime: teacherProfile.convenientTime,
      email: teacherProfile.User.email,
      documents: teacherProfile.documents
    };

    res.json(teacherProfileData);
  } catch (error) {
    console.error("Ошибка при получении данных профиля учителя", error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/update", async (req, res) => {
  try {
    const {
      profileid, 
      name, 
      surname, 
      age, 
      aboutYourself, 
      videoPresentation,
      almaMater,   
      faculty,     
      academicDegree, 
      lessonCost,
      teachingExperience,
      goals, // Это теперь массив названий целей (может быть пустым или отсутствовать)
      documents,
      convenientTime,
      picture_link,// Новое имя файла
    } = req.body;

    // Объявление и инициализация переменной uploadPath
    const newFileName = picture_link.replace(/\s+/g, '_');
    const uploadPath = path.join(newFileName);

    // Найти профиль
    const profile = await TeacherProfile.findByPk(1);

    if (!profile) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Обновление профиля
    profile.name = name || profile.name;
    profile.surname = surname || profile.surname;
    profile.age = age || profile.age;
    profile.aboutYourself = aboutYourself || profile.aboutYourself;
    profile.videoPresentation = videoPresentation || profile.videoPresentation;
    profile.almaMater = almaMater || profile.almaMater;     // Обновление университета
    profile.faculty = faculty || profile.faculty;           // Обновление факультета
    profile.academicDegree = academicDegree || profile.academicDegree; // Обновление ученой степени
    profile.lessonCost = lessonCost || profile.lessonCost;  // Обновление стоимости урока
    profile.teachingExperience = teachingExperience || profile.teachingExperience;
    profile.documents = documents || profile.documents;
    profile.convenientTime = convenientTime || profile.convenientTime;
    profile.picture_link = uploadPath || profile.picture_link;    // Обновление имени файла
    await profile.save();

    if (goals && goals.length > 0) {
      // Получить ID целей по их названиям
      const goalIds = await Goal.findAll({
        where: {
          name: goals // Здесь `goals` — это массив названий целей
        },
        attributes: ['id'] // Нам нужны только ID целей
      });

      // Удаление старых целей и добавление новых
      await CometenceArr.destroy({ where: { profile_id: profile.id } });
      const newCometenceArr = goalIds.map((goal) => ({
        profile_id: profile.id,
        goal_id: goal.id
      }));
      await CometenceArr.bulkCreate(newCometenceArr);
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Ошибка при обновлении профиля", error);
    res.status(500).json({ error: error.message });
  }
});



router.get('/getGoals', async (req,res) => {
  try {
    
    const goals = await Goal.findAll()
    res.json({goals})
  } catch (error) {
    console.error(error)
  }
})



module.exports = router;
