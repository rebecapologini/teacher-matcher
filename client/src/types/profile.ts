export interface StepOneData {
  name: string;
  surname: string;
  age: number;
}

export interface StepTwoData {
  role: string;
}

export interface StepThreeData {
  language: string;
  goal: string;
  level: string;
  duration: string;
}
export interface StepFourData {
  sex: string;
  lessons: string;
  priceRange: string;
  experience: string;
}

export interface StepFiveData {
  description: string;
}

export interface ProfileData {
  stepOneData: StepOneData;
  stepTwoData: StepTwoData;
  stepThreeData: StepThreeData;
  stepFourData: StepFourData;
  stepFiveData: StepFiveData;
}
