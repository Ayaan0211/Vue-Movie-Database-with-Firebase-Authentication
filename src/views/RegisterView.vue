<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../firebase/index";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const router = useRouter();

const username = ref("");
const email = ref("");
const password1 = ref("");
const password2 = ref("");

const registerUserByEmail = async () => {
  if (password1.value !== password2.value) {
    console.log("Password issue");
    return;
  }
  else {
    router.push("./purchase")
  }
  try {
    await createUserWithEmailAndPassword(auth, email.value, password1.value);
  } catch (error) {
    console.log(error);
  }
};

const registerUserByGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const user = await signInWithPopup(auth, provider);
  console.log(user);
  router.push("./purchase")
};
</script>

<template>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

  <div class="container">

    <div class="register_text">
      <h1>Register</h1>
    </div>

    <form @submit.prevent="registerUserByEmail()">
      <div class="login_info">
        <input v-model="email" type="email" placeholder="Email" class="email"/> 
        <input v-model="password1" type="password" placeholder="Password" class="password1"/>
        <input v-model="password2" type="password" placeholder="Re-enter Password"  class="password2"/>
        <input type="submit" value="Register" class="actual_button" @click=""/>
      </div>
    </form>

    <div class="google_icon">
      <i class="fa-brands fa-google" @click="registerUserByGoogle"></i>
    </div>
  </div>

</template>

<style scoped>
.container {
  width: 27rem;
  height: 27rem;
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

.email, .password1, .password2 {
  height: 25px;
  margin-bottom: 5px;
}


.register_text {
  margin-bottom: 40px;
  font-size: 25px;
  font-family: 'Quicksand', sans-serif;
}


.actual_button {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90px;
  height: 40px;
  border-radius: 10px;
  margin-top: 1.2rem;
  cursor: pointer;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.google_icon {
  padding-top: 1.5rem;
  font-size: 2rem;
  cursor: pointer;
}
</style>
