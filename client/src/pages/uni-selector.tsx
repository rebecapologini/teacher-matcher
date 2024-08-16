//@ts-ignore

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProfileData, TeacherStepFourData } from "../types/profile";

interface University {
  id: number;
  title: string;
}

interface Faculty {
  id: number;
  title: string;
}

interface UniSelectorProps {
  selectedUniversity: number | "";
  selectedFaculty: number | "";
  updateProfileData: (
    step: keyof ProfileData,
    data: TeacherStepFourData
  ) => void;
}

const UniSelector: React.FC<UniSelectorProps> = ({
  selectedUniversity,
  selectedFaculty,
  updateProfileData,
}) => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      const url = import.meta.env.VITE_API_BASE_URL;
      try {
        const response = await axios.get(`${url}/getUniversitiesFromDB`);
        setUniversities(response.data.universities);
      } catch (error) {
        console.error(
          "An error occurred while fetching universities from DB:",
          error
        );
      }
    };

    fetchUniversities();
  }, []);

  const handleUniversityChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const universityId = Number(e.target.value);
    updateProfileData("stepFourData", {
      selectedUniversity: universityId || "",
    });

    if (!universityId) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/getFaculties`,
        {
          params: { university_id: universityId },
        }
      );
      const fetchedFaculties = response.data.response.items || [];
      setFaculties(fetchedFaculties);
    } catch (error) {
      console.error("An error occurred while fetching faculties:", error);
    }
  };

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const facultyId = Number(e.target.value);
    updateProfileData("stepFourData", { selectedFaculty: facultyId || "" });
  };

  return (
    <div>
      <div>
        <label htmlFor="universities">Университет: </label>
        <select
          id="universities"
          onChange={handleUniversityChange}
          value={selectedUniversity}
        >
          <option value="">Выберите университет</option>
          {universities.map((university) => (
            <option key={university.id} value={university.id}>
              {university.title}
            </option>
          ))}
        </select>
      </div>
      {selectedUniversity && (
        <div>
          <label htmlFor="faculties">Факультет: </label>
          <select
            id="faculties"
            onChange={handleFacultyChange}
            value={selectedFaculty}
          >
            <option value="">Выберите факультет</option>
            {faculties.map((faculty) => (
              <option key={faculty.id} value={faculty.id}>
                {faculty.title}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default UniSelector;
