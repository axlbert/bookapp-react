import React from 'react';


/* cannot use lifecycle events in functions */
function BookItem(props) {

  const title = props.title;
  const shelf = props.shelf;
 
  return (

    <div>
      <div className="book-title">
          {title}
        </div>

      {/* {JSON.stringify(title)}*/}
        <select value={shelf} onChange={e =>
                props.handleListChange(props, e.target.value)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">already read</option>
          <option value="none">None</option>
        </select>
    {/* remove button deactivated since api endpoint not supported for now */}
        <button style={{"display": "none"}} onClick={() => props.onDeleteBook(props)} >delete book</button>
      
    </div>
    )
}





export default BookItem