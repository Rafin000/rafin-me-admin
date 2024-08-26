// /* eslint-disable react/prop-types */
// import { useState } from 'react';
// import './index.css'

// const Education = ({isEditing}) => {
//     const [education, setEducation] = useState([
//         { year: '2018 - 2023', degree: 'Bachelor in Computer Science and Engineering', university: 'Chittagong University of Engineering and Technology', cgpa: '3.28 / 4.00' },
//         { year: '2017-2018', degree: 'Higher Secondary Certificate in Science', university: 'Notre Dame College, Dhaka', cgpa: '5.00 / 5.00' },
//       ]);

//     const handleEducationChange = (index, field, value) => {
//         const updatedEducation = [...education];
//         updatedEducation[index][field] = value;
//         setEducation(updatedEducation);
//       };

    
//     const handleAddEducation = () => {
//     setEducation([...education, { year: '', degree: '', university: '', cgpa: '' }]);
//     };
    
//     return (
//         <div className="education-section">
//           <h3>Education</h3>
//           {education.map((edu, index) => (
//             <div key={index} className="education-item">
//               {isEditing ? (
//                 <>
//                   <input
//                     type="text"
//                     placeholder="Year"
//                     value={edu.year}
//                     onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Degree"
//                     value={edu.degree}
//                     onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
//                   />
//                   <input
//                     type="text"
//                     placeholder="University"
//                     value={edu.university}
//                     onChange={(e) => handleEducationChange(index, 'university', e.target.value)}
//                   />
//                   <input
//                     type="text"
//                     placeholder="CGPA"
//                     value={edu.cgpa}
//                     onChange={(e) => handleEducationChange(index, 'cgpa', e.target.value)}
//                   />
//                 </>
//               ) : (
//                 <>
//                   <p><strong>Year:</strong> {edu.year}</p>
//                   <p><strong>Degree:</strong> {edu.degree}</p>
//                   <p><strong>University:</strong> {edu.university}</p>
//                   <p><strong>CGPA:</strong> {edu.cgpa}</p>
//                 </>
//               )}
//             </div>
//           ))}
//           {isEditing && (
//             <button onClick={handleAddEducation}>
//               Add Education
//             </button>
//           )}
//         </div>
//     )
// }

// export default Education


/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const Education = ({ isEditing }) => {
  const [education, setEducation] = useState([]);
  const userId = '312b9d52-d0a2-476c-81be-88566b7b600b';

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/v1/education?user_id=${userId}`)
      .then(response => {
        if (Array.isArray(response.data.data)) {
          setEducation(response.data.data);
        } else {
          setEducation([]);
        }
      })
      .catch(error => {
        console.error('Error fetching education data:', error);
        setEducation([]);
      });
  }, [userId]);

  const handleEducationChange = (index, field, value) => {
    setEducation(prevEducation => {
      const updatedEducation = [...prevEducation];
      if (updatedEducation[index]) {
        updatedEducation[index][field] = value;
      }
      return updatedEducation;
    });
  };

  const handleAddEducation = () => {
    setEducation(prevEducation => [
      ...prevEducation,
      { year: '', degree: '', university: '', cgpa: '', user_id: userId }
    ]);
  };

  const handleSaveEducation = () => {
    education.forEach(edu => {
      if (edu.id) { // Ensure that the education item has an ID
        axios.put(`http://127.0.0.1:5000/api/v1/education/${edu.id}`, edu)
          .then(response => console.log('Education updated:', response))
          .catch(error => console.error('Error updating education data:', error));
      } else {
        // Handle the case where the education item does not have an ID (possibly a new item)
        axios.post('http://127.0.0.1:5000/api/v1/education', edu)
          .then(response => console.log('Education added:', response))
          .catch(error => console.error('Error adding education data:', error));
      }
    });
  };

  const handleDeleteEducation = (index) => {
    const eduToDelete = education[index];
    if (eduToDelete.id) { // Ensure the item has an ID before deleting
      axios.delete(`http://127.0.0.1:5000/api/v1/education/${eduToDelete.id}`, { data: { user_id: userId } })
        .then(response => {
          setEducation(prevEducation => prevEducation.filter((_, i) => i !== index));
          console.log('Education deleted:', response);
        })
        .catch(error => console.error('Error deleting education data:', error));
    } else {
      console.error('Cannot delete education item without ID');
    }
  };

  return (
    <div className="education-section">
      <h3>Education</h3>
      {education.length > 0 ? (
        education.map((edu, index) => (
          <div key={index} className="education-item">
            {isEditing ? (
              <>
                <input
                  type="text"
                  placeholder="Year"
                  value={edu.year || ''}
                  onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree || ''}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="University"
                  value={edu.university || ''}
                  onChange={(e) => handleEducationChange(index, 'university', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="CGPA"
                  value={edu.cgpa || ''}
                  onChange={(e) => handleEducationChange(index, 'cgpa', e.target.value)}
                />
                <button onClick={() => handleDeleteEducation(index)}>Delete Education</button>
              </>
            ) : (
              <>
                <p><strong>Year:</strong> {edu.year || 'N/A'}</p>
                <p><strong>Degree:</strong> {edu.degree || 'N/A'}</p>
                <p><strong>University:</strong> {edu.university || 'N/A'}</p>
                <p><strong>CGPA:</strong> {edu.cgpa || 'N/A'}</p>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No education data available.</p>
      )}
      {isEditing && (
        <>
          <button onClick={handleAddEducation}>Add Education</button>
          <button onClick={handleSaveEducation}>Save Education</button>
        </>
      )}
    </div>
  );
};

export default Education;
