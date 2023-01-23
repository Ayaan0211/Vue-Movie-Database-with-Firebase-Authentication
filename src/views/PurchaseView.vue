<script setup>
import { useStore } from "../store/index.js";
import { ref } from 'vue';
import SiteModal from "../components/SiteModal.vue"
import axios from "axios";

const store = useStore();
const genre = ref("Actions");
const criteria = ref("");
const searchResults = ref([]);
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

getGenres();
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

    <RouterLink to="/" custom v-slot="{ navigate }">
      <div class="home_button">
        <i class="icons fa-solid fa-house" @click="navigate" role="link"></i>
      </div>
    </RouterLink>

    <RouterLink to="/cart" custom v-slot="{ navigate }">
      <div class="shopping_cart">
        <i class="icons fa-solid fa-cart-shopping" @click="navigate" role="link"></i>
      </div>
    </RouterLink>

    <div class="searchbar">
      <input type="search" placeholder="Search for a movie.." v-model="criteria" @keydown.enter="search(0)"
        class="actualsearchbar" />
    </div>

    <div class="dropdown">
      <select name="genre" id="dropdown_menu" class="dropdown_menu" v-model="genre" @change="getGenres()">
        <option value="Actions">Action</option>
        <option value="Animation">Animation</option>
        <option value="Crime">Crime</option>
        <option value="Family">Family</option>
        <option value="Science Fiction">Science Fiction</option>
      </select>
    </div>

  </div>

  <div class="movie_container">

    <template v-if="searchResults.length">
      <img v-for="movie in searchResults" :id="movie.id" :src="`https://image.tmdb.org/t/p/w500${movie.poster}`"
        @click="openModal(movie.id)" class="movie" alt="image is unavailable" />
    </template>

    <template v-else>
      <img v-for="movie in store.movieData" :id="movie.id" :src="`https://image.tmdb.org/t/p/w500${movie.poster}`"
        @click="openModal(movie.id)" class="movie" />
    </template>

  </div>

  <SiteModal v-if="showModal" @toggleModal="closeModal()" :id="selectedId" />

  <template v-if="searchResults.length">
    <div class="footer">
      <div class="navigation1">
        <h1 class="pages">{{ `Page ${page} of ${totalPages}` }}</h1>
      </div>
      <div class="navigation2">
        <button v-show="page > 1" @click="search(-1)" class="prev">Prev</button>
      </div>
      <div class="navigation3">
        <button v-show="page < totalPages" @click="search(1)" class="next">Next</button>
      </div>
    </div>
  </template>

</template>

<style scoped>
.icons {
  font-size: 50px;
  height: 50px;
  cursor: pointer;
  padding-left: 0.5rem;
}

.shopping_cart {
  float: right;
  padding-top: 10px;
  padding-right: 10px;
}

.home_button {
  float: left;
  padding-top: 10px;
  padding-right: 10px;
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
  width: 100%;
  padding: 10px;
  border-radius: 75px;
  transition: transform .4s;
}

.movie:hover {
  transform: scale(1.06);
}

img {
  aspect-ratio: 2/3;
  text-align: center;
  cursor: pointer;
}

.movie_container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 5px dashed black;
  border-radius: 75px;
}

.movie_gallery {
  margin: 0.5rem 1rem 0.5rem 1rem;
}

.container {
  text-align: center;
}

.searchbar {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.actualsearchbar {
  width: 33%;
  height: 2.5rem;
  background-color: #415A77;
  box-shadow: none;
  border: 1px solid white;
  color: white;
  font-size: 1.5rem;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: center;
}

.dropdown {
  margin-bottom: 2rem;
}

.dropdown_menu {
  width: 10rem;
  height: 2rem;
  text-align: center;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 1rem;
  border-radius: 15px;
}

.navigation1 {
  text-align: center;
  margin-top: 10px;
  display: inline-block;
}

.pages {
  text-align: center;
}

.navigation2 {
  float: left;
  text-align: center;
  padding-bottom: 20px;
  padding-left: 10px;
  margin-top: 15px;
}

.prev {
  font-size: 30px;
  height: 3rem;
  width: 6rem;
  cursor: pointer;
  text-align: center;
  border-radius: 10px;
  background: #8d9aac;
  font-family: 'Indie Flower', sans-serif;
}

.navigation3 {
  float: right;
  text-align: center;
  padding-bottom: 20px;
  padding-right: 10px;
  margin-top: 15px;
}

.next {
  font-size: 30px;
  height: 3rem;
  width: 6rem;
  cursor: pointer;
  text-align: center;
  border-radius: 10px;
  background: #8d9aac;
  font-family: 'Indie Flower', sans-serif;
}

.footer {
  text-align: center;
}
</style>
