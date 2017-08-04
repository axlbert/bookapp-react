import React, { Component } from 'react';
import './App.css';
import ShelfList from './booklist'
import * as BooksAPI from './BooksAPI'
import { BrowserRouter, Route } from 'react-router-dom'
import SearchBook from './searchBook'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


/*import PropTypes from 'prop-types' */
/* this requires controlled components to be understood */
/* https://facebook.github.io/react/docs/forms.html#why-select-value */



/* .filter(bookElem => bookElem === element) */
class App extends Component {
  constructor(props) {
    super(props);
    this.handleListChange = this.handleListChange.bind(this);
    this.findBookInList = this.findBookInList.bind(this);
    /* this.removebook is not required to be bound ? still works without the above style */

    this.state = {
      books : [],
      query : '' , 
      searchResults : []
    };

  }
  getBooks = () => {
    BooksAPI.getAll().then(books => this.setState({books}))
  }


  /* passing in query for search */
  updateQuery = (query) => {
   /* if (query.length > 2) { */
    query = query.trim()
    BooksAPI.search(query,10).then( (results) => {

      try {
      results.map((b) => {
        b.shelf = 'none'
      })

      for (const book of this.state.books) {
        results.map((b) => {
          if (book.id === b.id) {
            b.shelf = book.shelf
          }
        })
      }

      this.setState({
       query: query,
       searchResults: results,
      })
     }
     catch(err) {
      this.setState({
       query: query.trim(),
       searchResults: [],
      })


      } 
    })
   
  }


  /* setting the query to an empty string */
  resetQuery = (query) => {
    this.setState({ query: '' })
  }

  resetSearch = () => {
    this.setState({ searchResults: [],
                    query: '' 
       })
  }

  /* lifecyle event for the api request */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  /* deleting a book from a shelf */
  /* endpoint not provided by API - not implemented further */
  removeBook = (book) => {
    this.setState((state) => ({
      books : this.state.books.filter((c) => c.id !== book.id)
    }))
    /* this helps to also remove book from DB*/
    BooksAPI.update(book, 'none')
  }


 

  /* helper function for book list changes */
  findBookInList(id) {
    return this.state.books.findIndex(book => book.id === id);
    
  };


  /* moving books between different shelves */
  handleListChange(book, shelf) {

    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState((state) => ({
        books : state.books.filter((c) => c.id !== book.id).concat([book]),
        /* I prefer to have the move disappear from the search page once they are selected for reading, but some reviewers 
        flagged this as a bug !?  There I will uncomment this part for now */
      /*  searchResults: state.searchResults.filter((c) => c.id !== book.id). */
      }))  
    })

    this.resetQuery();

  }

  render() {
      let showingBooks
      /* matching of book query*/
      if (this.state.query) {
          /* escape special characters and use them as string literal regardless of case */
        const match = new RegExp(escapeRegExp(this.state.query), 'i')
        showingBooks = this.state.books.filter((book) => match.test(book.title))
        } else {
          showingBooks = this.state.books
        }

       /*this is alphabetizing book titles */
      showingBooks.sort(sortBy('title'));

    return (
      <BrowserRouter>
      <div className="App">
        <Route exact path="/search" render={() => (
            
            <SearchBook getBooks={this.getBooks} query={this.state.query} updateQuery={this.updateQuery} books={this.state.searchResults} handleListChange={this.handleListChange}  clearQuery={this.resetQuery}/>
            
          )}
        />
        {/* Using Route allows to use the back/forth buttons in the browser. Use "exact" to only render where path*/}
        <Route exact path="/" render={() => (
            <ShelfList books={this.state.books} showingBooks={showingBooks} handleListChange={this.handleListChange} onDeleteBook={this.removeBook} clearQuery={this.resetSearch}/>
          )}
        />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
