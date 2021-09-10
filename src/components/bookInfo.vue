<template>
  <div class="flex flex-col text-center">
    <BookCover :coverId="book.cover_id" />
    <div class="p-2">
      <strong>{{ book.title }}</strong>
      <div class="text-sm">
        <ul>
          <li v-for="author in book.authors" :key="author.key">
            {{ author.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Book } from "../models/Book";
import BookCover from "../components/BookCover.vue";

export default defineComponent({
  components: { BookCover },
  props: {
    book: {
      type: Object as PropType<Book>,
      required: true
    } 
  }
})
</script>
