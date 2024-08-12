import { createContext, useContext, useState } from "react";

type ProfileContextType = {
  isFilledStepOne: number;
  isFilledStepTwo: number;
  setIsFilledStepOne: (t: (prev: number) => number) => void;
  setIsFilledStepTwo: (t: (prev: number) => number) => void;
  isFilledStepThree: number;
  setIsFilledStepThree: (t: (prev: number) => number) => void;
  isFilledStepFour: number;
  setIsFilledStepFour: (t: (prev: number) => number) => void;
  isFilledStepFive: number;
  setIsFilledStepFive: (t: (prev: number) => number) => void;
  isFilledTeacherStepThree: number;
  setIsFilledTeacherStepThree: (t: (prev: number) => number) => void;
  isFilledTeacherStepFour: number;
  setIsFilledTeacherStepFour: (t: (prev: number) => number) => void;
  isFilledTeacherStepFive: number;
  setIsFilledTeacherStepFive: (t: (prev: number) => number) => void;
  globalRole: string;
  setGlobalRole: (t: string) => void;
};

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
);
export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isFilledStepOne, setIsFilledStepOne] = useState<number>(0);
  const [isFilledStepTwo, setIsFilledStepTwo] = useState<number>(0);
  const [isFilledStepThree, setIsFilledStepThree] = useState<number>(0);
  const [isFilledStepFour, setIsFilledStepFour] = useState<number>(0);
  const [isFilledStepFive, setIsFilledStepFive] = useState<number>(0);
  const [isFilledTeacherStepThree, setIsFilledTeacherStepThree] =
    useState<number>(0);
  const [isFilledTeacherStepFour, setIsFilledTeacherStepFour] =
    useState<number>(0);
  const [isFilledTeacherStepFive, setIsFilledTeacherStepFive] =
    useState<number>(0);
  const [globalRole, setGlobalRole] = useState<string>("");

  return (
    <ProfileContext.Provider
      value={{
        isFilledStepOne,
        setIsFilledStepOne,
        isFilledStepTwo,
        setIsFilledStepTwo,
        isFilledStepThree,
        setIsFilledStepThree,
        isFilledStepFour,
        setIsFilledStepFour,
        isFilledStepFive,
        setIsFilledStepFive,
        isFilledTeacherStepThree,
        setIsFilledTeacherStepThree,
        isFilledTeacherStepFour,
        setIsFilledTeacherStepFour,
        isFilledTeacherStepFive,
        setIsFilledTeacherStepFive,
        globalRole,
        setGlobalRole,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("Provider must be used");
  }
  return context;
};
