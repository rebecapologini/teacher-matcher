import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import CustomButton from "../../button/button-component";
interface StepNavigatorProps {
  currentStep: number;
  totalSteps: number;
  prev: () => void;
  next: () => void;
}
const StepNavigator: React.FC<StepNavigatorProps> = ({
  currentStep,
  totalSteps,
  prev,
  next,
}) => {
  return (
    <div className="step-navigator">
      {currentStep > 0 && (
        <CustomButton
          type="secondary"
          icon={<LeftOutlined />}
          text="Назад"
          onClick={prev}
        ></CustomButton>
      )}
      {currentStep < totalSteps - 1 && (
        <CustomButton
          type="secondary"
          iconAfterText={<RightOutlined />}
          text="Далее"
          onClick={next}
        />
      )}
    </div>
  );
};

export default StepNavigator;
