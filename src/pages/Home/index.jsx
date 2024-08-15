import { useState } from 'react';
import './index.css';
import Markdown from '../../components/Markdown';

const Home = () => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [readingTime, setReadingTime] = useState('');
  const [author, setAuthor] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async () => {
    const postData = {
      title: title,
      author: 'Admin'
    };

    try {
      const response = await fetch('http://localhost:5000/api/v1/blog-service/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        console.log('Successfully created blog post');
        setTitle('');
        setShortDescription('');
        setReadingTime('');
        setAuthor('');
        setThumbnail('');
        setTags('');
      } else {
        console.error('Failed to create blog post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="admin-page">
      <h2>Create Blog</h2>
      
      <label>
        Title:
        <input
          type="text"
          placeholder="Content title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      
      <label>
        Summary:
        <input
          type="text"
          placeholder="Describe short summary"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
        />
      </label>
      
      <label>
        Reading Time:
        <input
          type="text"
          placeholder="How much time will it take to finish reading? (In minutes)"
          value={readingTime}
          onChange={(e) => setReadingTime(e.target.value)}
        />
      </label>
      
      <label>
        Author:
        <input
          type="text"
          placeholder="Author name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>
      
      <label>
        Content:
      </label>
      <Markdown />
      <label>
        Blog Thumbnail:
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
      </label>
      
      <label>
        Tags:
        <input
          type="text"
          placeholder="Relevent tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </label>
      
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Home;
