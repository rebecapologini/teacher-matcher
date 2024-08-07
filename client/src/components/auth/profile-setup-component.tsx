import { useEffect, useMemo, useState } from "react";
import { Progress } from "antd";
import {
  ProfileData,
  StepOneData,
  StepTwoData,
  StepThreeData,
  StepFourData,
  StepFiveData,
  TeacherStepThreeData,
  TeacherStepFourData,
  TeacherStepFiveData,
  ProfileDataForRegistration,
} from "../../types/profile";
import Header from "../header/header-component";
import "./profile-setup-component.css";
import StepNavigator from "./steps/stepNavigator";
import StepContent from "./steps/stepContent";
import { useProfile } from "../context/profileContext";
import _ from "lodash";
import { useBregisterMutation } from "../../features/profile/profile-api-slice";
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const {
    setIsFilledStepOne,
    setIsFilledStepTwo,
    setIsFilledStepFive,
    setIsFilledStepFour,
    setIsFilledStepThree,
  } = useProfile();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [role, setRole] = useState<string>("");

  const [bregister] = useBregisterMutation();
  const [profileData, setProfileData] = useState<ProfileData>({
    stepOneData: {
      name: "",
      surname: "",
      age: 0,
      sex_id: 0,
      picture_link: "",
    } as StepOneData,
    stepTwoData: { role: "" } as StepTwoData,
    stepThreeData: {
      language_id: 0,
      goal_id: 0,
      level_id: 0,
      duration: "",
    } as StepThreeData,
    stepFourData: {
      preferred_sex_id: 0,
      lessons: "",
      price_id: 0,
      teacher_experience_id: 0,
    } as StepFourData,
    stepFiveData: { about: "" } as StepFiveData,
  });
  console.log(profileData);
  useEffect(() => {
    setIsFilledStepOne(
      (prev) =>
        (prev = _.difference(
          Object.entries(profileData.stepOneData).flat(),
          Object.entries({
            name: "",
            surname: "",
            age: 0,
            sex_id: 0,
            picture_link: "",
          }).flat()
        ).length)
    );
    setIsFilledStepTwo(
      (prev) =>
        (prev = _.difference(
          Object.entries(profileData.stepTwoData).flat(),
          Object.entries({ role: "" }).flat()
        ).length)
    );
    setIsFilledStepThree(
      (prev) =>
        (prev = _.difference(
          Object.entries(profileData.stepThreeData).flat(),
          Object.entries({
            language_id: 0,
            goal_id: 0,
            level_id: 0,
            duration: "",
          }).flat()
        ).length)
    );
    setIsFilledStepFour(
      (prev) =>
        (prev = _.difference(
          Object.entries(profileData.stepFourData).flat(),
          Object.entries({
            preferred_sex_id: 0,
            lessons: "",
            price_id: 0,
            teacher_experience_id: 0,
          }).flat()
        ).length)
    );
    setIsFilledStepFive(
      (prev) =>
        (prev = _.difference(
          Object.entries(profileData.stepFiveData).flat(),
          Object.entries({ about: "" }).flat()
        ).length)
    );
  });
  const updateProfileData = (
    step: keyof ProfileData,
    data:
      | StepOneData
      | StepTwoData
      | StepThreeData
      | StepFourData
      | StepFiveData
      | TeacherStepThreeData
      | TeacherStepFourData
      | TeacherStepFiveData
  ) => {
    setProfileData((prevData) => ({
      ...prevData,
      [step]: data,
    }));
  };

  const next = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prev = () => {
    setCurrentStep((prev) => prev - 1);
  };
  const registerProfile = async () => {
    try {
      const lodashMergedObj = _.merge(
        {},
        profileData.stepOneData,
        profileData.stepTwoData,
        profileData.stepThreeData,
        profileData.stepFourData,
        profileData.stepFiveData
      );

      const profile = await bregister(lodashMergedObj).unwrap();

      console.log("resObj", lodashMergedObj);

      navigate("/matching");
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  const totalSteps = role === "teacher" ? 5 : 5;

  const handleRoleUpdate = (data: StepTwoData) => {
    updateProfileData("stepTwoData", data);
    setRole(data.role);
  };

  return (
    <div className="profile-setup">
      <Header />
      <div className="content">
        <StepContent
          currentStep={currentStep}
          role={role}
          profileData={profileData}
          updateProfileData={updateProfileData}
          handleRoleUpdate={handleRoleUpdate}
          next={next}
        />
      </div>
      <div className="sticky-navigation">
        <div className="progress-container">
          <Progress
            percent={((currentStep + 1) / totalSteps) * 100}
            strokeWidth={12}
            strokeColor="#a76f6e"
            showInfo={false}
            className="progress-bar"
          />
        </div>
        <StepNavigator
          currentStep={currentStep}
          totalSteps={totalSteps}
          prev={prev}
          next={next}
          register={registerProfile}
        />
      </div>
    </div>
  );
};

export default ProfileSetup;
