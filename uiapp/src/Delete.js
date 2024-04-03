import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Delte() {
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
            
        </div>
    );
}

export default Delte;