import React, { useState } from "react";
import Book from "./Book";

function FavoritesDisplay({ books }, favorites = [], setFavorites) {
  // map over books and return a Book component for each book
  function renderBooks() {
    // console.log("renderBooks() called with input of: ", { books });
    if (books) {
      return books.map((book) => {
        return (
          <Book
            title={book.title}
            author={book.author}
            year={book.year}
            language={book.language}
            extension={book.extension}
            key={book.md5}
            downloadurl={book.downloadurl}
            google_id={book.google_id}
            openlib_id={book.openlib_id}
            description={book.description}
            favorite="true"
            className="book"
            sx={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              overflow: "auto",
            }}
          />
        );
      });
    }
  }

  return <div className="booksContainer">{renderBooks()}</div>;
}

export default FavoritesDisplay;
