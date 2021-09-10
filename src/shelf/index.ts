import { Book } from "../models/Book";
import { createStore } from "vuex";

const SHELF_KEY = "YOURSELF_KEY";

function includesBook(items: Array<Book>, book: Book) {
  return items.findIndex(b => b.key === book.key) > -1;
}

function initializeState() {

  const shelfItems = new Array<Book>()
  const state = localStorage.getItem(SHELF_KEY);
  if (state) {
    const bookList = JSON.parse(state);
    shelfItems.push(...bookList);
  }

  return {
    shelfItems, 
    isBusy: false,
    error: ""
  };
}

export default createStore({
  state: initializeState,
  mutations: {
    saveToLocalStorage(state) {
      localStorage.setItem(SHELF_KEY, JSON.stringify(state.shelfItems))
    },
    add: (state, book) => state.shelfItems.push(book),
    remove: (state, book) => {
      const index = state.shelfItems.findIndex(b => b.key === book.key);
      state.shelfItems.splice(index, 1);
    }
  },
  actions: {
    addToShelf({commit, getters }, book: Book) {
      if (!getters.isOnShelf(book)) {
        commit("add", book);
      }
      commit("saveToLocalStorage");
    },
    removeFromShelf({commit, getters}, book: Book) {
      if (getters.isOnShelf(book)) {
        commit("remove", book);
        commit("saveToLocalStorage");
      }
    }

  },
  getters: {
    isOnShelf: (state) => (book: Book) => {
      console.log(`Is on shelf: ${state.shelfItems.includes(book)}`)
      return includesBook(state.shelfItems, book);
    }
  }
});




