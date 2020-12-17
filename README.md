# BookShelf Flask-React-Postgres Application
An online application to share/trade books with your friends.

This project was bootstrapped with [React](https://bookshelf-react-frontend.herokuapp.com/).

## Project Links
- [Github Front](https://github.com/vdighe/bookshelf-react-frontend)
- [Github Back](https://github.com/vdighe/bookshelf-flash-backend)
- [heroku Front](https://bookshelf-react-frontend.herokuapp.com/)

In the project directory, you can run:

### Wireframes and Design
[WireFrames and Models](https://docs.google.com/document/d/147S4EXOjJ_aby2uwk69nqPxmaz-VdqFZR2SNrbis5e0/edit?usp=sharing)

### Design Concept
- Developed the user stories and used for developing the backend first.
- Designed the models (Tables and the relationships).
- Started with the wireframes and then worked to develop the component hierarchy.
- The React routes were decided and the component states.

#### Components: 
- App
    - Nav
    - Books
        - BookList
    - MyBooks
    - AddBooks
    - Login
    - Register
#### MVP
- The functionality of the application is based on CRUD models. The landing page should show the books available on the shelf. The login form allows the user to access its own Bookshelf for CRUD operations. A Register page is there to allow new friends to join the app.
- The API for accessing new books[Open Library](https://openlibrary.org/) 

#### User Stories
- User Stories for BookShelf MVP:
- User should be able to register/login to the application.
- User should be able to create his/her own bookshelf.
- User should be able to add/delete books to his/her own bookshelf.
- User should be able to see all the books from the bookshelf.
- User should be able to lend a book from his own bookshelf
- User should be able to request a book from the bookshelf
- User should be able to return the book back to the bookshelf and his/her own.

### Getting Started.
This project is a full-stack application with
- Frontend with React 
    - React with Routes
    - CSS
    - Semantic-UI-React
    - Javascipt
    - Axios
- Backend with flask and PostgreSQL
    - PeeWee for ORM
    - Python3
    - Flask
    - Axios
    - BluePrint
    
#### BookShelf Site Pictures

### Author 
*Vaishali Dighe-Phanse*

### Issues, Resolutions and Future Enhancements
##### Due to lack of time, the  update/edit feature of the book model was only implmented at the backend. Ideally, one should be able to come up with such functionality through the frontend. Also, another option for registration can be via social media accout.
