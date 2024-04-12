import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Home.css"; // Import your CSS file for styles

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Define the function to fetch data from the backend using axios
        const fetchBooks = async () => {
            try {
                // Make a POST request to the Flask backend using axios
                const response = await axios.post('http://localhost:8081/', {}, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                // Check if the response status is OK (200)
                if (response.status === 200) {
                    // Transform the data into an array of objects
                    const transformData = (data) => {
                        // Create an array to hold the transformed data
                        const transformedData = [];

                        // Iterate over the length of the arrays (assuming all arrays have the same length)
                        for (let i = 0; i < data.author.length; i++) {
                            // Create a book object and push it to the transformedData array
                            const book = {
                                author: data.author[i],
                                book_name: data.book_name[i],
                                image: data.image[i],
                                rating: data.rating[i],
                                votes: data.votes[i],
                            };
                            transformedData.push(book);
                        }

                        return transformedData;
                    };

                    // Transform the data and update the state with the transformed data
                    const data = response.data;
                    const transformedBooks = transformData(data);
                    setBooks(transformedBooks);
                } else {
                    console.error('Failed to fetch books:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        // Call the function to fetch data
        fetchBooks();
    }, []);

    // Render the component
    return (
        <div>
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand">BookWise</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/recommend">Recommend</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="title">Top 50 Books</h1>
                    </div>

                    {books.map((book, index) => (
                        <div className="col-md-2" key={index}>
                            <div className="card">
                                <img
                                    className="card-img-top"
                                    src={book.image}
                                    alt={`${book.book_name} cover`}
                                />
                                <div className="card-body">
                                    <p className="book-title">{book.book_name}</p>
                                    <p className="author">{book.author}</p>
                                    <p className="votes">Votes - {book.votes}</p>
                                    <p className="rating">Rating - {book.rating}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
