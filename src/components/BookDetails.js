import React from 'react'

const BookDetails = ({book, cartStore}) => (
  <section className='Page-book'>
    <h2>{book.name}</h2>
    <p><i>By: {book.author}</i></p>
    <p>Price: ${book.price}€</p>
    <button
      onClick={() => {
        cartStore.addBook(book)
        window.alert('Added to cart')
      }}
    >
      Add to cart
    </button>
  </section>
)

export default BookDetails

BookDetails.propTypes = {
  cartStore: React.PropTypes.any,
  book: React.PropTypes.object
}
