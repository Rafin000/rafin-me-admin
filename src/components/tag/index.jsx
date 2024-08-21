/* eslint-disable react/prop-types */
import './index.css'; 

const Tags = ({tags, onDelete}) => {
  return (
    <div>
        <div className="tag-list">
            {tags.length > 0 ? (
                tags.map((tag, index) => (
                    <div key={index} className='tag-container'>
                        <span key={index} className="tag">
                            {tag}
                        </span>
                        <button onClick={() => onDelete(tag)}><i className="fa-solid fa-xmark"></i></button>
                    </div> 
                ))
            ) : (
                ' '
            )}
        </div>
    </div>
  );
};

export default Tags;
