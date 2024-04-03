import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Insert() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        publish_year: '',
        quantity: '',
        author_name: '',
        genre_name: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3050/books/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data); // You can handle the response accordingly
            // Reset the form fields after successful submission
            setFormData({
                title: '',
                description: '',
                publish_year: '',
                quantity: '',
                author_name: '',
                genre_name: ''
            });
            navigate("/");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center">Insert Book Data</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="publish_year" className="form-label">Publish Year</label>
                    <input type="number" className="form-control" id="publish_year" name="publish_year" value={formData.publish_year} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <input type="number" className="form-control" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="author_name" className="form-label">Book Author</label>
                    <input type="text" className="form-control" id="author_name" name="author_name" value={formData.author_name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="genre_name" className="form-label">Book Genre</label>
                    <input type="text" className="form-control" id="genre_name" name="genre_name" value={formData.genre_name} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
            <div className="text-center">
                <Link to="/" className="btn btn-primary">View Books</Link>
            </div>
        </div>
    );
}

export default Insert;