export interface StepOneData {
  name: string;
  surname: string;
  age: number;
  avatarUrl: string;
  sex_id: number;
  picture_link: string;
}

export interface StepTwoData {
  role: string;
}

export interface StepThreeData {
  language_id: number;
  goal_id: number;
  level_id: number;
  duration: string;
}
export interface StepFourData {
  preferred_sex_id: number;
  lessons: string;
  price_id: number;
  teacher_experience_id: number;
  almaMater?: string | number | "";
  faculty?: string | number | "";
  academicDegree?: string;
  lessonCost?: string;
}

export interface StepFiveData {
  about: string;
}

export interface TeacherStepThreeData {
  competence: string[];
  languageLevel: string;
  documents: string;
}

export interface TeacherStepFourData {
  teachingExperience: number;
  almaMater: string | number | "";
  faculty: string | number | "";
  academicDegree: string;
  lessonCost: string;
}
export interface TeacherStepFiveData {
  convenientTime: {
    [day: string]: string[];
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

export interface ProfileDataForRegistration
  extends StepOneData,
    StepTwoData,
    StepThreeData,
    StepFourData,
    StepFiveData {}
