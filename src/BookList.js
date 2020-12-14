import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';

function BookList(props) {
  console.log(props);
  const books = props.books.map((book) => {
    return (
      <Card key={book.id}>
        <Image src={book.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{book.title}</Card.Header>
          <Card.Description>{book.author}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Card.Description>Owner By:{book.user.fullname}</Card.Description>
        </Card.Content>        
        <Card.Content extra>
          <Button onClick={() => props.deleteBook(book.id)}>DeleteBook</Button>
          <Button onClick={() => props.openAndEdit(book)}>Edit Book</Button>
        </Card.Content>
      </Card>
    );
  });

  return <Card.Group>{books}</Card.Group>;
}

export default BookList;