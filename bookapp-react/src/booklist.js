import React, { Component } from 'react';
import BookItem from './bookitem'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
/* this is a controlled component where react controls the state of the component */

// if we just render, we could also just build a function and pass in props func(props)



const shelves = ["currentlyReading","wantToRead","read"]

class ShelfList extends Component {
/* when refactoring from frunction to class, we need to include this. before props and add render() instead of just return */
/* use inside html/jsx section to display query :  {JSON.stringify(this.state)} */
	
 	state = {
 		query: ''
 	}

 	updateQuery = (query) => {
 		this.setState({ query: query.trim() })
 	}

    render() {
    	let showingBooks
    	/* matching of book query*/
    	if (this.state.query) {
    			/* escape special characters and use them as string literal regardless of case */
    		const match = new RegExp(escapeRegExp(this.state.query), 'i')
    		showingBooks = this.props.books.filter((book) => match.test(book.title))
    		} else {
    			showingBooks = this.props.books
    		}
    	 /*this is alphabetizing book titles */
    	showingBooks.sort(sortBy('title'));

    /* further below this.props.books list has been replaced by showingBooks since this is the filtered list */

    	return (
      <div className="bookstore">
      	
      	<div className="searchbar">
      		<input className="search-box"
      		type="text"
      		placeholder="search for book titles"
      		value={this.state.query}
      		onChange={(event) => this.updateQuery(event.target.value)}


      		/>

      	</div>
        <h1>My Books</h1>
        {
          shelves.map(element => 
              {
                return(
                  <div key={element}>
                    <h2>{element}</h2>

                      {showingBooks.filter(el => el.shelf === element)
                        .map((bookElem) => (
                                     <BookItem key={bookElem.title}
                                     id = {bookElem.id}
                                
                                title = {bookElem.title}
                                shelf = {bookElem.shelf}
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