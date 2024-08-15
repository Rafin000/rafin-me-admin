import { useState } from 'react';
import './index.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('John Doe');
  const [designation, setDesignation] = useState('Software Engineer');
  const [profilePicture, setProfilePicture] = useState('/src/assets/profile-img.png');
  const [about, setAbout] = useState('A brief description about John Doe.');


  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <div className='profile-header'>
        <div className="profile-picture">
          <img src={profilePicture} alt="Profile" />
          {isEditing && (
            <input type="file" onChange={handlePictureChange} />
          )}
        </div>
        <button onClick={handleEditToggle}>
          {isEditing ? 'Save Profile' : 'Edit Profile'}
        </button>
      </div>
      <div className="profile-info">
        <label>
          Full Name:
          {isEditing ? (
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          ) : (
            <p>{fullName}</p>
          )}
        </label>

        <label>
          Designation:
          {isEditing ? (
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          ) : (
            <p>{designation}</p>
          )}
        </label>

        <label>
          About:
          {isEditing ? (
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          ) : (
            <p>{about}</p>
          )}
        </label>
      </div>
    </div>
  );
};

export default Profile;
