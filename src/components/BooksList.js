import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function BooksList({ currentUser, books, removeBookFromReadingList, addBookToReadingList, createBook, deleteBook }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')

  const addOrRemoveButton = (book) => {
    if (book.user_book) {
      return <button onClick={() => removeBookFromReadingList(book.id)}>Remove from Reading List</button>
    } else {
      return <button onClick={() => addBookToReadingList(book.id)}>Add to Reading List</button>
    }
  }

  const editAndDeleteButtons = (book) => {
    if (currentUser.admin) {
      return (
        <span>
          --- {" "}
          <Link
            to={`books/${book.id}/edit`}
          >
            <button>Edit Book</button>
          </Link>
          {" "}
          <button
            onClick={() => deleteBook(book.id)}
          >
            Delete Book
          </button>
        </span>
      )
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createBook({title, author, description})
  }
  
  return (
    <div>
      <h1>Books</h1>
      {books.map(book => (
        <p><Link to={`books/${book.id}`}>{book.title}</Link> --- {addOrRemoveButton(book)} {editAndDeleteButtons(book)}</p>
      ))}
      <h3>Add Book</h3>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">Title </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
          />
        </p>
        <p>
          <label htmlFor="author"> Author </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            name="author"
          />
          </p>
        <p>
          <label htmlFor="description"> Description </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
          />
        </p>
        {" "}<button type="submit">Add Book</button>
      </form>
    </div>
  )
}

export default BooksList
