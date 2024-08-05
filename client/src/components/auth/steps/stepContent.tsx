import React from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import TeacherStepThree from "./TeacherStepThree";
import TeacherStepFour from "./TeacherStepFour";
import TeacherStepFive from "./TeacherStepFive";
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
} from "../../../types/profile";

interface StepContentProps {
  currentStep: number;
  role: string;
  profileData: ProfileData;
  updateProfileData: (
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
  ) => void;
  handleRoleUpdate: (data: StepTwoData) => void;
  next: () => void;
}

const StepContent: React.FC<StepContentProps> = ({
  currentStep,
  role,
  profileData,
  updateProfileData,
  handleRoleUpdate,
  next,
}) => {
  const updateData = (
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
    updateProfileData(step, data);
  };

  const commonSteps = [
    {
      title: "Шаг 1",
      content: (
        <StepOne
          data={profileData.stepOneData}
          updateData={(data) => updateData("stepOneData", data)}
          next={next}
        />
      ),
    },
    {
      title: "Шаг 2",
      content: (
        <StepTwo
          data={profileData.stepTwoData}
          updateData={handleRoleUpdate}
          next={next}
        />
      ),
    },
  ];

  const studentSteps = [
    {
      title: "Шаг 3",
      content: (
        <StepThree
          data={profileData.stepThreeData as StepThreeData}
          updateData={(data) => updateData("stepThreeData", data)}
          next={next}
        />
      ),
    },
    {
      title: "Шаг 4",
      content: (
        <StepFour
          data={profileData.stepFourData as StepFourData}
          updateData={(data) => updateData("stepFourData", data)}
          next={next}
        />
      ),
    },
    {
      title: "Шаг 5",
      content: (
        <StepFive
          data={profileData.stepFiveData as StepFiveData}
          updateData={(data) => updateData("stepFiveData", data)}
          next={next}
        />
      ),
    },
  ];

  const teacherSteps = [
    {
      title: "Шаг 3",
      content: (
        <TeacherStepThree
          data={profileData.stepThreeData as TeacherStepThreeData}
          updateData={(data) => updateData("stepThreeData", data)}
          next={next}
        />
      ),
    },
    {
      title: "Шаг 4",
      content: (
        <TeacherStepFour
          data={profileData.stepFourData as TeacherStepFourData}
          updateData={(data) => updateData("stepFourData", data)}
          next={next}
        />
      ),
    },
    {
      title: "Шаг 5",
      content: (
        <TeacherStepFive
          data={profileData.stepFiveData as TeacherStepFiveData}
          updateData={(data) => updateData("stepFiveData", data)}
          next={next}
        />
      ),
    },
  ];
  const steps =
    role === "teacher"
      ? [...commonSteps, ...teacherSteps]
      : [...commonSteps, ...studentSteps];

  return <>{steps[currentStep].content}</>;
};

export default StepContent;
