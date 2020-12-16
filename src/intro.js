import React from 'react';

import { Header, Image, Segment } from 'semantic-ui-react';

const Intro = () => (
  <div>

    <Segment  color="grey" >
   
      <Header component='h1' emphasis='block'>Book Shelf
      <Image src="BookShelf.png" />    

      </Header>
      <p></p>
      <Header component='h3'>An app for sharing books with your friends</Header>
      <Header component='h4'>The books listed below are available to trade. </Header>
      <Header component='h4'> Log in above to add your own books!</Header>

      <br />

    </Segment>
  </div>
);

export default Intro;