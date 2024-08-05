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

export interface TeacherStepThreeData {
  competence: string;
  languageLevel: string;
  documents: string;
}

export interface TeacherStepFourData {
  teachingExperience: number;
  almaMater: string;
  academicDegree: string;
  faculty: string;
  lessonCost: string;
}

export interface TeacherStepFiveData {
  convenientTime: {
    days: string[];
    times: string[];
  };
  aboutYourself: string;
  videoPresentation: string;
}
export interface ProfileData {
  stepOneData: StepOneData;
  stepTwoData: StepTwoData;
  stepThreeData: StepThreeData | TeacherStepThreeData;
  stepFourData: StepFourData | TeacherStepFourData;
  stepFiveData: StepFiveData | TeacherStepFiveData;
}
