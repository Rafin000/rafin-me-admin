// import { useState } from 'react';
// import './index.css';

// const Links = () => {
//   const [isSocialEditing, setIsSocialEditing] = useState(false);
//   const [facebook, setFacebook] = useState('');
//   const [instagram, setInstagram] = useState('');
//   const [github, setGithub] = useState('');
//   const [linkedin, setLinkedin] = useState('');


//   const handleSocialEditToggle = () => {
//     setIsSocialEditing(!isSocialEditing);
//   };

//   return (
//     <div className='links-page'>
//         <h2>Social Media Links</h2>
//         <div className="social-media-links">
//             <div className='social-media-links-header'>
//                 <h3>Social Media Links</h3>
//                 <button onClick={handleSocialEditToggle}>
//                 {isSocialEditing ? 'Save Links' : 'Edit Links'}
//                 </button>
//             </div>
//             <label>
//                 Facebook:
//                 {isSocialEditing ? (
//                 <input
//                     type="text"
//                     value={facebook}
//                     onChange={(e) => setFacebook(e.target.value)}
//                     placeholder="Facebook URL"
//                 />
//                 ) : (
//                 <a href={facebook} target="_blank" rel="noopener noreferrer">
//                     {facebook || 'Add Facebook link'}
//                 </a>
//                 )}
//             </label>

//             <label>
//                 Instagram:
//                 {isSocialEditing ? (
//                 <input
//                     type="text"
//                     value={instagram}
//                     onChange={(e) => setInstagram(e.target.value)}
//                     placeholder="Instagram URL"
//                 />
//                 ) : (
//                 <a href={instagram} target="_blank" rel="noopener noreferrer">
//                     {instagram || 'Add Instagram link'}
//                 </a>
//                 )}
//             </label>

//             <label>
//                 GitHub:
//                 {isSocialEditing ? (
//                 <input
//                     type="text"
//                     value={github}
//                     onChange={(e) => setGithub(e.target.value)}
//                     placeholder="GitHub URL"
//                 />
//                 ) : (
//                 <a href={github} target="_blank" rel="noopener noreferrer">
//                     {github || 'Add GitHub link'}
//                 </a>
//                 )}
//             </label>

//             <label>
//                 LinkedIn:
//                 {isSocialEditing ? (
//                 <input
//                     type="text"
//                     value={linkedin}
//                     onChange={(e) => setLinkedin(e.target.value)}
//                     placeholder="LinkedIn URL"
//                 />
//                 ) : (
//                 <a href={linkedin} target="_blank" rel="noopener noreferrer">
//                     {linkedin || 'Add LinkedIn link'}
//                 </a>
//                 )}
//             </label>
//         </div>
//     </div>
//   );
// };

// export default Links;


import { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios'; // Add axios for making API requests

const Links = () => {
  const [isSocialEditing, setIsSocialEditing] = useState(false);
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');

  useEffect(() => {
    const fetchSocialMediaLinks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/v1/socials');
        const links = response.data.data[0]; 
        setFacebook(links.facebook || '');
        setInstagram(links.instagram || '');
        setGithub(links.github || '');
        setLinkedin(links.linkedin || '');
      } catch (error) {
        console.error('Error fetching social media links:', error);
      }
    };

    fetchSocialMediaLinks();
  }, []);

  const handleSocialEditToggle = () => {
    setIsSocialEditing(!isSocialEditing);
  };

  const handleSaveLinks = async () => {
    try {
      await axios.put('http://127.0.0.1:5000/api/v1/socials/cc8897c7-88d3-44fb-a3e2-3c431db76ad4', {
        facebook,
        instagram,
        github,
        linkedin
      });
      setIsSocialEditing(false);
      alert('Social media links updated successfully');
    } catch (error) {
      console.error('Error updating social media links:', error);
      alert('Failed to update social media links');
    }
  };

  return (
    <div className='links-page'>
        <h2>Social Media Links</h2>
        <div className="social-media-links">
            <div className='social-media-links-header'>
                <h3>Social Media Links</h3>
                <button onClick={isSocialEditing ? handleSaveLinks : handleSocialEditToggle}>
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

export default Links;
