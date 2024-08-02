import { useState } from "react";
import { Progress } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import {
  ProfileData,
  StepOneData,
  StepTwoData,
  StepThreeData,
  StepFourData,
  StepFiveData,
} from "../../types/profile";
import Header from "../header/header-component";
import "./profile-setup-component.css";
import CustomButton from "../button/button-component";
import StepFour from "./steps/StepFour";
import StepFive from "./steps/StepFive";

const ProfileSetup = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
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

  const updateProfileData = (
    step: keyof ProfileData,
    data:
      | StepOneData
      | StepTwoData
      | StepThreeData
      | StepFourData
      | StepFiveData
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
  const totalSteps = 5;
  const steps = [
    {
      title: "Шаг 1",
      content: (
        <StepOne
          data={profileData.stepOneData}
          updateData={(data) => updateProfileData("stepOneData", data)}
          next={next}
        />
      ),
    },
    {
      title: "Шаг 2",
      content: (
        <StepTwo
          data={profileData.stepTwoData}
          updateData={(data) => updateProfileData("stepTwoData", data)}
          next={next}
        />
      ),
    },
    {
      title: "Шаг 3",
      content: (
        <StepThree
          data={profileData.stepThreeData}
          updateData={(data) => updateProfileData("stepThreeData", data)}
          next={next}
        />
      ),
    },
    {
      title: "Шаг 4",
      content: (
        <StepFour
          data={profileData.stepFourData}
          updateData={(data) => updateProfileData("stepFourData", data)}
          next={next}
        />
      ),
    },
    {
      title: "Шаг 5",
      content: (
        <StepFive
          data={profileData.stepFiveData}
          updateData={(data) => updateProfileData("stepFiveData", data)}
          next={next}
        />
      ),
    },
  ];

  return (
    <div className="profile-setup">
      <Header />
      <div className="steps-content">{steps[currentStep].content}</div>
      <div className="steps-action">
        {currentStep > 0 && (
          <CustomButton
            type="secondary"
            icon={<LeftOutlined />}
            text="Назад"
            onClick={() => prev()}
          />
        )}
        <CustomButton
          type="secondary"
          iconAfterText={<RightOutlined />}
          text="Далее"
          onClick={next}
        />
      </div>
      <div className="progress-container">
        <Progress
          percent={((currentStep + 1) / totalSteps) * 100}
          strokeWidth={12}
          strokeColor="#a76f6e"
          showInfo={false}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default ProfileSetup;
