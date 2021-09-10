<template>
  <div class="home">
    <div class="flex justify-between">
      <div>
        <label class="block ml-1 text-sm">
          Book Subject:
          <select v-model="currentTopic" class="rounded border-gray-300 p-1 ml-1">
            <option v-for="[val, desc] in bookTopics" :value="val" :key="val">{{ desc }}</option>
          </select>
        </label>
      </div>
      <div>
        <a href="#" class="underline text-blue-600 hover:no-underline mx-2" v-if="currentPage > 0" @click="currentPage--"> Prev</a>
        <a href="#" class="underline text-blue-600 hover:no-underline mx-2" @click="currentPage++">Next</a>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 text-center">
      <div
        v-for="book in books"
        :key="book.key"
        class="border bg-white border-grey-500 m-1 p-1"
      >
        <router-link :to="{ name: 'book', params: { cover: book.cover_id, title: book.title } }">
          <BookInfo :book="book" />
        </router-link>
        <button class="btn" @click="addToShelf(book)" :disabled="isOnShelf(book)">Add to Shelf</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import bookService from "../bookService";
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import BookInfo from "../components/bookInfo.vue";
import bookTopics from "../common/bookTopics";
import { Book } from "../models/Book";
import { addToShelf, isOnShelf } from "../shelf";

export default defineComponent({
  components: {
    BookInfo,
  },
  setup() {
    const books: Book[] = reactive([]);
    const currentPage = ref(0);
    const currentTopic = ref(bookTopics[0][0]); // First value
    let topicChanging = false;

    watch(currentPage, async () => {
      if (!topicChanging) {
        await loadBooks(currentTopic.value);
      }
    });

    watch(currentTopic, async () => {
      try {
        topicChanging = true;
        currentPage.value = 0;
        await loadBooks(currentTopic.value);
      } finally {
        topicChanging = false;
      }
    });

    onMounted(async () => loadBooks(currentTopic.value));

    async function loadBooks(val: string) {
      const response = await bookService.getBooks(val, currentPage.value);
      if (response.status === 200) {
        books.splice(0, books.length, ...response.data.works);
      }
    }

    return {
      currentPage,
      currentTopic,
      books,
      bookTopics,
      addToShelf,
      isOnShelf
    };
  },
});
</script>