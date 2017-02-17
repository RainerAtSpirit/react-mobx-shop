import {observable, computed, action} from 'mobx'
import Book from './Book'

export default class BookStore {
  @observable isLoading = false
  books = observable.map()
  fetch

  constructor (fetch) {
    this.fetch = fetch
  }

  @computed get sortedBooks () {
    return this.books.values().sort((a, b) =>
      a.name > b.name
        ? 1
        : a.name === b.name
          ? 0
          : -1
    )
  }

  @action loadBooks () {
    this.isLoading = true
    this.fetch('books.json')
      .then(json => {
        this.updateBooks(json)
        this.isLoading = false
      })
      .catch(err => {
        console.error('Failed to load books ', err)
      })
  }

  @action updateBooks (json) {
    this.books.clear()
    json.forEach(bookJson => {
      this.books.set(bookJson.id, new Book(bookJson))
    })
  }
}
