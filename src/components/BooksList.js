import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function BooksList({ books, removeBookFromReadingList, addBookToReadingList, createBook }) {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    createBook({title, author, description})
  }
  
  return (
    <div>
      <h1>Books</h1>
      {books.map(book => (
        <p><Link to={`books/${book.id}`}>{book.title}</Link> --- {addOrRemoveButton(book)}</p>
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
