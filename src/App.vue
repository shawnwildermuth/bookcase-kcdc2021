<template>
  <div class="container mx-auto bg-white ">
    <div class="flex justify-between m-0 p-2 bg-gray-700 mb-2">
      <h1><router-link to="/" class="text-yellow-400  hover:text-yellow-600">The Bookstore</router-link></h1>
      <ul class="flex">
        <li><router-link to="/" class="text-yellow-400 underline hover:text-yellow-600 mr-1">Home</router-link></li>
        <li><router-link to="/shelf" class="text-yellow-400 underline hover:text-yellow-600 ml-1">Your Bookshelf</router-link></li>
      </ul>
    </div>
    <div class="alert" v-if="false">Errors</div>
    <div class="alert bg-gray-200 text-gray-900" v-if="false">Loading...</div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>
