import React, { useState, useEffect } from 'react'

function BookEdit({ book, updateBook }) {
  const [title, setTitle] = useState(book?.title)
  const [author, setAuthor] = useState(book?.author)
  const [description, setDescription] = useState(book?.description)

  useEffect(() => {
    setTitle(book?.title)
    setAuthor(book?.author)
    setDescription(book?.description)
  },[book])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateBook(book.id, {
      title,
      author,
      description
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit {book?.title}</h1>
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
      {" "}<button type="submit">Update Book</button>
    </form>
  )
}

export default BookEdit
