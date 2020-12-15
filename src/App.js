/**
 * Main React App
 */
import React, { Component } from 'react';
import './App.css';
import BookContainer from './BookContainer';
import axios from 'axios';

import Login from './LoginForm';
import Navigation from './Nav.js';
import Intro from './intro.js';
import AddBooks from './AddBooks';

// Routes
import { Redirect, Route } from 'react-router-dom';

const BOOK_ID_LENGTH = 5;
const BOOK_ID_CHAR =
  'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz123456789';

const generateRandomId = (length, characters) => {
  return Array.from({ length })
    .map(() => characters[Math.floor(Math.random() * characters.length)])
    .join('');
};

export default class App extends Component {

  state = {
    currentUser: null,
    redirect: null,
    userId: null,
    fullName: '',
    books: [],
    alertMessage: '',
  }


  componentDidMount() {
    console.log(`VAISHALI MOUNT ${this.state.userId}`);
    this.getBooksByAPI(this.state.userId);
  }


  //Login User http://localhost:8000/api/login
  handleSubmit = async (e, currentUser) => {
    e.preventDefault();
    console.log(currentUser)
    try {
      const user = await axios.post(
        process.env.REACT_APP_FLASK_API_URL + '/api/login',
        currentUser
      );
      console.log(user.data.data, ' this is response');
      this.setState({
        currentUser: user.data.data,
        userId: user.data.data.id,
        fullName: user.data.data.fullname,
        books: [],
        redirect: '/',
      });
      console.log(user.data.data, '<=== this is response');
      this.getBooksByAPI(user.data.data.id);
    } catch (err) {
      console.log('error', err);
    }
  }


  addBook = async (e, newBook) => {
    e.preventDefault();
    console.log(newBook);
    const moreProps = {
      book_id: generateRandomId(BOOK_ID_LENGTH, BOOK_ID_CHAR),
      user_id: this.state.userId,
      requested_by: [],
      lend_to: null,
      user: this.state.currentUser,
    };
    newBook = { ...newBook, ...moreProps };
    console.log({ newBook });
    try {
      // The createdDogResponse variable will store the response from the Flask API
      const createdBookResponse = await axios.post(
        process.env.REACT_APP_FLASK_API_URL + '/api/books/',
        newBook
      );

      console.log(createdBookResponse.data.data, ' this is response');
      this.setState({
        books: [...this.state.books, createdBookResponse.data.data],
      });
    } catch (err) {
      console.log('error', err);
    }

  };

  getBooksByAPI = async (userId) => {
    console.log(`In getBooks ${userId}`);
    let API = '';
    /* if (!userId)
       API = process.env.REACT_APP_FLASK_API_URL + '/api/books/'
     else {
       API = process.env.REACT_APP_FLASK_API_URL + `/api/mybooks/user/${userId}`;
     }*/
    API = process.env.REACT_APP_FLASK_API_URL + '/api/books/'
    try {
      console.log(API);
      const parsedBooks = await axios(API);
      console.log(parsedBooks.data.data);
      const parsedBooksImg = parsedBooks.data.data.map((book) => {
        const image = `https://covers.openlibrary.org/b/olid/${book.olid}-M.jpg`;
        return { ...book, image };
      });
      console.log(parsedBooksImg);
      await this.setState({
        books: parsedBooksImg,
      });
    } catch (err) {
      console.log(err);
    }
  };


  render() {
    const { router } = this.props;
    const {
      alertMessage,
      books,
      userId,
      currentUser,
      fullName
    } = this.state;

    const displayName = fullName;
    const isAuthenticated = (userId && userId !== '')
    console.log('IsAuthenticated', isAuthenticated)
    console.log(this.state)
    console.log(fullName)
    const myBooks = books.filter(b => b.user.id === userId);
    console.log(myBooks, '<== mybooks');
    return (
      <>
        <div className='App'>
          <Navigation {...{ router, isAuthenticated, fullName }}
          />
          <div className="container">
            <Route path='/' exact render={(props) => {

              const availableBooks = books
                .filter(b => !b.lent_to)
                .filter(b => b.user.userId !== userId);
              return (
                <div>
                  {!isAuthenticated && <Intro />}
                  {availableBooks.length === 0 ? (
                    <div className="text-center">
                      <br />
                      <p>
                        Sorry, no books are currently available for you to
                        borrow.
                      </p>
                      <p>Ask your friends to join and add their books!</p>
                    </div>
                  ) : (
                      <div>
                        <h3>Books currently available</h3>
                        <br />
                        <BookContainer isAuthenticated={isAuthenticated} books={availableBooks} />;
                      </div>
                    )}
                </div>
              );
            }}
            />

            <Route path='/home' render={(props) => {
              return <BookContainer isAuthenticated={isAuthenticated} books={this.state.books} />;
            }} />

            <Route path='/mybooks' exact {...{ isAuthenticated }} render={(props) => {
             
              const myUnlentBooks = myBooks.filter(b => !b.lent_to);
              console.log(myUnlentBooks, '<==Unlent');

              const myLentBooks = myBooks.filter(b => b.lent_to);
              console.log(myLentBooks, '<==lent');

              const requestedBooks = books.filter(
              b => b.requested_by && b.requested_by.filter(r => r === userId).length);

              console.log(requestedBooks, '<==Request');
              const booksBorrowed = books.filter(
                b => b.lent_to && b.lent_to.userId === userId
              );
              console.log(booksBorrowed, '<==Borrowed');
              return (
                <div>
                  <h3>My Books (On Shelf)</h3>
                  <br />
                  {myUnlentBooks.length === 0 ? (
                    <div className="text-center">
                      <p>No books here</p>
                    </div>
                  ) : (
                      <BookContainer isAuthenticated={isAuthenticated} books={myUnlentBooks} />
                    )}
                  <hr />
                  <h3>Books I have Borrowed</h3>
                  <br />
                  {booksBorrowed.length === 0 ? (
                    <div className="text-center">
                      <p>No books here</p>
                    </div>
                  ) : (
                      <BookContainer isAuthenticated={isAuthenticated} books={booksBorrowed} />

                    )}
                  <hr />
                  <h3>My Books (Lent Out)</h3>
                  <br />
                  {myLentBooks.length === 0 ? (
                    <div className="text-center">
                      <p>No books here</p>
                    </div>
                  ) : (
                      <BookContainer isAuthenticated={isAuthenticated} books={myLentBooks} />


                    )}
                  <hr />
                  <h3>Books I have Requested</h3>
                  <br />
                  {requestedBooks.length === 0 ? (
                    <div className="text-center">
                      <p>No books here</p>
                    </div>
                  ) : (
                      <BookContainer isAuthenticated={isAuthenticated} books={requestedBooks} />

                    )}
                </div>
              );
            }}
            />

            <Route path='/login' exact render={(props) => {
              console.log('I am here login');
              if (this.state.redirect) {
                return <Redirect to={this.state.redirect} />

              } else {
                return <Login {...props}
                  onSubmit={this.handleSubmit} />;
              }
            }} />

            <Route path='/addbooks' exact {...{ isAuthenticated }} render={(props) => {
              return <AddBooks {...this.state} isAuthenticated={isAuthenticated} addBook={this.addBook} openAndEdit={this.openAndEdit} />;
            }} />

          </div>
        </div>
      </>


    );
  }
};


