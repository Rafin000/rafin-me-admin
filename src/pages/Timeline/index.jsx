import { useState } from 'react';
import './index.css'; // Ensure your styles are updated accordingly
import Education from './Education';
import Experience from './Experience';

const Timeline = () => {
  const [isEditing, setIsEditing] = useState(false);
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };


  return (
    <div className="timeline-page">
      <h2>Timeline</h2>
      <div className='timeline-page-content'>
        <Education isEditing={isEditing}/>
        <Experience isEditing={isEditing}/>
      </div>
      <button onClick={handleEditToggle}>
        {isEditing ? 'Save Changes' : 'Edit'}
      </button>
    </div>
  );
};

export default Timeline;
