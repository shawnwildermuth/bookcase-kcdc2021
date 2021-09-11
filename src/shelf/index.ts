import { Book } from "../models/Book";
import { createStore } from "vuex";
import state from "./state";
import Keys from "../common/keys";
import bookService from "../common/bookService";

export default createStore({
  state: state,
  mutations: {
    saveToLocalStorage(state) {
      localStorage.setItem(Keys.SHELF_KEY, JSON.stringify(state.shelfItems))
    },
    add: (state, book) => state.shelfItems.push(book),
    remove: (state, book) => {
      const index = state.shelfItems.findIndex(b => b.key === book.key);
      state.shelfItems.splice(index, 1);
    },
    setBusy: (state) => state.isBusy = true,
    clearBusy: (state) => state.isBusy = false,
    setError: (state, msg) => state.error = msg,
    clearError: (state) => state.error = "",
    setResults: (state, coll) => state.subjectResults.splice(0, state.subjectResults.length, ...coll),
    incrementPage: (state) => state.currentPage++,
    decrementPage: (state) => state.currentPage--,
    resetPage: (state) => state.currentPage = 0,
    setTopic: (state, topic) => state.currentTopic = topic
  },
  actions: {
    addToShelf({ commit, getters }, book: Book) {
      if (!getters.isOnShelf(book)) {
        commit("add", book);
      }
      commit("saveToLocalStorage");
    },
    removeFromShelf({ commit, getters }, book: Book) {
      if (getters.isOnShelf(book)) {
        commit("remove", book);
        commit("saveToLocalStorage");
      }
    },
    async changeTopic({ state, commit, dispatch }, topic) {
      if (state.currentTopic != topic) {
        commit("setTopic", topic);
        commit("resetPage");
        await dispatch("loadResults");
      }
    },
    async loadResults({ state, commit }) {

      commit("clearError");
      commit("setBusy");

      try {
        const response = await bookService.getBooks(state.currentTopic, state.currentPage);
        if (response.status === 200) {
          commit("setResults", response.data.works);
          return;
        }
      } catch (err) {
        console.log(err);
      } finally {
        commit("clearBusy");
      }
      commit("setError", "Could not load books from OpenLibrary. Please try again.");


    },
    async nextPage({ state, commit, dispatch }) {
      commit("incrementPage");
      await dispatch("loadResults", state.currentTopic)
    },
    async prevPage({ state, commit, dispatch }) {
      commit("decrementPage")
      await dispatch("loadResults", state.currentTopic)
    }
  },
  getters: {
    isOnShelf: (state) => (book: Book) => {
      return state.shelfItems.findIndex(b => b.key === book.key) > -1;
    },
    canMovePrev: (state) => state.currentPage !== 0,
    canMoveNext: (state) => state.currentPage >= 0,
    findBook: (state) => (key: string) => state.subjectResults.find(b => b.key === key)
  }
});




