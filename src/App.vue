<template>
  <div class="flex justify-center items-center  bg-black w-screen h-screen z-30 absolute left-0 top-0 bg-opacity-50 text-4xl font-bold" v-if="isBusy">
    <div class="text-white filter drop-shadow-2xl animate-bounce">Loading...</div>
  </div>
  <div class="container mx-auto bg-white min-h-screen">
    <div class="flex justify-between m-0 p-2 bg-gray-700 mb-2">
      <h1><router-link to="/" class="text-yellow-400 hover:text-yellow-600">The Bookstore</router-link></h1>
      <ul class="flex">
        <li><router-link to="/" class="text-yellow-400 underline hover:text-yellow-600 mr-1">Home</router-link></li>
        <li><router-link to="/shelf" class="text-yellow-400 underline hover:text-yellow-600 ml-1">Your Bookshelf</router-link></li>
      </ul>
    </div>
    <div class="alert text-red-600" v-if="error">{{ error }}</div>
    <router-view :key="$route.fullPath" class="px-1"></router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import store from "./shelf";

export default defineComponent({
  setup() {
    const error = computed(() => store.state.error);
    const isBusy = computed(() => store.state.isBusy);

    return {
      error,
      isBusy,
    };
  },
});
</script>
