import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Library() {
    const [bookData, setBookData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3050/books')
            .then(response => response.json())
            .then(data => setBookData(data))
            .catch(err => console.log(err));
    }, []);

    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return (
                <>
                    {description.substring(0, maxLength)}
                    <span className="text-primary" data-bs-toggle="tooltip" title={description}>
                        ...more
                    </span>
                </>
            );
        }
        return description;
    };

    useEffect(() => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new window.bootstrap.Tooltip(tooltipTriggerEl);
        });
        return () => {
            tooltipList.forEach(tooltip => tooltip.dispose());
        };
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3050/books/delete/${id}`, {
                method: 'POST'
            });
            if (response.ok) {
                // Make sure to use the correct property for ID (book_id) if that's what your data structure uses
                setBookData(bookData.filter(book => book.book_id !== id));
                console.log(`Book with ID ${id} deleted successfully.`);
            } else {
                console.error('Failed to delete book');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1 className="text-center">Books Data</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Book Name</th>
                        <th>Description</th>
                        <th>Publish Year</th>
                        <th>Quantity</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookData.map((book, idx) => (
                        <tr key={idx}>
                            <td align="center">{idx + 1}</td>
                            <td>{book.book_title}</td>
                            <td>{truncateDescription(book.book_description, 50)}</td>
                            <td align="center">{book.book_publish_year}</td>
                            <td align="center">{book.book_quantity}</td>
                            <td>{book.book_author}</td>
                            <td>{book.book_genre}</td>
                            <td>
                                <Link to={`/update/${book.book_id}`} className="btn btn-primary me-2">Update</Link>
                                <button onClick={() => handleDelete(book.book_id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-center">
                <Link to="/insert" className="btn btn-primary">Insert Book</Link>
            </div>
        </div>
    );
}

export default Library;
