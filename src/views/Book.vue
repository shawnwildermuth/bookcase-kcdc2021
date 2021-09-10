<template>
  <div class="about">
    <button class="btn" @click="router.back()">Back</button>
    <div>
      <div class="flex flex-col">
        <img :src="`http://covers.openlibrary.org/b/id/${cover}-L.jpg`"
          class="w-72 shadow"
        />
        <div class="p-2">
          <div>
            <strong>{{ title }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import router from "../router";
import { Book } from "../models/Book";

export default defineComponent({
  props: ["cover", "title"],
  // {
  //   book: {
  //     type: Object as PropType<Book>,
  //     //required: true,
  //   },
  // },
  setup() {

    return {
      router
    };
  },
});
</script>