/* eslint-disable react/prop-types */
import { useState } from 'react';
import './index.css'

const Education = ({isEditing}) => {
    const [education, setEducation] = useState([
        { year: '2018 - 2023', degree: 'Bachelor in Computer Science and Engineering', university: 'Chittagong University of Engineering and Technology', cgpa: '3.28 / 4.00' },
        { year: '2017-2018', degree: 'Higher Secondary Certificate in Science', university: 'Notre Dame College, Dhaka', cgpa: '5.00 / 5.00' },
      ]);

    const handleEducationChange = (index, field, value) => {
        const updatedEducation = [...education];
        updatedEducation[index][field] = value;
        setEducation(updatedEducation);
      };

    
    const handleAddEducation = () => {
    setEducation([...education, { year: '', degree: '', university: '', cgpa: '' }]);
    };
    
    return (
        <div className="education-section">
          <h3>Education</h3>
          {education.map((edu, index) => (
            <div key={index} className="education-item">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    placeholder="Year"
                    value={edu.year}
                    onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="University"
                    value={edu.university}
                    onChange={(e) => handleEducationChange(index, 'university', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="CGPA"
                    value={edu.cgpa}
                    onChange={(e) => handleEducationChange(index, 'cgpa', e.target.value)}
                  />
                </>
              ) : (
                <>
                  <p><strong>Year:</strong> {edu.year}</p>
                  <p><strong>Degree:</strong> {edu.degree}</p>
                  <p><strong>University:</strong> {edu.university}</p>
                  <p><strong>CGPA:</strong> {edu.cgpa}</p>
                </>
              )}
            </div>
          ))}
          {isEditing && (
            <button onClick={handleAddEducation}>
              Add Education
            </button>
          )}
        </div>
    )
}

export default Education