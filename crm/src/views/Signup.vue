<template>
  <v-app id="signup-bg">
    <center><img  src="@/assets/logo.png" alt=""></center>
    <div id="login-main">
      <v-card style="padding: 8% 2px">
        <v-card-title class="headline">
          <h2 style="text-align: center">SignUp</h2>
        </v-card-title>
        <v-card-text>
          <forms :formData="formData" :fields="fields"></forms>
          <Button @click="signup" style="width: 100%" :title="buttonTitle" />
        </v-card-text>
        <p style="text-align: center">
          Already have an account?
          <router-link to="/">Login</router-link>
        </p>
      </v-card>
    </div>
  </v-app>
</template>
  
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Forms from "@/components/commons/FormFields.vue";
import Button from "@/components/commons/Button.vue";
import { Api_Base_URL } from '@/constants/BaseURL.js';

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      formData: {},
      buttonTitle: "Sign Up",
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be in xyz@domain.com format",
      ],
      fields: [
        { key: "name", label: "name", type: "text" },
        { key: "email", label: "email", type: "email" },
        { key: "password", label: "password", type: "password" },
      ],
    };
  },
  components: {
    Forms,
    Button,
  },
  methods: {
    async signup() {
      // console.log("Signup data", this.formData)
      try {
        // this.formData = {
        //   name: this.name,
        //   email: this.email,
        //   password: this.password,
        // };

        const response = await axios.post(
          `${Api_Base_URL}users/register`,
          this.formData
        );

        // Check the response and handle success or error accordingly
        if (response.data.message === "Registeration Successfull") {
          alert("Registration is Successful");
          this.$router.push("/"); // Assuming you're using Vue Router
        } else {
          // Handle registration error
          console.error("Registration failed:", response.data.message);
        }
      } catch (error) {
        // Handle network or other errors
        console.error("An error occurred:", error);
      }
    },

  },
};
</script>
<style scoped>
#login-main {
  width: 35%;
  margin: auto;
}

#signup-bg {
  background-color: rgb(225, 225, 225);
  background-image: url("@/assets/bg.svg");
}
</style>
  