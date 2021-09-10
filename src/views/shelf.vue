<template>
  <div>
    <h3>Your Bookshelf</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 text-center">
      <div v-for="book in shelfItems" :key="book.key" class="border bg-white border-grey-500 m-1 p-1">
        <BookInfo :book="book" />
        <button class="btn" @click="removeFromShelf(book)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BookInfo from "../components/bookInfo.vue";
import ShelfFactory from "../shelf";

export default defineComponent({
  components: { BookInfo },
  setup() {
    const { shelfItems, removeFromShelf } = ShelfFactory();

    return {
      shelfItems,
      removeFromShelf,
    };
  },
});
</script>
