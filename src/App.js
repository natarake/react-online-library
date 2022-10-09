import { useState } from "react";
import "./App.css";
import axios from "axios";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardLink,
} from "reactstrap";
import SearchIcon from "@mui/icons-material/Search";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

function App() {
  const [result, setResult] = useState([]);
  const [book, setBook] = useState("");

  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }

  function handleKeyPress(event) {
    event.preventDefault();
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          "&key=AIzaSyD2MwD49Qj5xQ4_VFiBh3KD3llkWvQzeDw&maxResults=40"
      )
      .then((data) => {
        console.log(data.data.items);
        setResult(data.data.items);
      });
  }

  return (
    <div className="app">
      <div className="titleContainer">
        <LocalLibraryIcon className="titleIcon" />
        <h1>WD20P Online Library in ReactJS</h1>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Type here to search for books then click search icon..."
          onChange={handleChange}
        />
        <SearchIcon className="searchIcon" onClick={handleKeyPress} />
      </div>

      {result?.length > 0 ? (
        <div className="container">
          {result.map((book) => (
            <Card className="card" key={book.id}>
              <img
                alt="Sample"
                src={
                  book.volumeInfo.imageLinks !== undefined
                    ? book.volumeInfo.imageLinks.thumbnail
                    : ""
                }
                className="cardImage"
              />
              <CardBody className="cardBody">
                <CardTitle className="cardTitle" tag="h4">
                  {book.volumeInfo.title !== undefined ? book.volumeInfo.title.substring(0,15) + "..." : ""}
                </CardTitle>
                <CardSubtitle className="cardSubtitle" tag="h5">
                  {book.volumeInfo.printType}
                </CardSubtitle>
                <CardText>
                  {book.volumeInfo.description !== undefined
                    ? book.volumeInfo.description.substring(0, 100) + "..."
                    : ""}
                </CardText>
                <CardLink href={book.volumeInfo.previewLink} className="button">
                  View Details
                </CardLink>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No books found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
