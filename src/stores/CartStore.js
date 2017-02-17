import { observable, computed, action } from 'mobx'
import CartEntry from './CartEntry'

export default class CartStore {
  bookStore
  @observable entries = []

  constructor (bookStore) {
    this.bookStore = bookStore
  }

  @computed get subTotal () {
    return this.entries.reduce((sum, e) => (sum + e.price), 0)
  }

  @computed get hasDiscount () {
    return this.subTotal >= 100
  }

  @computed get discount () {
    return this.subTotal * (this.hasDiscount ? 0.1 : 0)
  }

  @computed get total () {
    return this.subTotal - this.discount
  }

  @computed get canCheckout () {
    return this.entries.length > 0 && this.entries.every(entry => entry.quantity > 0)
  }

  @action addBook (book) {
    let entry = this.entries.find(entry => entry.book === book)
    if (!entry) {
      entry = new CartEntry(book)
      this.entries.push(entry)
    }
    entry.quantity += 1
  }

  @action clear () {
    this.entries.clear()
  }
}
