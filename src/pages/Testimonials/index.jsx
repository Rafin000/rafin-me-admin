import { useEffect, useState } from 'react';
import './index.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    content: '',
    designation: '',
    company: ''
  });
  const [addForm, setAddForm] = useState({
    name: '',
    content: '',
    designation: '',
    company: '',
    user_id: '312b9d52-d0a2-476c-81be-88566b7b600b'
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/v1/testimonials')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTestimonials(data.data || []);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleEditClick = (testimonial) => {
    setEditingId(testimonial.id);
    setEditForm({
      name: testimonial.name,
      content: testimonial.content,
      designation: testimonial.designation || '',
      company: testimonial.company || ''
    });
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingId) {
      setEditForm(prevForm => ({ ...prevForm, [name]: value }));
    } else {
      setAddForm(prevForm => ({ ...prevForm, [name]: value }));
    }
  };

  const handleSaveClick = () => {
    fetch(`http://127.0.0.1:5000/api/v1/testimonials/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        setTestimonials(prevTestimonials =>
          prevTestimonials.map(testimonial =>
            testimonial.id === editingId ? { ...testimonial, ...editForm } : testimonial
          )
        );
        setEditingId(null);
      })
      .catch(error => {
        setError(error);
      });
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleAddSaveClick = () => {
    fetch('http://127.0.0.1:5000/api/v1/testimonials/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addForm)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTestimonials(prevTestimonials => [...prevTestimonials, data.data]);
        setAddForm({
          name: '',
          content: '',
          designation: '',
          company: ''
        });
        setIsAdding(false);
      })
      .catch(error => {
        setError(error);
      });
  };

  const handleDeleteClick = (id) => {
    fetch(`http://127.0.0.1:5000/api/v1/testimonials/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        setTestimonials(prevTestimonials =>
          prevTestimonials.filter(testimonial => testimonial.id !== id)
        );
      })
      .catch(error => {
        setError(error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='testimonials-section'>
      <h1>Testimonials</h1>
      <button onClick={handleAddClick}>Add Testimonial</button>
      {isAdding && (
        <div className='edit-form'>
          <input
            type='text'
            name='name'
            value={addForm.name}
            onChange={handleInputChange}
            placeholder='Name'
          />
          <textarea
            name='content'
            value={addForm.content}
            onChange={handleInputChange}
            placeholder='Content'
          />
          <input
            type='text'
            name='designation'
            value={addForm.designation}
            onChange={handleInputChange}
            placeholder='Designation'
          />
          <input
            type='text'
            name='company'
            value={addForm.company}
            onChange={handleInputChange}
            placeholder='Company'
          />
          <button onClick={handleAddSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      )}
      <div className='testimonials'>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className='testimonial'>
            {editingId === testimonial.id ? (
              <div className='edit-form'>
                <input
                  type='text'
                  name='name'
                  value={editForm.name}
                  onChange={handleInputChange}
                  placeholder='Name'
                />
                <textarea
                  name='content'
                  value={editForm.content}
                  onChange={handleInputChange}
                  placeholder='Content'
                />
                <input
                  type='text'
                  name='designation'
                  value={editForm.designation}
                  onChange={handleInputChange}
                  placeholder='Designation'
                />
                <input
                  type='text'
                  name='company'
                  value={editForm.company}
                  onChange={handleInputChange}
                  placeholder='Company'
                />
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            ) : (
              <div className='testimonial-content'>
                <h3>{testimonial.name}</h3>
                <p>{testimonial.content}</p>
                <p>{testimonial.designation || ''}</p>
                <p>{testimonial.company || ''}</p>
                <button onClick={() => handleEditClick(testimonial)}>Edit</button>
                <button onClick={() => handleDeleteClick(testimonial.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
