import React, { Component } from 'react'

/* not pursued further since that endpoint is not available on the API */
class SearchBook extends Component {

	
 	/* use inside html/jsx section to display query :  {JSON.stringify(this.state)} */
	render() {

		return (
			<div class="searcher">
			Search
      		<input className="search-box" type="text"
      		placeholder="search for book titles"
      		value={this.props.query}
      		onChange={(event) => this.updateQuery(event.target.value)}
			/>


      	
      	{/*<Link className="close-search" to="/" onClick={() => this.resetQuery()}>back</Link>*/}
      	</div>
			)
	}
}

export default SearchBook