import { useState } from 'react';
import './index.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSocialEditing, setIsSocialEditing] = useState(false);
  const [fullName, setFullName] = useState('John Doe');
  const [designation, setDesignation] = useState('Software Engineer');
  const [profilePicture, setProfilePicture] = useState('/src/assets/profile-img.png');
  const [about, setAbout] = useState('A brief description about John Doe.');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSocialEditToggle = () => {
    setIsSocialEditing(!isSocialEditing);
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

      {/* Social Media Links Section */}
      <div className="social-media-links">
        <div className='social-media-links-header'>
            <h3>Social Media Links</h3>
            <button onClick={handleSocialEditToggle}>
            {isSocialEditing ? 'Save Links' : 'Edit Links'}
            </button>
        </div>
        <label>
          Facebook:
          {isSocialEditing ? (
            <input
              type="text"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="Facebook URL"
            />
          ) : (
            <a href={facebook} target="_blank" rel="noopener noreferrer">
              {facebook || 'Add Facebook link'}
            </a>
          )}
        </label>

        <label>
          Instagram:
          {isSocialEditing ? (
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="Instagram URL"
            />
          ) : (
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              {instagram || 'Add Instagram link'}
            </a>
          )}
        </label>

        <label>
          GitHub:
          {isSocialEditing ? (
            <input
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="GitHub URL"
            />
          ) : (
            <a href={github} target="_blank" rel="noopener noreferrer">
              {github || 'Add GitHub link'}
            </a>
          )}
        </label>

        <label>
          LinkedIn:
          {isSocialEditing ? (
            <input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="LinkedIn URL"
            />
          ) : (
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              {linkedin || 'Add LinkedIn link'}
            </a>
          )}
        </label>
      </div>
    </div>
  );
};

export default Profile;
