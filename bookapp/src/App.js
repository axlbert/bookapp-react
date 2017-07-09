import React, { Component } from 'react';
import './App.css';

/* this requires controlled components to be understood */
/* https://facebook.github.io/react/docs/forms.html#why-select-value */

function BookItem(props) {
  const title = props.title;
  const shelf = props.shelf;

  return (

    <div>
      <div className="book-title">
          {title}
        </div>

      
        <select value={shelf} onChange={e =>
                props.handleListChange(props, e.target.value)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">already read</option>
          <option value="none">None</option>
        </select>
      
    </div>
    )
}
// if we just render, we could also just build a function and pass in props func(props)


function ShelfList(props) {

  const shelves = ["currentlyReading","wantToRead","read"];
    return (
      <div>
        <h1>My Books</h1>
        {
          shelves.map(element => 
              {
                return(
                  <div key={element}>
                    <h2>{element}</h2>
                      {props.books.filter(el => el.shelf === element)
                        .map((bookElem) => (
                                     <BookItem key={bookElem.title}
                                     id = {bookElem.id}
                                
                                title = {bookElem.title}
                                shelf = {bookElem.shelf}
                                handleListChange={props.handleListChange}/>
                                
                                
                                  )
                              )}
                    </div>
                )
              }
          )
        }
      </div>
      )
  }

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
   
/*
  removeBook = (book) => {
    this.setState((state) => ({
      currentlyReading : state.currentlyReading.filter((c) => c.title !== book.title)
}*/    

  render() {
    return (
      <div className="App">    
        <ShelfList books={this.state.books} handleListChange={this.handleListChange}/>
      </div>
    );
  }
}

export default App;
