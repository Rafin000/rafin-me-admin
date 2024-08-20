// import { useState } from 'react';
// import './index.css';

// const Profile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [fullName, setFullName] = useState('John Doe');
//   const [designation, setDesignation] = useState('Software Engineer');
//   const [profilePicture, setProfilePicture] = useState('/src/assets/profile-img.png');
//   const [about, setAbout] = useState('A brief description about John Doe.');


//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//   };

//   const handlePictureChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePicture(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="profile-page">
//       <h2>Profile</h2>
//       <div className='profile-header'>
//         <div className="profile-picture">
//           <img src={profilePicture} alt="Profile" />
//           {isEditing && (
//             <input type="file" onChange={handlePictureChange} />
//           )}
//         </div>
//         <button onClick={handleEditToggle}>
//           {isEditing ? 'Save Profile' : 'Edit Profile'}
//         </button>
//       </div>
//       <div className="profile-info">
//         <label>
//           Full Name:
//           {isEditing ? (
//             <input
//               type="text"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//             />
//           ) : (
//             <p>{fullName}</p>
//           )}
//         </label>

//         <label>
//           Designation:
//           {isEditing ? (
//             <input
//               type="text"
//               value={designation}
//               onChange={(e) => setDesignation(e.target.value)}
//             />
//           ) : (
//             <p>{designation}</p>
//           )}
//         </label>

//         <label>
//           About:
//           {isEditing ? (
//             <textarea
//               value={about}
//               onChange={(e) => setAbout(e.target.value)}
//             />
//           ) : (
//             <p>{about}</p>
//           )}
//         </label>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [designation, setDesignation] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [about, setAbout] = useState('');
  // const [userId, setUserId] = useState('1'); 

  const userId = '312b9d52-d0a2-476c-81be-88566b7b600b'

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/v1/users/${userId}`);
        const { data } = response.data;
        setFullName(data.full_name);
        setDesignation(data.designation);
        setProfilePicture(data.profile_picture_link);
        setAbout(data.about);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

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

  const handleSave = async () => {
    try {
      const updatedUser = {
        full_name: fullName,
        designation: designation,
        about: about,
        profile_picture_link: profilePicture
      };
      await axios.put(`http://127.0.0.1:5000/api/v1/users/${userId}`, updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
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
        <button onClick={isEditing ? handleSave : handleEditToggle}>
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
