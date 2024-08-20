import { useNavigate } from 'react-router-dom'; // Updated import
import axios from 'axios'; // Import axios for delete functionality
import './index.css';

/* eslint-disable react/prop-types */
const BlogCard = ({ post }) => {
    const navigate = useNavigate(); // For navigation
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    const handleEdit = () => {
        // Navigate to the edit page with the post ID
        navigate(`/edit-blog/${post.id}`);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/api/v1/blogs/${post.id}`);
            if (response.status === 200) {
                console.log('Successfully deleted blog post');
                // Optionally, you can trigger a re-fetch of posts or refresh the page
            } else {
                console.error('Failed to delete blog post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="blog-post" key={post.id}>
            <p className='blog-post-date'>
                {new Date(post.created_at * 1000).toLocaleDateString('en-US', options)}
            </p>
            <div className='blog-post-content'>
                <a href={`/blog/${post.id}`} className='blog-post-title'>{post.title}</a>
                <div className='blog-post-actions'>
                    <button className='edit-button' onClick={handleEdit}>Edit</button>
                    <button className='delete-button' onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
