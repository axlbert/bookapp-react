import React, { Component } from 'react';
import './App.css';
import ShelfList from './booklist'
/*import PropTypes from 'prop-types' */
/* this requires controlled components to be understood */
/* https://facebook.github.io/react/docs/forms.html#why-select-value */



/* .filter(bookElem => bookElem === element) */
class App extends Component {
  constructor(props) {
    super(props);
    this.handleListChange = this.handleListChange.bind(this);
    this.findBookInList = this.findBookInList.bind(this);

    this.state = {
      books : [
{ id: 1, title: 'henry potter', rating: 'awesome', shelf: 'currentlyReading'},
 {id: 2, title: 'lord of the things', rating: 'awesome', shelf: 'currentlyReading'},
 {id: 3, title: 'charlotte array', rating: 'mediocre', shelf: 'currentlyReading'},
 {id: 4, title: 'dawnlight', rating: 'mediocre', shelf: 'read'},
 {id: 5, title: 'dawnlight2', rating: 'mediocre', shelf: 'wantToRead'},
    ]
    };
  }
  
  findBookInList(id) {
    return this.state.books.findIndex(book => book.id === id);
    
  };


  
    
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
  }
   

  removeBook = (book) => {
    this.setState((state) => ({
      books : this.state.books.filter((c) => c.title !== book.title)
    }))

  }



   

  render() {
    return (
      <div className="App">    
        <ShelfList books={this.state.books} handleListChange={this.handleListChange} onDeleteBook={this.removeBook}/>
      </div>
    );
  }
}

export default App;
