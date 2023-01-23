<script setup>
import { useStore } from "../store/index.js";
import { ref } from 'vue';
import SiteModal from "../components/SiteModal.vue";
const props = defineProps(["id"]);
const store = useStore();

</script>

<template>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Pacifico&family=Seymour+One&display=swap"
    rel="stylesheet">

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

  <RouterLink to="/purchase" custom v-slot="{ navigate }">
    <div class="back_button">
      <i class="fa fa-arrow-left" aria-hidden="true" @click="navigate" role="link"></i>
    </div>
  </RouterLink>

  <h1 class="header">Cart</h1>

  <div class="container" v-if="store.cart.size > 0">

    <div class="section" v-for="movie in store.cart.values()">

      <div class="close">
        <button class="close-button" @click="store.cart.delete(movie.id)">X</button>
      </div>

      <div class="poster">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster}`" alt="" class="poster_image">
      </div>

      <div class="title">
        <h1 class="title_text">{{ movie.title }}</h1>
      </div>

    </div>

  </div>
</template>

<style scoped>
.header {
  text-align: center;
  font-family: 'Indie Flower', sans-serif;
  font-size: 55px;
  color: #E0E1DD;
}

.container {
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  width: 100%;
  border: 5px black solid;
}

.section {
  border: 5px black solid;
  margin: 40px;
  border-radius: 15px;
}


.fa {
  font-size: 50px;
  height: 50px;
  float: right;
  cursor: pointer;
  margin-left: 0.5rem;
}

.back_button {
  display: inline-block;
  float: left;
  padding-top: 10px;
  padding-right: 10px;
}

.poster_image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 85%;
}

.title {
  width: 50px;
  display: inline;
}

.title_text {
  text-align: center;
  padding: 15px;
  font-family: 'Indie Flower', sans-serif;
  font-size: 2.5vw;
}

.close-button {
  cursor: pointer;
  width: 50px;
  height: 25px;
  display: block;
  margin-left: auto;
  margin-bottom: 2%;
  margin-right: 1%;
  margin-top: 1%;
  background-color: #0d1b2a;
  color: white;
  font-size: large;
  border-radius: 5px;
}
</style>
