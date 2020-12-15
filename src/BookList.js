import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';

function BookList(props) {
  console.log(props, '<=== Boolist');
  const books = props.books.map((book) => {
    return (
      <Card key={book.id}>
        <Image src={book.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{book.title}</Card.Header>
          <Card.Description>{book.author}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Card.Description>Owner:{book.user.fullname}</Card.Description>
        </Card.Content>     
        {props.isAuthenticated && (   
        <Card.Content extra>
          <Button onClick={() => props.deleteBook(book.id)}>DeleteBook</Button>
          <Button onClick={(e) => props.addBook(e, book)}>Add Book</Button>
        </Card.Content>
        )}
      </Card>
    );
  });

  return <Card.Group>{books}</Card.Group>;
}

export default BookList;