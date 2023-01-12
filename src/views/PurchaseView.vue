<script setup>
import { useStore } from "../store/index.js";
import { ref } from 'vue';
import SiteModal from "../components/SiteModal.vue"

const store = useStore();
await store.getMovies();

const showModal = ref(false);
const selectedId = ref(0);

const openModal = (id) => {
  showModal.value = true;
  selectedId.value = id;
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<template>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Pacifico&family=Seymour+One&display=swap"
    rel="stylesheet">

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

  <div class="container">

    <div class="header_text">
      <h1>Purchase Any Movie!</h1>
    </div>

    <RouterLink to="/cart" custom v-slot="{ navigate }">
      <div class="shopping_cart">
        <i class="icons fa-solid fa-cart-shopping" @click="navigate" role="link"></i>
      </div>
    </RouterLink>

  </div>

  <div class="movie_container">

    <div class="movie_gallery">

      <img v-for="movie in store.movieData" :src="`https://image.tmdb.org/t/p/w500${movie.poster}`" alt=""
        @click="openModal(movie.id)" class="movie" />

    </div>

  </div>

  <SiteModal v-if="showModal" @toggleModal="closeModal()" :id="selectedId" />

</template>

<style scoped>
.icons {
  font-size: 50px;
  height: 50px;
  float: right;
  cursor: pointer;
}

h1 {
  font-family: 'Indie Flower', sans-serif;
  font-size: 45px;
  color: #E0E1DD;
}

.header_text {
  display: inline-block;
}

.movie {
  cursor: pointer;
  width: 25%;
  padding: 10px;
  border-radius: 75px;
  transition: transform .4s;
}

.movie:hover {
  transform: scale(1.06);
}

.movie_container {
  display: flex;
  border: 5px dashed black;
  border-radius: 75px;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.movie_gallery {
  margin: 0.5rem 1rem 0.5rem 1rem;
}

.shopping_cart {
  display: inline-block;
  float: right;
  padding-top: 10px;
  padding-right: 10px;
}

img {
  aspect-ratio: 2/3;
}

.container {
  text-align: center;
}
</style>
