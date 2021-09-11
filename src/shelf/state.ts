import Keys from "../common/keys";
import { Book } from "../models/Book";

export default function initializeState() {

  const shelfItems = new Array<Book>();
  const state = localStorage.getItem(Keys.SHELF_KEY);
  if (state) {
    const bookList = JSON.parse(state);
    shelfItems.push(...bookList);
  }

  return {
    shelfItems, 
    isBusy: false,
    error: "",
    subjectResults: new Array<Book>(),
    currentTopic: "",
    currentPage: 0
  };
}
