<script setup>
</script>

<template>

  <div class="container">

    <div class="header">

      <RouterLink to="/login" custom v-slot="{ navigate }">
        <button @click="navigate" role="link" class="login_button">Login</button>
      </RouterLink>

      <RouterLink to="/register" custom v-slot="{ navigate }">
        <button @click="navigate" role="link" class="register_button">Register</button>
      </RouterLink>

      <a href="https://www.instagram.com/" target="_blank"><i class="icons fa-brands fa-instagram"></i></a>
      <a href="https://www.linkedin.com/" target="_blank"><i class="icons fa-brands fa-linkedin"></i></a>
      <a href="https://www.twitter.com/" target="_blank"><i class="icons fa-brands fa-twitter"></i></a>

    </div>

    <div class="header_banner">
      <img src="../assets/moviebanner.jpg" class="movie_banner" />
    </div>

  </div>

</template>

<style scoped>
.container {
  border: 5px solid black;
}

.header {
  overflow: hidden;
}

.icons {
  font-size: 60px;
  float: right;
  color: #1B263B;
  padding-right: 15px;
}

button {
  float: right;
  background-color: #263654;
  color: #E0E1DD;
  cursor: pointer;
  border-radius: 10px;
}

.login_button,
.register_button {
  height: 50px;
  width: 90px;
  margin-right: 10px;
  margin-top: 5px;
  font-size: 16px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.header_banner {
  width: 20%;
  height: auto;
  margin-bottom: 2%;
  margin-left: auto;
  margin-right: auto;
}

.movie_banner {
  width: 100%;
  height: 100%;
}
</style>