import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

function BookDetail({
  bookId,
  removeBookFromReadingList,
  addBookToReadingList,
  toggleBookReadStatus,
  currentUser,
  deleteBook
}) {
  const [book, setBook] = useState(null)

  const fetchBookCallback = useCallback(() => {
    fetch(`/books/${bookId}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(book => setBook(book))
  }, [bookId])
  
  useEffect(() => {
    fetchBookCallback()
  }, [fetchBookCallback])

  const addOrRemoveButton = (book) => {
    if (book.user_book) {
      return (
        <>
          <button onClick={() => toggleBookReadStatus(book.id).then(() => fetchBookCallback())}>{book.user_book.read ? 'Mark Unread' : 'Mark Read'}</button>
          {" "}
          <button
            onClick={() => removeBookFromReadingList(book.id).then(() => fetchBookCallback())}
          >
            Remove from Reading List
          </button>
        </>
      )
    } else {
      return (
        <button
          onClick={() => addBookToReadingList(book.id).then(() => fetchBookCallback())}
        >
          Add to Reading List
        </button>
      )
    }
  }

  const editAndDeleteButtons = (book) => {
    if (currentUser.admin) {
      return (
        <span>
          --- {" "}
          <Link
            to={`/books/${book.id}/edit`}
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

  if(!book){ return <div></div>}
  
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{addOrRemoveButton(book)} {editAndDeleteButtons(book)}</p>
      <small>by {book.author}</small>
      <p>{book.description}</p>
      
      <h2>Readers</h2>
      <ul>
        {book.readers?.map(user => <li>{user.username}</li>)}
      </ul>
      <h2>Users who want to Read</h2>
      <ul>
        {book.users_who_want_to_read?.map((user) => <li>{user.username}</li>)}
      </ul>
    </div>
  )
  
}

export default BookDetail
