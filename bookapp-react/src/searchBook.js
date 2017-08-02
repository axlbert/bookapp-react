import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './App.css'
import BookItem from './bookitem'

/* not pursued further since that endpoint is not available on the API */
class SearchBook extends Component {

	
 	/* use inside html/jsx section to display query :  {JSON.stringify(this.state)} */
	render() {

		return (
			<div className="search-books">
			<div className="search-books-bar">
			
      		<input className="search-books-input-wrapper" type="text"
      		placeholder="Search by title or author"
      		value={this.props.query}
      		onChange={(event) => this.props.updateQuery(event.target.value)}
			/>


      	
      	<Link className="close-search" to="/">back</Link>
      	</div>
      {/*<ShelfList books={this.props.searchResults} showingBooks={this.props.showingBooks} handleListChange={this.props.handleListChange} onDeleteBook={this.props.onDeleteBook}/> */}
      	<div className="search-results">
      		

                  
                      <div className="bookshelf-books">
                      <div className="extraSpace"></div>
                        <ol className="books-grid">
                        

                      {

                      	this.props.books.map((book) => (
                                     <BookItem key={book.id + book.title + book.shelf}
                                           id = {book.id}
                                      book={book}
                                      title = {book.title}
                                      shelf = {book.shelf}
                                      image = {book.imageLinks.smallThumbnail}
                                      authors = {book.authors}
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