import { defineStore } from "pinia";
import axios from "axios";

export const useStore = defineStore("store", {
  state: () => {
    return {
      movieData: [],
      cart: new Map(),
    };
  },
  actions: {
    async getMovies() {
      let data = (
        await axios.get("https://api.themoviedb.org/3/trending/movie/week", {
          params: {
            api_key: "1c54b96f434d2541d0e6ee64a16e8cb2",
            include_adult: false,
          },
        })
      ).data.results;
      this.movieData = data.map((movie) => {
        return {
          id: movie.id,
          poster: movie.poster_path,
        };
      });
    },
    addToCart(id, data) {
      this.cart.set(id, data);
      console.log(this.cart);
      }
    }
  },
);
