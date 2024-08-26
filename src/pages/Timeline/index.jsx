// import { useState } from 'react';
// import './index.css'; // Ensure your styles are updated accordingly
// import Education from './Education';
// import Experience from './Experience';

// const Timeline = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//   };


//   return (
//     <div className="timeline-page">
//       <h2>Timeline</h2>
//       <div className='timeline-page-content'>
//         <Education isEditing={isEditing}/>
//         <Experience isEditing={isEditing}/>
//       </div>
//       <button onClick={handleEditToggle}>
//         {isEditing ? 'Save Changes' : 'Edit'}
//       </button>
//     </div>
//   );
// };

// export default Timeline;


import { useState } from 'react';
import './index.css';
import Education from './Education';
import Experience from './Experience';

const Timeline = () => {
  const [isEditing, setIsEditing] = useState(false);
  const userId = '312b9d52-d0a2-476c-81be-88566b7b600b'; // Replace with your actual user_id

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="timeline-page">
      <h2>Timeline</h2>
      <div className="timeline-page-content">
        <Education isEditing={isEditing} userId={userId} />
        <Experience isEditing={isEditing} userId={userId} />
      </div>
      <button onClick={handleEditToggle}>
        {isEditing ? 'Save Changes' : 'Edit'}
      </button>
    </div>
  );
};

export default Timeline;