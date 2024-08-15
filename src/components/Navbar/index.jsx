import { useState } from 'react';
import './index.css';
import Sidebar from '../Slidebar';

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <nav className="navbar">
        <div className="social-icons">
          <a href="#" onClick={toggleSidebar} rel="noopener noreferrer">
            <i className="fa-solid fa-bars"></i>
          </a>
        </div>
        <div className='navbar-logo'>
          <a href="/">
            <img src="/src/assets/logo.png" alt="Logo" />
          </a>
        </div>
        {/* <ul className="nav-list">
          <li className="nav-item">
            <a href="/" className="nav-link">
              Profile
            </a>
          </li>
          <li className="nav-item">
            <a href="/all-blogs" className="nav-link">
              All Blogs
            </a>
          </li>
        </ul> */}
      </nav>
    </>
  );
}

export default Navbar;
