import React, { Component } from 'react';

import BookList from './BookList';
import { Grid } from 'semantic-ui-react';

export default class BookContainer extends Component {
  render() {
    console.log(this.props.books.length);
    return (
      <div style={{ margin: "10px auto auto" }}>
        <div>
        <h2 class="ui header">{this.props.title}</h2>
        </div>

        <Grid columns={2} centered textAlign='center' style={{ height: '100%' }} verticalAlign='top' doubling >
          <Grid.Row>
            <Grid.Column>
              <BookList {...this.props} books={this.props.books} addBook={this.props.addBook} deleteBook={this.deleteBook} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

    )
  }
}
