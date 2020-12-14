import React, { Component } from 'react';

import BookList from './BookList';
import { Grid } from 'semantic-ui-react';

class BookContainer extends Component {
  
  render(){
    console.log(this.props.books.length);
    return (
      <div style={{ margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", margin: "20px auto auto" }}> Book Shelf </h2>
      <Grid columns={2} divided textAlign='center' style={{ height: '100%' }} verticalAlign='top' stackable>
        <Grid.Row>
          <Grid.Column>
            <BookList books={this.props.books} deleteBook={this.deleteBook} openAndEdit={this.openAndEdit} />
          </Grid.Column>
          
         
        </Grid.Row>
      </Grid>
      </div>
      
    )
  }
}

export default BookContainer