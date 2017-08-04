import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './App.css'
import BookItem from './bookitem'
//import { Debounce } from 'react-throttle';

/* not pursued further since that endpoint is not available on the API */
class SearchBook extends Component {
	
 	/* use inside html/jsx section to display query :  {JSON.stringify(this.state)} */
	render() {

		return (
			<div key="searchbook-search-books" className="search-books">
			<div key="searchbook-search-books-bar"  className="search-books-bar">

		
      		<input className="search-books-input-wrapper" type="text"
      		placeholder="Search by title or author"
      		value={this.props.query}
      		onChange={event => this.props.updateQuery(event.target.value)}
			/>
    

      	
      	<Link onClick={this.props.clearQuery} className="close-search" to="/">back</Link>
      	</div>
      {/*<ShelfList books={this.props.searchResults} showingBooks={this.props.showingBooks} handleListChange={this.props.handleListChange} onDeleteBook={this.props.onDeleteBook}/> */}
      	<div key="searchbook-results" className="search-results">
      		

                  
                      <div key="searchbook-shelf" className="bookshelf-books">
                      <div  key="searchbook-extrashelf" className="extraSpace"></div>
                        <ol  key="searchbook-grid" className="books-grid">
                        

                      {

                      	this.props.books.map((book, index) => (
                                     <BookItem key={book.id + index}
                                           
                                      book={book}
                                      
                                      handleListChange={this.props.handleListChange}
                                      onDeleteBook={this.props.onDeleteBook}
                                      
                                      />
                                  )
                              )}
                       
                        </ol>
                      </div>
                      </div>
                  
                
      	

      	</div>
			)
	}
}

export default SearchBook