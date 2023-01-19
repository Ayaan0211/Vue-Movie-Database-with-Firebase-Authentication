<script setup>
import { useStore } from "../store/index.js";
import { ref } from 'vue';
import SiteModal from "../components/SiteModal.vue"
import axios from "axios";

const store = useStore();
const genre = ref();
const criteria = ref("");
const searchResults = ref([]);
const page = ref(1);
const totalPages = ref(0);
const showModal = ref(false);
const selectedId = ref(0);

const openModal = (id) => {
  showModal.value = true;
  selectedId.value = id;
};

const closeModal = () => {
  showModal.value = false;
};

const getGenres = async () => {
  searchResults.value = [];
  criteria.value = "";
  await store.getMovies(genre.value);
};

const search = async (direction) => {
  page.value += direction
  let data = (
    await axios.get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: "1c54b96f434d2541d0e6ee64a16e8cb2",
        query: criteria.value,
        include_adult: false,
        page: page.value,
      }
    })
  ).data;

  totalPages.value = data.total_pages;

  searchResults.value = data.results.map((movie) => {
    return {
      id: movie.id,
      poster: movie.poster_path,
    };
  });
};

// await store.populateFirestore();
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

    <div class="searchbar">
      <input type="search" placeholder="Search for a movie.." v-model="criteria" @keydown.enter="search(0)" />
    </div>

    <div class="dropdown">
      <label for="genre_dropdown"></label>
      <select name="genre" id="dropdown_menu" v-model="genre" @change="getGenres()">
        <option value="blank"></option>
        <option value="Actions">Action</option>
        <option value="Animation">Animation</option>
        <option value="Crime">Crime</option>
        <option value="Family">Family</option>
        <option value="Science Fiction">Science Fiction</option>
      </select>
    </div>

    <template v-if="searchResults.length">
      <div class="navigation">
        <button v-show="page > 1" @click="search(-1)">Prev</button>
        <h1>{{ `Page ${page} of ${totalPages}` }}</h1>
        <button v-show="page < totalPages" @click="search(1)">Next</button>
      </div>
    </template>

    <!-- <div class="purchase-container">
      <template v-if="searchResults.length">
        <img v-for="movie in searchResults" :id="movie.id" @click="openModal(movie.id)"
          :src="`https://image.tmdb.org/t/p/w500${movie.poster}`" />
      </template>
      <template v-else>
        <img v-for="movie in store.movies" :id="movie.id" @click="openModal(movie.id)"
          :src="`https://image.tmdb.org/t/p/w500${movie.poster}`" />
      </template>
      <SiteModal v-if="showModal" @toggleModal="closeModal()" :id="selectedId" />
    </div> -->

  </div>

  <div class="movie_container">

    <div class="movie_gallery">

      <template v-if="searchResults.length">
        <img v-for="movie in searchResults" :id="movie.id" @click="openModal(movie.id)"
          :src="`https://image.tmdb.org/t/p/w500${movie.poster}`" class="movie"/>
      </template>
      <template v-else>
        <img v-for="movie in store.movies" :id="movie.id" @click="openModal(movie.id)"
          :src="`https://image.tmdb.org/t/p/w500${movie.poster}`" class="movie"/>
      </template>
      <SiteModal v-if="showModal" @toggleModal="closeModal()" :id="selectedId" />

      <img v-for="movie in store.movieData" :id="movie.id" @click="openModal(movie.id)"
        :src="`https://image.tmdb.org/t/p/w500${movie.poster}`" alt="" class="movie" />

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
