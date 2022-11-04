import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton } from "@mui/material";

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.setFavorites = this.props.setFavorites;
  }

  handleClick = async (e) => {
    e.preventDefault();

    if (e.target.textContent === "Download") {
      console.log("Download button clicked");
      // open downloadurl in new tab
      window.open(this.props.downloadurl, "_blank");
    }

    if (e.currentTarget.id === "addToList") {
      const selectedBook = this.props;
      console.log("selectedBook: ", selectedBook);
      console.log("Add to Reading List button clicked");
      const username = localStorage.getItem("username");
      console.log("found username: ", username);
      // add book to favorites
      // send post request to server
      const response = await fetch(`/db/users/favorites/${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // include book in request body
        body: JSON.stringify({
          book: selectedBook,
        }),
      });

      console.log("response: ", response);
      const data = await response.json();
      console.log("data: ", data);

      // change button text to 'Added to Reading List'
      e.target.textContent = "Added to Reading List";
    }
  };

  addFavorite = () => {
    if (this.props.favorite === "false") {
      return (
        <Button
          id="addToList"
          size="small"
          variant="text"
          onClick={this.handleClick}
        >
          Add To Reading List
        </Button>
      );
    } else {
      return (
        <Button
          id="removeFromList"
          className="removeFromList"
          size="small"
          variant="text"
          onClick={this.handleClick}
        >
          Remove From Reading List
        </Button>
      );
    }
  };

  render() {
    return (
      <Card
        className="book"
        sx={{
          maxHeight: 400,
          minHeight: 400,
          maxWidth: 345,
          boxShadow: 8,
          borderRadius: 2,
          backgroundColor: "#fffcf2",
        }}
      >
        <CardContent>
          <IconButton
            className="infoIcon"
            sx={{
              color: "#000000",
              position: "relative",
              top: -9,
              right: -154,
              height: 8,
            }}
            onClick={this.handleClick}
          >
            <InfoIcon />
          </IconButton>
          <Typography
            className="book-title"
            variant="h5"
            component="div"
            sx={{ height: 70, overflow: "auto" }}
          >
            {this.props.title}
          </Typography>
          <Typography
            className="author"
            sx={{ mb: 1.5, height: 30, overflow: "auto" }}
            color="text.secondary"
          >
            {this.props.author}
          </Typography>
          <Typography
            className="year"
            variant="body2"
            color="text.secondary"
            sx={{ height: 20 }}
          >
            <strong>Year: </strong>
            {this.props.year}
          </Typography>
          <Typography
            className="language"
            variant="body2"
            color="text.secondary"
            sx={{ height: 20 }}
          >
            <strong>Language: </strong>
            {this.props.language}
          </Typography>
          <Typography
            className="extension"
            variant="body2"
            color="text.secondary"
            sx={{ height: 20, marginBottom: 2 }}
          >
            <strong>Extension: </strong>
            {this.props.extension}
          </Typography>
          <Typography
            className="description"
            variant="body2"
            color="text.secondary"
            sx={{ overflow: "scroll", height: 130, textAlign: "left" }}
          >
            <strong>Description: </strong>
            {this.props.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            alignContent: "flex-end",
            alignItems: "flex-end",
            justifyContent: "space-between",
            position: "relative",
            top: -15,
          }}
        >
          <div>
            <Button size="small" variant="text" onClick={this.handleClick}>
              Download
            </Button>
          </div>
          <div>{this.addFavorite()}</div>
        </CardActions>
      </Card>
    );
  }
}

export default Book;
