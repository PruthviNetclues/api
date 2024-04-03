import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        // Initialize state for form data
        title: '',
        description: '',
        publish_year: '',
        quantity: '',
        author_name: '',
        genre_name: ''
    });
    console.log("Error");

    useEffect(() => {
        // Fetch book details based on book ID when component mounts
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3050/books/update/${id}`);
                const data = await response.json();
                // Set form data with fetched book details
                setFormData({
                    title: data.book_title,
                    description: data.book_description,
                    publish_year: data.book_publish_year,
                    quantity: data.book_quantity,
                    author_name: data.book_author,
                    genre_name: data.book_genre
                });
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [id]);

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
            const response = await fetch(`http://localhost:3050/books/update/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Navigate back to library page on successful update
                navigate("/");
            } else {
                console.error('Failed to update book');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center">Update Book Data</h1>
            <form onSubmit={handleSubmit}>
                {/* Form fields for updating book data */}
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
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default Update;