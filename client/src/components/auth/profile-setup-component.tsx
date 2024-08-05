import { useState } from "react";
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
} from "../../types/profile";
import Header from "../header/header-component";
import "./profile-setup-component.css";
import StepNavigator from "./steps/stepNavigator";
import StepContent from "./steps/stepContent";

const ProfileSetup = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [role, setRole] = useState<string>("");
  const [profileData, setProfileData] = useState<ProfileData>({
    stepOneData: { name: "", surname: "", age: 0 } as StepOneData,
    stepTwoData: { role: "" } as StepTwoData,
    stepThreeData: {
      language: "Английский",
      goal: "",
      level: "",
      duration: "",
    } as StepThreeData,
    stepFourData: {
      sex: "",
      lessons: "",
      priceRange: "",
      experience: "",
    } as StepFourData,
    stepFiveData: { description: "" } as StepFiveData,
  });
  console.log(profileData);

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

  const totalSteps = role === "teacher" ? 5 : 5;

  const handleRoleUpdate = (data: StepTwoData) => {
    updateProfileData("stepTwoData", data);
    setRole(data.role);
  };

  return (
    <div className="profile-setup">
      <Header />{" "}
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
            style={{ width: "100%" }}
          />
        </div>
        <StepNavigator
          currentStep={currentStep}
          totalSteps={totalSteps}
          prev={prev}
          next={next}
        />
      </div>
    </div>
  );
};
export default ProfileSetup;
