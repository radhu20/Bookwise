import { useState } from "react";
import axios from "axios";
import '../css/Recommend.css'; // Import your CSS file for styles

const Recommend = () => {
    const [userInput, setUserInput] = useState('');
    const [books, setBooks] = useState([]);

    // Handle changes in the input field
    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Convert user input to JSON format
            const requestData = JSON.stringify({ user_input: userInput });

            // Use Axios to send a POST request to the backend at http://localhost:8081/recommend_books
            const response = await axios.post('http://localhost:8081/recommend_books', requestData, {
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
            });

            // Map the response data to an array of objects
            const mappedData = response.data.book_name.map((name, index) => ({
                book_name: name,
                author: response.data.author[index],
                image: response.data.image[index],
            }));

            // Set the books state with the mapped data
            setBooks(mappedData);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert("Input is Wrong")
        }
    };

    return (
        <div>
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand">BookWise</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li><a href="/">Home</a></li>
                        <li><a href="/recommend">Recommend</a></li>
                    </ul>
                </div>
            </nav>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-white" style={{ fontSize: '50px' }}>Recommend Books</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                name="user_input"
                                type="text"
                                className="form-control"
                                value={userInput}
                                onChange={handleInputChange}
                            /><br />
                            <input type="submit" className="btn btn-lg btn-warning" value="Submit" />
                        </form>
                    </div>

                    {books.map((book, index) => (
                        <div key={index} className="col-md-3" style={{ marginTop: '50px' }}>
                            <div className="card">
                                <div className="card-body">
                                    <img className="card-img-top" src={book.image} alt={book.book_name} />
                                    <p className="text-white">{book.book_name}</p>
                                    <h4 className="text-white">{book.author}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Recommend;
