<template>
  <div class="container mx-auto bg-gray-100 p-1">
    <div class="flex justify-between  mt-2">
      <h1>The Bookstore</h1>
      <ul class="flex">
        <li><router-link to="/" class="text-blue-100 bg-blue-600 rounded p-2 mx-2 hover:bg-blue-500">Home</router-link></li>
        <li><router-link to="/shelf" class="text-blue-100 bg-blue-600 rounded p-2 mx-2 hover:bg-blue-500">Your Bookshelf</router-link></li>
      </ul>
    </div>
    <div class="alert" v-if="false">Errors</div>
    <div class="alert bg-gray-200 text-gray-900" v-if="false">Loading...</div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>
