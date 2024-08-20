import axios from 'axios';
import { useState } from 'react';
import './index.css';
import Markdown from '../../components/Markdown';

const Home = () => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [readingTime, setReadingTime] = useState('');
  const [author, setAuthor] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [markdown, setMarkdown] = useState('# Your Markdown Here'); 

  const handleTagAdd = () => {
    if (tagInput) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleSubmit = async () => {
    const readingTimeInt = parseInt(readingTime, 10);

    const postData = {
      title: title,
      summary: shortDescription,
      reading_time: readingTimeInt,
      thumbnail_url: thumbnail,
      tags: tags,
      content: markdown,
      author: author
    };
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/v1/blogs/', postData);
  
      if (response.status === 200 || response.status === 201) {
        console.log('Successfully created blog post');
        setTitle('');
        setShortDescription('');
        setReadingTime('');
        setAuthor('');
        setThumbnail('');
        setTags([]);
        setTagInput('');
        setMarkdown('# Your Markdown Here'); 
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
      <Markdown markdown={markdown} setMarkdown={setMarkdown} />
      
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
          placeholder="Add a tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        />
        <button type="button" onClick={handleTagAdd}>Add Tag</button>
        <div>
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </label>
      
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Home;
