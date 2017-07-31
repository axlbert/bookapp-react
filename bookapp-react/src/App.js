import React, { Component } from 'react';
import './App.css';
import ShelfList from './booklist'
import * as BooksAPI from './BooksAPI'
import { BrowserRouter, Route } from 'react-router-dom'
import {Link} from 'react-router-dom'
import SearchBook from './searchBook'
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
      books : []
    };
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
      books : this.state.books.filter((c) => c.title !== book.title)
    }))
    /* this helps to also remove book from DB*/
    BooksAPI.remove(book.id);
  }


 

  /* helper function for book list changes */
  findBookInList(id) {
    return this.state.books.findIndex(book => book.id === id);
    
  };


  /* moving books between different shelves */
  handleListChange(entry, shelf) {
    const bookIndex = this.findBookInList(entry.id);
    console.log(entry)
    console.log('You just selected:' + entry.title + "to be moved to " + shelf);
    if (bookIndex !== -1) {
      this.setState(state => {
        state.books[bookIndex].shelf = shelf;
        return state;
      })
    }
    BooksAPI.update(entry, shelf);
  }
   
  


   

  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Route path="/search" render={() => (
            <SearchBook />
          )}
        />
        {/* Using Route allows to use the back/forth buttons in the browser. Use "exact" to only render where path*/}
        <Route path="/" render={() => (
            <ShelfList books={this.state.books} showingBooks={this.state.showingBooks} handleListChange={this.handleListChange} onDeleteBook={this.removeBook}/>
          )}
        />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
