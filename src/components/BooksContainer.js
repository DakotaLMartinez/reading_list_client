import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import BooksList from './BooksList'
import BookDetail from './BookDetail'

function BooksContainer() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/books")
      .then(res => res.json())
      .then(books => setBooks(books))
  }, [])


  const removeBookFromReadingList = (bookId) => {
    let userBookId = books.find(book => book.id === bookId).user_book.id
    return fetch(`/user_books/${userBookId}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          const updatedBooks = books.map(book => {
            if (book.id === bookId) {
              return {
                ...book,
                user_book: undefined
              }
            } else {
              return book
            }
          })
          setBooks(updatedBooks)
        }
      })
  }

  const addBookToReadingList = (bookId) => {
    return fetch('/user_books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        book_id: bookId
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return res.json().then(errors => Promise.reject(errors))
        }
      })
      .then(userBook => {
        const updatedBooks = books.map(book => {
          if (book.id === bookId) {
            return {
              ...book,
              user_book: userBook
            }
          } else {
            return book
          }
        })
        setBooks(updatedBooks)
      })
  }

  const createBook = (formData) => {
    return fetch("/books", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return res.json().then(errors => Promise.reject(errors))
        }
      })
      .then(book => {
        setBooks(books.concat(book))
      })
  }

  const toggleBookReadStatus = (bookId) => {
    const userBook = books.find(book => book.id === bookId).user_book
    const body = {read: !userBook.read}
    return fetch(`/user_books/${userBook.id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => {
        if (res.ok) {
          return res.json().then(userBook => {
            const updatedBooks = books.map(book => {
              if (book.id === bookId) {
                return {
                  ...book,
                  user_book: userBook
                }
              } else {
                return book
              }
            })
            setBooks(updatedBooks)
          })
        } else {
          return res.json().then(errors => console.error(errors))
        }
      })
  }

  return (
    <div>
      <Switch>
        <Route
          exact
          path="/books"
        >
          <BooksList
            books={books}
            removeBookFromReadingList={removeBookFromReadingList}
            addBookToReadingList={addBookToReadingList}
            createBook={createBook}
          />
        </Route>
        <Route
          exact
          path="/books/:id"
          render={({ match }) => {
            return (
              <BookDetail
                bookId={match.params.id}
                removeBookFromReadingList={removeBookFromReadingList}
                addBookToReadingList={addBookToReadingList}
                toggleBookReadStatus={toggleBookReadStatus}
              />
            )
          }}
        />
      </Switch>
    </div>
  )
}

export default BooksContainer