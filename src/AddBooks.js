import React, { Component } from 'react'
import { Input, Menu, Segment } from 'semantic-ui-react'
import BookContainer from './BookContainer';
import axios from 'axios';

const searchBooks = (searchText, method) => {
    searchText = searchText.replace(/[^0-9a-zA-Z$-_.+!*'(),]+/g, '+');
    console.log({ searchText });

    return axios
        .get(`https://openlibrary.org/search.json?${method}=${searchText}&limit=20`)
        .then(res => {
            const newBooks = res.data.docs
                .filter(book => {
                    return (
                        book.hasOwnProperty('title') &&
                        book.hasOwnProperty('author_name') &&
                        book.hasOwnProperty('cover_edition_key')
                    );
                })
                .map(book => {
                    return {
                        title: book.title,
                        subtitle: book.subtitle || '',
                        author: book.author_name[0],
                        olid: book.cover_edition_key,
                        user: { fullname :''},
                        image: `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`,
                    };
                });
            console.log(newBooks);
            return newBooks;
        });
};

export default class AddBooks extends Component {
    state = {
        searchTerm: '',
        searchResults: [],
        searchMethod: 'q',
        searchMethodText: 'Keywords',
        loading: false,
    }

    handleItemClick = (e, { name }) => {
        console.log(name)
        this.setState({ searchMethodText: name })
    }

    handleSearchSubmit = () => {
        const { searchMethod } = this.state;
        const searchTerm = this.state.searchTerm;
        const searchMethodText = {
            q: 'Keywords',
            title: 'Title',
            author: 'Author',
        }[searchMethod];
        this.setState({ searchMethodText, loading: true });
        console.log(searchMethod);
        console.log(searchMethodText);
        console.log(searchTerm);
        searchBooks(this.state.searchTerm, searchMethod)
            .then(searchResults => {
                this.setState({ searchTerm, searchResults, loading: false });
            })
            .catch(err => console.error('error:', err));
    };

    handleInputChange = e => {
        console.log(e.target.value)
        this.setState({ searchTerm: e.target.value });
    };
    render() {
        const {
            searchTerm,
            searchResults,
            loading,
            searchMethod,
            searchMethodText,
            isAuthenticated,
        } = this.state;
        console.log(this.state, '<====In AddBooks')
        return (
            <div>
                <h3>Search to add books you own</h3>

                <Menu secondary>
                    <Menu.Item
                        name='Keywords'
                        active={searchMethodText === 'q'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Title'
                        active={searchMethodText === 'title'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Author'
                        active={searchMethodText === 'author'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Menu position='left' value={this.state.selectedItem} onChange={this.selectedItem}>
                        <Menu.Item>
                            <Input
                                action={{
                                    icon: 'search',
                                    onClick: () => this.handleSearchSubmit()
                                }}
                                defaultValue={this.state.searchTerm}
                                onChange={this.handleInputChange}
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Segment>
                    {loading && (
                        <div className="text-center">
                            <br />
                            <br />
                            <br />
                            <h4>Loading...</h4>
                        </div>
                    )}
                    {searchTerm && (
                        <div>
                            <br />
                            <br />
                            <h4>
                                Search by {searchMethodText}: {searchTerm}
                            </h4>
                            <br />
                            <br />
                            {searchResults.length === 0 ? (
                                <p>None found.</p>
                            ) : (<div>
                                    <BookContainer isAuthenticated={isAuthenticated} books={searchResults} addBook={this.props.addBook}/>;
                                </div>)}
                        </div>
                    )}
                </Segment>
            </div>

        )
    }
}

