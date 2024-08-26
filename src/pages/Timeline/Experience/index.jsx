// /* eslint-disable react/prop-types */
// import { useState } from 'react';
// import './index.css'

// const Experience = ({isEditing}) => {
//     const [experience, setExperience] = useState([
//         { year: 'Feb 2024 - Present', position: 'Software Engineer - Cloud Software (Backend)', company: 'Intercloud Limited', points: ['Continuously developing Brilliant Cloud Portal (BCP)', 'Designed and Developed Brilliant Ticketing System frontend for customer support.'] },
//         { year: 'Apr 2023 - Dec 2023', position: 'Trainee Software Engineer', company: 'Diligite Limited', points: ['Continuously developing Brilliant Cloud Portal (BCP)', 'Designed and Developed Brilliant Ticketing System frontend for customer support.'] },
//       ]);
    

//       const handleExperienceChange = (index, field, value) => {
//         const updatedExperience = [...experience];
//         updatedExperience[index][field] = value;
//         setExperience(updatedExperience);
//       };
    
//       const handleExperiencePointChange = (index, pointIndex, value) => {
//         const updatedExperience = [...experience];
//         updatedExperience[index].points[pointIndex] = value;
//         setExperience(updatedExperience);
//       };
    
//       const handleAddExperience = () => {
//         setExperience([...experience, { year: '', position: '', company: '', points: [''] }]);
//       };
    
//       const handleAddPoint = (index) => {
//         const updatedExperience = [...experience];
//         updatedExperience[index].points.push('');
//         setExperience(updatedExperience);
//       };
//     return (
//     <div className="experience-section">
//         <h3>Experience</h3>
//         {experience.map((exp, index) => (
//           <div key={index} className="experience-item">
//             {isEditing ? (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Year"
//                   value={exp.year}
//                   onChange={(e) => handleExperienceChange(index, 'year', e.target.value)}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Position"
//                   value={exp.position}
//                   onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Company"
//                   value={exp.company}
//                   onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
//                 />
//                 <ul>
//                   {exp.points.map((point, pointIndex) => (
//                     <li key={pointIndex}>
//                       <input
//                         type="text"
//                         placeholder="Point"
//                         value={point}
//                         onChange={(e) => handleExperiencePointChange(index, pointIndex, e.target.value)}
//                       />
//                     </li>
//                   ))}
//                 </ul>
//                 <button onClick={() => handleAddPoint(index)}>
//                   Add Point
//                 </button>
//               </>
//             ) : (
//               <>
//                 <p><strong>Year:</strong> {exp.year}</p>
//                 <p><strong>Position:</strong> {exp.position}</p>
//                 <p><strong>Company:</strong> {exp.company}</p>
//                 <ul>
//                   {exp.points.map((point, pointIndex) => (
//                     <li key={pointIndex}>
//                       <p>{point}</p>
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             )}
//           </div>
//         ))}
//         {isEditing && (
//           <button onClick={handleAddExperience}>
//             Add Experience
//           </button>
//         )}
//       </div>
//     )
// }

// export default Experience

/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const Experience = ({ isEditing }) => {
  const [experience, setExperience] = useState([]);
  const userId = '312b9d52-d0a2-476c-81be-88566b7b600b';

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/v1/experience')
      .then(response => {
        if (Array.isArray(response.data.data)) {
          setExperience(response.data.data); // Use response.data.data
          console.log("Experience Data", response.data.data);
        } else {
          console.error('Unexpected data format:', response.data);
          setExperience([]); // Ensure it's always an array
        }
      })
      .catch(error => {
        console.error('Error fetching experience data:', error);
        setExperience([]); // Ensure it's always an array
      });
  }, [userId]);

  const handleExperienceChange = (index, field, value) => {
    setExperience(prevExperience => {
      const updatedExperience = [...prevExperience];
      if (updatedExperience[index]) {
        updatedExperience[index][field] = value;
      }
      return updatedExperience;
    });
  };

  const handleExperiencePointChange = (index, pointIndex, value) => {
    setExperience(prevExperience => {
      const updatedExperience = [...prevExperience];
      if (updatedExperience[index]) {
        updatedExperience[index].points[pointIndex] = value;
      }
      return updatedExperience;
    });
  };

  const handleAddExperience = () => {
    setExperience(prevExperience => [
      ...prevExperience,
      { year: '', position: '', company: '', points: [''], user_id: userId }
    ]);
  };

  const handleAddPoint = (index) => {
    setExperience(prevExperience => {
      const updatedExperience = [...prevExperience];
      if (updatedExperience[index]) {
        updatedExperience[index].points.push('');
      }
      return updatedExperience;
    });
  };

  const handleSaveExperience = () => {
    experience.forEach(exp => {
      if (exp.id) { // Ensure that the experience has an ID
        axios.put(`http://127.0.0.1:5000/api/v1/experience/${exp.id}`, exp)
          .then(response => console.log('Experience updated:', response))
          .catch(error => console.error('Error updating experience data:', error));
      } else {
        // Handle the case where the experience does not have an ID (possibly a new item)
        axios.post('http://127.0.0.1:5000/api/v1/experience/', exp)
          .then(response => console.log('Experience added:', response))
          .catch(error => console.error('Error adding experience data:', error));
      }
    });
  };

  const handleDeleteExperience = (index) => {
    const expToDelete = experience[index];
    axios.delete(`http://127.0.0.1:5000/api/v1/experience/${expToDelete.id}`, { data: { user_id: userId } })
      .then(response => {
        setExperience(prevExperience => prevExperience.filter((_, i) => i !== index));
        console.log('Experience deleted:', response);
      })
      .catch(error => console.error('Error deleting experience data:', error));
  };

  return (
    <div className="experience-section">
      <h3>Experience</h3>
      {Array.isArray(experience) && experience.map((exp, index) => (
        <div key={index} className="experience-item">
          {isEditing ? (
            <>
              <input
                type="text"
                placeholder="Year"
                value={exp.year || ''}
                onChange={(e) => handleExperienceChange(index, 'year', e.target.value)}
              />
              <input
                type="text"
                placeholder="Position"
                value={exp.position || ''}
                onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
              />
              <input
                type="text"
                placeholder="Company"
                value={exp.company || ''}
                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
              />
              <ul>
                {Array.isArray(exp.points) && exp.points.map((point, pointIndex) => (
                  <li key={pointIndex}>
                    <input
                      type="text"
                      placeholder="Point"
                      value={point || ''}
                      onChange={(e) => handleExperiencePointChange(index, pointIndex, e.target.value)}
                    />
                  </li>
                ))}
              </ul>
              <button onClick={() => handleAddPoint(index)}>Add Point</button>
              <button onClick={() => handleDeleteExperience(index)}>Delete Experience</button>
            </>
          ) : (
            <>
              <p><strong>Year:</strong> {exp.year || 'N/A'}</p>
              <p><strong>Position:</strong> {exp.position || 'N/A'}</p>
              <p><strong>Company:</strong> {exp.company || 'N/A'}</p>
              <ul>
                {Array.isArray(exp.points) && exp.points.map((point, pointIndex) => (
                  <li key={pointIndex}>
                    <p>{point || 'N/A'}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
      {isEditing && (
        <>
          <button onClick={handleAddExperience}>Add Experience</button>
          <button onClick={handleSaveExperience}>Save Experience</button>
        </>
      )}
    </div>
  );
};

export default Experience;

