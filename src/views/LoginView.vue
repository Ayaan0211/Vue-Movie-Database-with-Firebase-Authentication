<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../firebase/index";


const router = useRouter();
const username = ref("");
const password = ref("");
const error = ref(false);

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, username.value, password.value);
    router.push("./purchase");
  } catch {
    error.value = true;
  }
};
const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const user = await signInWithPopup(auth, provider);
  router.push('/purchase');
}

</script>

<template>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">


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

    <div class="google_icon">
      <i class="fa-brands fa-google" @click="loginWithGoogle"></i>
    </div>

    <div class="register">
      <p class="not_user">Not a User?</p>
      <RouterLink to="/register" custom v-slot="{ navigate }">
        <p @click="navigate" role="link" class="register_now">Register Now</p>
      </RouterLink>
    </div>

    <div v-if="error" class="incorrect">
      <p class="incorrect_text">Incorrect Username/Password!</p>
    </div>
  </div>

</template>

<style scoped>
.google_icon {
  padding-top: 1.5rem;
  font-size: 2rem;
  cursor: pointer;
}

.container {
  width: 30rem;
  height: 31rem;
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
  margin-top: 0.5rem;
  cursor: pointer;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.incorrect {
  margin-top: 1rem;
  margin-bottom: 2rem;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}

.incorrect_text {
  text-align: center;
}

.register {
  padding-top: 2rem;
}

.not_user {
  font-family: 'Quicksand', sans-serif;
  font-size: 1.2rem;
}

.register_now {
  font-family: 'Quicksand', sans-serif;
  font-size: 1.2rem;
  cursor: pointer;
  text-decoration: underline;
}
</style>
