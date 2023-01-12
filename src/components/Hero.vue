<script setup>
</script>

<template>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Pacifico&family=Seymour+One&display=swap"
  rel="stylesheet">

  <div class="container">

    <div class="upper_text">
      <h3>
        Purchase Your Favourite Movies Now!
      </h3>
    </div>

    <div class="image">
      <img src="../assets/movies.png" class="movie_images">
    </div>

    <div class="lower_text">
      <h3>
        Login to Start Browsing
      </h3>
    </div>

  </div>

</template>

<style scoped>
.container {
  position: relative;
}

.movie_images {
  width: 100%;
  height: 100%;
}

.image {
  margin-top: 1%;
  margin-bottom: 1%;
}

.upper_text {
  text-align: center;
  font-size: 40px;
  margin-top: 1%;
  color: #E0E1DD;
  font-family: 'Indie Flower', sans-serif;
}

.lower_text {
  text-align: center;
  font-size: 40px;
  margin-bottom: 1%;
  color: #E0E1DD;
  font-family: 'Indie Flower', sans-serif;

}
</style>