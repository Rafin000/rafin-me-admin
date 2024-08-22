/* eslint-disable react/prop-types */
import './index.css';

const Testimonial = ({ testimonial, onEdit, onDelete }) => {
  return (
    <div className="testimonial">
      <h2>{testimonial.name}</h2>
      <p>{testimonial.content}</p>
      <p><strong>{testimonial.designation}</strong> at {testimonial.company}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Testimonial;
