import React, { Component } from 'react';
import BookItem from './bookitem'
import {Link} from 'react-router-dom'


/* this is a controlled component where react controls the state of the component */

// if we just render, we could also just build a function and pass in props func(props)



const shelves = ["currentlyReading","wantToRead","read"]

class ShelfList extends Component {
/* when refactoring from function to class, we need to include this. before props and add render() instead of just return */
    render() {
    /* further below this.props.books list has been replaced by showingBooks since this is the filtered list */
    	return (
      <div className="bookstore">
        <h1>My Books</h1>
        <Link className="close-search" to="/search">Search</Link>
        {
          shelves.map(element => 
              {
                return(
                  <div key={element}>
                    <h2>{element}</h2>

                      {this.props.showingBooks.filter(el => el.shelf === element)
                        .map((book) => (
                                     <BookItem key={book.title}
                                     id = {book.id}
                                
                                title = {book.title}
                                shelf = {book.shelf}
                                handleListChange={this.props.handleListChange}
                                onDeleteBook={this.props.onDeleteBook}
                                />
                                
                                
                                  )
                              )}
                    </div>
                )
              }
          )
        }
      </div>
      )
  }}



export default ShelfList