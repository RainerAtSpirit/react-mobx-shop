import { observable, computed } from 'mobx'

export default class CartEntry {
  @observable quantity = 0
  book

  constructor (book) {
    this.book = book
  }

  @computed get price () {
    return this.quantity * this.book.price
  }
}
