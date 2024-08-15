/* eslint-disable react/prop-types */
import './index.css'; 

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
      <ul className="sidebar-links">
        <div>
            <li><a href="/">Profile</a></li>
            <li><a href="/all-blogs">All Blogs</a></li>
            <li><a href="/blog">Create Blog</a></li>
            <li><a href="/links">Social Media Links</a></li>
            <li><a href="/skills">Skills</a></li>
            <li><a href="/timeline">Timeline</a></li>
            <li><a href="/testimonials">Testimonials</a></li>
        </div>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
