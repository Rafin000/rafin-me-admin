/* eslint-disable react/prop-types */
import { useState } from 'react';
import './index.css'

const Experience = ({isEditing}) => {
    const [experience, setExperience] = useState([
        { year: 'Feb 2024 - Present', position: 'Software Engineer - Cloud Software (Backend)', company: 'Intercloud Limited', points: ['Continuously developing Brilliant Cloud Portal (BCP)', 'Designed and Developed Brilliant Ticketing System frontend for customer support.'] },
        { year: 'Apr 2023 - Dec 2023', position: 'Trainee Software Engineer', company: 'Diligite Limited', points: ['Continuously developing Brilliant Cloud Portal (BCP)', 'Designed and Developed Brilliant Ticketing System frontend for customer support.'] },
      ]);
    

      const handleExperienceChange = (index, field, value) => {
        const updatedExperience = [...experience];
        updatedExperience[index][field] = value;
        setExperience(updatedExperience);
      };
    
      const handleExperiencePointChange = (index, pointIndex, value) => {
        const updatedExperience = [...experience];
        updatedExperience[index].points[pointIndex] = value;
        setExperience(updatedExperience);
      };
    
      const handleAddExperience = () => {
        setExperience([...experience, { year: '', position: '', company: '', points: [''] }]);
      };
    
      const handleAddPoint = (index) => {
        const updatedExperience = [...experience];
        updatedExperience[index].points.push('');
        setExperience(updatedExperience);
      };
    return (
    <div className="experience-section">
        <h3>Experience</h3>
        {experience.map((exp, index) => (
          <div key={index} className="experience-item">
            {isEditing ? (
              <>
                <input
                  type="text"
                  placeholder="Year"
                  value={exp.year}
                  onChange={(e) => handleExperienceChange(index, 'year', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                />
                <ul>
                  {exp.points.map((point, pointIndex) => (
                    <li key={pointIndex}>
                      <input
                        type="text"
                        placeholder="Point"
                        value={point}
                        onChange={(e) => handleExperiencePointChange(index, pointIndex, e.target.value)}
                      />
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleAddPoint(index)}>
                  Add Point
                </button>
              </>
            ) : (
              <>
                <p><strong>Year:</strong> {exp.year}</p>
                <p><strong>Position:</strong> {exp.position}</p>
                <p><strong>Company:</strong> {exp.company}</p>
                <ul>
                  {exp.points.map((point, pointIndex) => (
                    <li key={pointIndex}>
                      <p>{point}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
        {isEditing && (
          <button onClick={handleAddExperience}>
            Add Experience
          </button>
        )}
      </div>
    )
}

export default Experience