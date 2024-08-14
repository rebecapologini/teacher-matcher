export interface StepOneData {
  name: string;
  surname: string;
  age: number;
  avatarUrl: string;
  sex_id: number;
  picture_link: string;
  phone: string;
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
  competence: number[];
  languageLevel: string;
  documents: string;
  language_id: number;
}

export interface TeacherStepFourData {
  teachingExperience: number;
  almaMater: string | number | "" | undefined | null;
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

export interface ProfileId {
  id: number | string | undefined;
}
