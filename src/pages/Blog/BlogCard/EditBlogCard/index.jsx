import axios from 'axios';
import { useState, useEffect } from 'react';
import './index.css';
import Markdown from '../../../../components/Markdown';
import { useParams, useNavigate } from 'react-router-dom';

const EditBlogCard = () => {
  const { postId } = useParams(); 
  const navigate = useNavigate(); 
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [readingTime, setReadingTime] = useState('');
  const [author, setAuthor] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [markdown, setMarkdown] = useState('# Your Markdown Here'); 

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/v1/blogs/${postId}`);
        const post = response.data.data;
        setTitle(post.title || '');
        setShortDescription(post.summary || '');
        setReadingTime(post.reading_time?.toString() || '');
        setAuthor(post.author || '');
        setThumbnail(post.thumbnail_url || '');
        setTags(Array.isArray(post.tags) ? post.tags : []);
        setMarkdown(post.content || '# Your Markdown Here');
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleTagAdd = () => {
    if (tagInput) {
      setTags(prevTags => [...prevTags, tagInput]);
      setTagInput('');
    }
  };

  const handleSubmit = async () => {
    const readingTimeInt = parseInt(readingTime, 10);

    const postData = {
      title,
      summary: shortDescription,
      reading_time: readingTimeInt,
      thumbnail_url: thumbnail,
      tags: tags,
      content: markdown,
      author: author
    };
  
    try {
      const response = await axios.put(`http://127.0.0.1:5000/api/v1/blogs/${postId}`, postData);
  
      if (response.status === 200) {
        console.log('Successfully updated blog post');
        navigate('/all-blogs'); // Redirect to blog list
      } else {
        console.error('Failed to update blog post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="admin-page">
      <h2>Edit Blog</h2>
      
      <label>
        Title:
        <input
          type="text"
          placeholder="Content title"
          value={title || ''}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      
      <label>
        Summary:
        <input
          type="text"
          placeholder="Describe short summary"
          value={shortDescription || ''}
          onChange={(e) => setShortDescription(e.target.value)}
        />
      </label>
      
      <label>
        Reading Time:
        <input
          type="text"
          placeholder="How much time will it take to finish reading? (In minutes)"
          value={readingTime || ''}
          onChange={(e) => setReadingTime(e.target.value)}
        />
      </label>
      
      <label>
        Author:
        <input
          type="text"
          placeholder="Author name"
          value={author || ''}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>
      
      <label>
        Content:
      </label>
      <Markdown markdown={markdown} setMarkdown={setMarkdown} />
      
      <label>
        Blog Thumbnail:
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={thumbnail || ''}
          onChange={(e) => setThumbnail(e.target.value)}
        />
      </label>
      
      <label>
        Tags:
        <input
          type="text"
          placeholder="Add a tag"
          value={tagInput || ''}
          onChange={(e) => setTagInput(e.target.value)}
        />
        <button type="button" onClick={handleTagAdd}>Add Tag</button>
        <div>
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))
          ) : (
            <span>No tags available</span>
          )}
        </div>
      </label>
      
      <div>
        <button onClick={handleSubmit}>Update</button>
      </div>
    </div>
  );
};

export default EditBlogCard;
