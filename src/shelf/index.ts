import { Book } from "../models/Book";
import { reactive, readonly, ref } from "vue";

const SHELF_KEY = "YOURSELF_KEY";
const shelfItems = reactive(new Array<Book>());

function addToShelf(book: Book) { 
  shelfItems.push(book);
  storeShelf();
}
function removeFromShelf(book: Book) { 
  const index = shelfItems.findIndex(b => b.key === book.key);
  if (index > -1) {
    shelfItems.splice(index, 1);
    storeShelf();
  }
}

function storeShelf() {
  localStorage.setItem(SHELF_KEY, JSON.stringify(shelfItems))
}

function readShelf() {
  const state = localStorage.getItem(SHELF_KEY);
  if (state) {
    const bookList = JSON.parse(state);
    shelfItems.splice(0, shelfItems.length, ...bookList);
  }
}

function isOnShelf(book: Book) {
  return shelfItems.findIndex(b => b.key === book.key) > -1; 
}

export default function () {

  if (!shelfItems || shelfItems.length === 0) readShelf();

  return {
    shelfItems,
    addToShelf,
    removeFromShelf,
    isOnShelf
  };
}