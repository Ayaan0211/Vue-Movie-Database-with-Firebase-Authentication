import { defineStore } from "pinia";
import { firestore } from "../firebase/index";
import axios from "axios";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const useStore = defineStore("store", {
  state: () => {
    return {
      movieData: [],
      cart: new Map(),
    };
  },
  actions: {
    async populateFirestore() {
      const genres = new Map([
        [28, "Actions"],
        [16, "Animation"],
        [80, "Crime"],
        [10751, "Family"],
        [878, "Science Fiction"],
      ]);

      genres.forEach(async (value, key) => {
        let data = (
          await axios.get("https://api.themoviedb.org/3/discover/movie", {
            params: {
              api_key: "1c54b96f434d2541d0e6ee64a16e8cb2",
              with_genres: key,
              include_adult: false,
            },
          })
        ).data.results;

        data = data.map((movie) => {
          return {
            id: movie.id,
            poster: movie.poster_path,
          };
        });
        await setDoc(doc(firestore, "Genre", value), { data });
      });
    },
    async getMovies(genre) {
      this.movieData = (
        await getDoc(doc(firestore, "Genre", genre))
      ).data().data;
    },
    addToCart(id, data) {
      this.cart.set(id, data);
    },
  },
});
