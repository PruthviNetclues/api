import React, { useState } from 'react';

function Insert() {
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
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center">Insert Book Data</h1>
            <form onSubmit={handleSubmit}>
                {/* Form fields for book data */}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                {/* Other form fields for description, publish_year, quantity, author_name, genre_name */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Insert;
