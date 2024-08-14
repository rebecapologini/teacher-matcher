import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import CustomButton from "../../button/button-component";
import { useProfile } from "../../context/profileContext";
import { useEffect, useState } from "react";
interface StepNavigatorProps {
  currentStep: number;
  totalSteps: number;
  prev: () => void;
  next: () => void;
  register: () => void;
}
const StepNavigator: React.FC<StepNavigatorProps> = ({
  currentStep,
  totalSteps,
  prev,
  next,
  register,
}) => {
  const {
    isFilledStepOne,
    isFilledStepTwo,
    isFilledStepThree,
    isFilledStepFour,
    isFilledStepFive,
    globalRole,
    isFilledTeacherStepThree,
    isFilledTeacherStepFour,
    isFilledTeacherStepFive,
  } = useProfile();
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    setDisabled(true);
    if (currentStep === 0 && isFilledStepOne === 5) {
      setDisabled(false);
    } else if (currentStep === 1 && isFilledStepTwo === 1) {
      setDisabled(false);
    } else if (
      globalRole === "student" &&
      currentStep === 2 &&
      isFilledStepThree === 4
    ) {
      setDisabled(false);
    } else if (
      globalRole === "teacher" &&
      currentStep === 2 &&
      isFilledTeacherStepThree >= 4
    ) {
      setDisabled(false);
    } else if (
      globalRole === "student" &&
      currentStep === 3 &&
      isFilledStepFour === 4
    ) {
      setDisabled(false);
    } else if (
      globalRole === "teacher" &&
      currentStep === 3 &&
      isFilledTeacherStepFour === 5
    ) {
      setDisabled(false);
    } else if (
      globalRole === "student" &&
      currentStep === 4 &&
      isFilledStepFive === 1
    ) {
      setDisabled(false);
    } else if (
      globalRole === "teacher" &&
      currentStep === 4 &&
      isFilledTeacherStepFive === 3
    ) {
      setDisabled(false);
    }
  });
  console.log(isFilledTeacherStepThree);
  console.log(currentStep);
  return (
    <div className="step-navigator">
      {currentStep > 0 && (
        <CustomButton
          type="secondary"
          icon={<LeftOutlined />}
          text="Назад"
          onClick={prev}
          disabled={false}
        ></CustomButton>
      )}
      {currentStep < totalSteps - 1 && (
        <CustomButton
          type="secondary"
          iconAfterText={<RightOutlined />}
          text="Далее"
          disabled={disabled}
          onClick={next}
        />
      )}
      {currentStep === 4 && (
        <CustomButton
          type="secondary"
          iconAfterText={<RightOutlined />}
          text="Далее"
          disabled={disabled}
          onClick={register}
        />
      )}
    </div>
  );
};

export default StepNavigator;
