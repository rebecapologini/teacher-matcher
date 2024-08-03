import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface University {
  id: number;
  title: string;
}

interface Faculty {
  id: number;
  title: string;
}

const UniSelector: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState<number | ''>('');

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/getUniversitiesFromDB');
        setUniversities(response.data.universities);
      } catch (error) {
        console.error('An error occurred while fetching universities from DB:', error);
      }
    };

    fetchUniversities();
  }, []);

  const handleUniversityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const universityId = Number(e.target.value);
    setSelectedUniversity(universityId || '');

    if (!universityId) return;

    try {
      const response = await axios.get('http://localhost:4000/api/getFaculties', {
        params: { university_id: universityId },
      });
      const fetchedFaculties = response.data.response.items || [];
      setFaculties(fetchedFaculties);
    } catch (error) {
      console.error('An error occurred while fetching faculties:', error);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="universities">Университет: </label>
        <select id="universities" onChange={handleUniversityChange} value={selectedUniversity}>
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
          <select id="faculties">
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
