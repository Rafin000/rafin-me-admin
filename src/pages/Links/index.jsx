import { useState } from 'react';
import './index.css';

const Links = () => {
  const [isSocialEditing, setIsSocialEditing] = useState(false);
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');


  const handleSocialEditToggle = () => {
    setIsSocialEditing(!isSocialEditing);
  };

  return (
    <div className='links-page'>
        <h2>Social Media Links</h2>
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

export default Links;
