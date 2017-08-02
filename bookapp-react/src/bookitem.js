import React from 'react';


/* cannot use lifecycle events in functions */
function BookItem(props) {

  const title = props.title;
  const shelf = props.shelf;
  const authors = props.authors;
  const image = props.image;
  
  return (
    <div className="book">
    <div className="book-top">
   
      <img className="book-cover" alt="img" src={image}/>
      <div className="book-shelf-changer">
        <select value={shelf} onChange={e =>
                props.handleListChange(props.book, e.target.value)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">already read</option>
          <option value="none">None</option>
        </select>
      </div>

    {/* remove button deactivated since api endpoint not supported for now */}
        <button style={{"display": "none"}} onClick={() => props.onDeleteBook(props)} >delete book</button>
      
    </div>
    <div className="book-title">{title}</div>
    <div className="book-authors">{authors}</div>
    </div>
    )
}





export default BookItem