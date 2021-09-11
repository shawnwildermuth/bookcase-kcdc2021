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
      <a href="#" class="underline text-blue-600 hover:no-underline mx-2" v-if="canPrev" @click="prev"> Prev</a>
      <a href="#" class="underline text-blue-600 hover:no-underline mx-2" v-if="canNext" @click="next">Next</a>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 text-center">
      <div v-for="book in books" :key="book.key" class="border bg-white border-grey-500 m-1 p-1">
        <router-link :to="{ name: 'book', params: { bookKey: book.key } }">
          <BookInfo :book="book" />
        </router-link>
        <button class="btn" @click="addToShelf(book)" :disabled="isOnShelf(book)">Add to Shelf</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import BookInfo from "../components/bookInfo.vue";
import { Book } from "../models/Book";
import store from "../shelf";
import bookTopics from "../common/bookTopics";

export default defineComponent({
  components: {
    BookInfo,
  },
  setup() {
    const books = computed(() => store.state.subjectResults);
    const currentTopic = ref("cats");
    const canPrev = computed(() => store.getters.canMovePrev);
    const canNext = computed(() => store.getters.canMoveNext);

    watch(currentTopic, () => store.dispatch("changeTopic", currentTopic.value));
    onMounted(() => store.dispatch("changeTopic", currentTopic.value));

    return {
      currentTopic,
      books,
      bookTopics,
      addToShelf: (book: Book) => store.dispatch("addToShelf", book),
      isOnShelf: (book: Book) => store.getters.isOnShelf(book),
      next: () => store.dispatch("nextPage"),
      prev: () => store.dispatch("prevPage"),
      canPrev,
      canNext,
    };
  },
});
</script>
