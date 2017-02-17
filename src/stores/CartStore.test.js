import * as fs from 'fs'
import BookStore from './BookStore'
import CartStore from './CartStore'

const bookFetcher = () => Promise.resolve(JSON.parse(fs.readFileSync('./public/books.json')))

it('cart store can add new entries', () => {
  const bookStore = new BookStore(bookFetcher)
  bookStore.updateBooks([{
    id: 1,
    price: 3
  }])

  const cart = new CartStore(bookStore)
  cart.addBook(bookStore.books.get(1))
  cart.addBook(bookStore.books.get(1))

  expect(cart.subTotal).toBe(6)
  expect(cart.total).toBe(6)

  cart.entries[0].quantity = 100
  expect(cart.subTotal).toBe(300)
  expect(cart.total).toBe(270)
})

it('cart store can clear entries', () => {
  const bookStore = new BookStore(bookFetcher)
  bookStore.updateBooks([{
    id: 1,
    price: 3
  }])

  const cart = new CartStore(bookStore)
  cart.addBook(bookStore.books.get(1))

  expect(cart.total).toBe(3)
  expect(cart.canCheckout).toBe(true)

  cart.clear()
  expect(cart.total).toBe(0)
  expect(cart.canCheckout).toBe(false)
})
