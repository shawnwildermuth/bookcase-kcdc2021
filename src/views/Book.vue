<template>
  <div class="about">
    <button class="btn" @click="router.back()">Back</button>
    <div v-if="book">
      <div class="flex flex-col">
        <img :src="`http://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`" class="w-72 shadow" />
        <div class="p-2">
          <div>
            <strong>{{ book.title }}</strong>
            <div v-for="author in book.authors" :key="author.key"><em>{{ author.name }}</em></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { Book } from "../models/Book";
import router from "../router";
import store from "../shelf";

export default defineComponent({
  props: {
    bookKey: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    
    const book = ref<Book | null>(null);

    if (!props.bookKey) {
      console.log("Could not find key");
      router.push("/");
    }

    book.value = store.getters.findBook(decodeURIComponent(props.bookKey));
    if (!book) {
      // redirect if we can't find the book
      console.log("Cannot find the book");
      router.push("/");
    }

    return {
      router,
      book,
    };
  },
});
</script>
