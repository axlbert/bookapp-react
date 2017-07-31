import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
/* not pursued further since that endpoint is not available on the API */
class SearchBook extends Component {

	state = {
 		query: ''
 	}

 	/* passing in query for search */
 	updateQuery = (query) => {
 		this.setState({ query: query.trim() })
 	}

 	/* setting the query to an empty string */
 	resetQuery = (query) => {
 		this.setState({ query: '' })
 	}
 	/* use inside html/jsx section to display query :  {JSON.stringify(this.state)} */
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

		return (
			<div class="searcher">
      		<input className="search-box" type="text"
      		placeholder="search for book titles"
      		value={this.state.query}
      		onChange={(event) => this.updateQuery(event.target.value)}
			/>


      	
      	{/*<Link className="close-search" to="/" onClick={() => this.resetQuery()}>back</Link>*/}
      	</div>
			)
	}
}

export default SearchBook