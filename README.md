# ABOUT

Just a simple app to search for free textbooks online.

- Currently relies on Libgen for the searches; however, goal would be to incorporate other sites offering similar services.

  - In its present implementation, it does find and return the fastest libgen domain to query for the search results.
  - A goal here would be to have the download button point to a direct download link for the book. Preferably from the fastest libgen domain.
  - Another goal would be to let users search for books by other fields, such as ISBN, publisher, year, etc.
    - An advanced search would be nice for user convenience.

- There is also some basic CRUD functionality and account management.

  - Work certainly needs to be done to make this more secure and robust.
  - The goal is to allow users to save books and keep a dynamic list of books they want to read.

- Would also like to incorporate cover art lookup for the books; however, time was limited.

  - The search does return Google Books IDs and OpenLibrary IDs for the books, so this should be possible.

- The app could also point users to the Goodreads page for the book, if it exists.

  - This would be a nice feature to have for users that want to know more about the book and see some reviews.

- Another goal would be to implement other pages for this site, such as viewing history, about us, etc.

  - This could be a great opportunity to explore SPAs in more depth.

- Were this to be a real site with actual users, it would be nice if users themselves were able to upload books to the site.
  - This would require some sort of moderation system to ensure that only legitimate books are uploaded.
