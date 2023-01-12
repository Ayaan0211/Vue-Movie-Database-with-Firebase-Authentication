<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
const error = ref(false);

const login = () => {
  if (username.value === "tmdb" && password.value === "movies") {
    router.push("./purchase");
  } else {
    error.value = true;
  }
};
</script>

<template>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet">

  <div class="container">

    <div class="login_text">
      <h1>Login</h1>
    </div>

    <form @submit.prevent="login()">
      <div class="login_info">
        <input type="text" placeholder="Username" v-model="username" class="username" />
        <input type="password" placeholder="Password" v-model="password" class="password" />
      </div>
      <div class="login_button">
        <input type="submit" value="Login" class="actual_button" />
      </div>
    </form>

    <div v-if="error">
      <p>Incorrect Username/Password!</p>
    </div>
  </div>

</template>

<style scoped>
.container {
  width: 25rem;
  height: 25rem;
  border: 5px solid black;
  padding: 55px 85px 85px 85px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 75px;
  box-shadow: 0 0 500px #0D1B2A;
}

.username {
  height: 30px;
  margin-bottom: 10px;
}

.password {
  margin-bottom: 10px;
  height: 30px;
}

.login_text {
  margin-bottom: 50px;
  font-size: 25px;
  font-family: 'Quicksand', sans-serif;
}


.actual_button {
  width: 90px;
  height: 40px;
  border-radius: 10px;
  margin-top: 2rem;
  cursor: pointer;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>
