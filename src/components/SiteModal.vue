<script setup>
import axios from 'axios';
import { ref } from "vue";
import { useStore } from "../store";
import { defineStore } from "pinia";
const props = defineProps(["id"]);
const emits = defineEmits(["toggleModal"]);

const movieData = ref(null);

const store = useStore();

const getMovie = async () => {
  movieData.value = (
    await axios.get(`https://api.themoviedb.org/3/movie/${props.id}`, {
      params: {
        api_key: "1c54b96f434d2541d0e6ee64a16e8cb2",
        append_to_response: "videos",
      },
    })
  ).data
};

getMovie();
// await store.getMovies();
</script>

<template>

  <link
    href="https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand&family=Roboto+Condensed:ital@1&family=Seymour+One&display=swap"
    rel="stylesheet">

  <Teleport to="body">

    <div class="modal-outer-container" @click.self="emits('toggleModal')">

      <div class="modal-inner-container">

        <button class="close-button" @click="emits('toggleModal')">X</button>

        <div class="poster" v-if="movieData">
          <img class="movie_poster" :src="`https://image.tmdb.org/t/p/w500${movieData.poster_path}`" alt="image is unavailable" />
        </div>

        <div class="information" v-if="movieData">
          <h2 class="movie_title">Title: <span class="lame">{{ movieData.title }}</span></h2>
          <h2 class="movie_release_date">Release Date: <span class="lame">{{ movieData.release_date }}</span></h2>
          <h2 class="movie_description">Description: </h2>
          <p>{{ movieData.overview }}</p>
          <button @click="store.addToCart(props.id, {
          id: movieData.id,
          poster: movieData.poster_path,
          title: movieData.title,
          })" class="purchase_button">Purchase</button>
        </div>

      </div>

    </div>

  </Teleport>

</template>

<style scoped>
.modal-outer-container {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #00000099;
  z-index: 3;
}

.modal-outer-container .modal-inner-container {
  background-color: #415a77;
  width: clamp(280px, 90%, 800px);
  height: 400px;
  position: relative;
  display: flex;
}

.modal-outer-container .modal-inner-container .close-button {
  position: absolute;
  right: 0px;
  border: none;
  background: #778da9;
  font-weight: bold;
  font-size: 1.25rem;
  color: white;
  cursor: pointer;
  border: 3px solid black;
  padding-bottom: 0.10rem;
}

.close-button {
  width: 100px;
  height: 50px;
}

.poster {
  width: 40%;
  border: 3px solid black;
  display: flex;
  justify-content: center;
}

.movie_poster {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 75%;
  padding-top: 5%;
  padding-bottom: 5%;
}

.information {
  border: 3px solid black;
  width: 60%;
  padding: 2%;
  justify-content: center;
  text-align: center;
}

.lame {
  font-weight: 100;
  font-size: 1.25rem;
}

.movie_title {
  margin-top: 6%; 
  display: block;
}

.movie_release_date {
  display: block;
}

.purchase_button {
  width: 20%;
  height: 15%;
  margin-top: 5%;
  border-radius: 15px;
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;
  font-size: 1vw;
}

p,
span {
  font-size: 1.1rem;
  color: #e0e1dd;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

h2 {
  margin-top: 2%;
  color: #e0e1dd;
  font-family: 'Indie Flower', sans-serif;
  font-size: 1.25rem;
}
</style>