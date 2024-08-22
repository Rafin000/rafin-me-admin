// /* eslint-disable react/prop-types */
// import './index.css'


// const Skill = ({ imageSrc, altText, skillName }) => {
//   return (
//     <div className='skill'>
//       <img src={imageSrc} alt={altText} />
//       <span className='skill-content'>{skillName}</span>
//     </div>
//   );
// };

// export default Skill;

/* eslint-disable react/prop-types */
import './index.css'
import { useState } from 'react';

const Skill = ({ skill, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSkill, setEditedSkill] = useState(skill);

  const handleSaveEdit = () => {
    onEdit(skill.id, editedSkill);
    setIsEditing(false);
  };

  return (
    <div className='skill'>
      {isEditing ? (
        <div className="edit-skill">
          <input
            type="text"
            value={editedSkill.skill}
            onChange={e => setEditedSkill({ ...editedSkill, skill: e.target.value })}
          />
          <input
            type="text"
            value={editedSkill.icon_link}
            onChange={e => setEditedSkill({ ...editedSkill, icon_link: e.target.value })}
          />
          <div className='buttons'>
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <img src={skill.icon_link} alt={`${skill.skill} Icon`} />
          <span className='skill-content'>{skill.skill}</span>
          <div className='buttons'>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Skill;
