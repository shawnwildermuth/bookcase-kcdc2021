<template>
  <div class="w-32 h-48 mx-auto flex justify-center items-center">
    <img :src="`http://covers.openlibrary.org/b/id/${coverId}-M.jpg`" class="cover-image" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: [ "coverId" ]  
})
</script>

<style scoped>
.cover-image {
  filter: drop-shadow(3px 3px 4px #888);
}
</style>