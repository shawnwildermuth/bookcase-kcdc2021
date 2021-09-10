<template>
  <h3>Your Bookshelf</h3>
  <div v-for="book in books" :key="book.key">
    <BookInfo :book="book" />
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";
import BookInfo from "../components/bookInfo.vue";
import { Book } from "../models/Book";

export default defineComponent({
  components: { BookInfo },
  setup() {
    const books = reactive(Array<Book>());
    
    return {
      books
    };
  }
});
</script>