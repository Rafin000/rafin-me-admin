/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import './index.css';
import Skill from './Skill';

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSkill, setNewSkill] = useState({ skill: '', icon_link: '' });
  const userId = '312b9d52-d0a2-476c-81be-88566b7b600b'; // Fixed user_id

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/v1/users/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSkills(data.data.skills || []); 
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []); 

  const handleAddSkill = () => {
    fetch('http://127.0.0.1:5000/api/v1/skills/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newSkill, user_id: userId }),
    })
      .then(response => response.json())
      .then(data => {
        setSkills([...skills, newSkill]);
        setNewSkill({ skill: '', icon_link: '' });
      })
      .catch(error => setError(error));
  };

  const handleDeleteSkill = (skillId) => {
    fetch(`http://127.0.0.1:5000/api/v1/skills/${skillId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId }),
    })
      .then(response => response.json())
      .then(data => {
        setSkills(skills.filter(skill => skill.id !== skillId));
      })
      .catch(error => setError(error));
  };

  const handleEditSkill = (skillId, updatedSkill) => {
    fetch(`http://127.0.0.1:5000/api/v1/skills/${skillId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...updatedSkill, user_id: userId }),
    })
      .then(response => response.json())
      .then(data => {
        setSkills(skills.map(skill => skill.id === skillId ? updatedSkill : skill));
      })
      .catch(error => setError(error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='home-skills'>
      <h1>Top Skills</h1>
      <div className='skills'>
        {skills.map((skill, index) => (
          <Skill
            key={index}
            skill={skill}
            onDelete={() => handleDeleteSkill(skill.id)}
            onEdit={handleEditSkill}
          />
        ))}
      </div>
      <div className="add-skill">
        <input
          type="text"
          placeholder="Skill Name"
          value={newSkill.skill}
          onChange={e => setNewSkill({ ...newSkill, skill: e.target.value })}
        />
        <input
          type="text"
          placeholder="Icon Link"
          value={newSkill.icon_link}
          onChange={e => setNewSkill({ ...newSkill, icon_link: e.target.value })}
        />
        <button onClick={handleAddSkill}>Add Skill</button>
      </div>
    </div>
  );
};

export default SkillsSection;
