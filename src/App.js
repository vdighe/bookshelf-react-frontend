/**
 * Main React App
 */
import React, { Component } from 'react';
import './App.css';
import BookContainer from './BookContainer';
import axios from 'axios';
import CreateBookForm from './CreateBookForm';
import Login from './LoginForm';
import { isLoggedIn } from './auth.js';
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
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      userId: null,
      fullName: '',
      books: [],
      myBooks: [],
      alertMessage: '',
    }
  }

  componentDidMount() {
    console.log(`VAISHALI MOUNT ${this.state.userId}`);
    if (this.state.userId) {
      this.setState({
        books: []
      })
    }
    this.getBooksByAPI(this.state.userId);

  }
  /*
    getBooks = () => {
      console.log('Get All Books');
      this.getBooksByAPI(null);
  
    };*/
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
        userId: user.data.data.id,
        books: [],
        redirect: '/myhome',
      });
      console.log(user.data.data.id, ' this is response');
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
    };
    newBook = { ...newBook, ...moreProps };
    console.log({ newBook });
    try {
      // The createdDogResponse variable will store the response from the Flask API
      const createdBookResponse = await axios.post(
        process.env.REACT_APP_FLASK_API_URL + '/api/books/',
        newBook
      );

      // we are emptying all the dogs that are living in state into a new array,
      // and then adding the dog we just created to the end of it
      // the new dog which is called parsedResponse.data

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
    if (!userId)
      API = process.env.REACT_APP_FLASK_API_URL + '/api/books/'
    else {
      API = process.env.REACT_APP_FLASK_API_URL + `/api/mybooks/user/${userId}`;

    }
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
      fullName
    } = this.state;

    const displayName = fullName;
    const isAuthenticated = (userId && userId !== '')
    console.log('IsAuthenticated', isAuthenticated)
    return (
      <>
        <div className='App'>
          <Navigation {...{ router, isAuthenticated, displayName }}
          />

          <div className="container">

            <Route path='/' exact render={(props) => {
              return (
                <div>
                  {!isAuthenticated && <Intro />}
                  {books.length === 0 ? (
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

                      </div>
                    )}
                </div>
              );
            }}
            />

            <Route path='/home' render={(props) => {
              return <BookContainer books={this.state.books} />;
            }} />

            <Route path='/mybooks' render={(props) => {
              console.log('Under myhome');
              return <BookContainer books={this.state.books} />;
            }} />

            <Route path='/login' exact render={(props) => {
              console.log('I am here login');
              if (this.state.redirect) {
                return <Redirect to={this.state.redirect} />

              } else {
                return <Login {...props}
                  onSubmit={this.handleSubmit} />;
              }
            }} />


            <Route path='/addbooks' exact {...{isAuthenticated }} render={(props) => {
              return <AddBooks />;
            }} />

          </div>
        </div>
      </>


    );
  }
};


