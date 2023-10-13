<template>
    <v-app id="login-bg">
        <center><img  src="@/assets/logo.png" alt=""></center>
        <div id="login-main">
            <v-card style="padding: 12% 2px">
                <v-card-title class="headline">
                    <h2 style="text-align: center">Login</h2>
                </v-card-title>
                <v-card-text>
                    <FormFields :formData="formData" :fields="fields" :errorMessages="errorMessages" />
                    <Button @click="login" style="width: 100%" :title="buttonTitle" />
                </v-card-text>
                <p style="text-align: center">
                    Didn't have an account?
                    <router-link to="/Signup">SignUp</router-link>
                </p>
            </v-card>
        </div>
        <!-- <bg-image><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#E1E1E1" fill-opacity="2" d="M0,192L80,176C160,160,320,128,480,122.7C640,117,800,139,960,128C1120,117,1280,75,1360,53.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg></bg-image> -->

    </v-app>
</template>
  
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import FormFields from "@/components/commons/FormFields.vue";
import Button from "@/components/commons/Button.vue";
import { Api_Base_URL } from '@/constants/BaseURL.js';
import axios from 'axios';

export default {
    data() {
        return {
        email: "",
        password: "",
        formData: {}, // Remove this line
        buttonTitle: "Login",
        fields: [
            { key: "email", label: "Email", type: "email", rules: { required: true, email: true } },
            { key: "password", label: "Password", type: "password", rules: { required: true, email: false } },
        ],
    };
    },
    components: {
        FormFields,
        Button,
    },
        methods: {
    async login() {
        try {
            const response = await axios.post(`${Api_Base_URL}users/login`, {
                email: this.formData.email,
                password: this.formData.password
            });

            // Check the response status code or data to handle success or errors.
            if (response.status === 200) {
                // Successful login, store the token and handle it here.
            this.id = response.data.user.id;
            this.token = response.data.token;
            this.owner_id = response.data.user.owner_id;
            this.permissions = response.data.user.permissions; // Assuming the token is returned as "token" in the response
            localStorage.setItem("token", this.token); // Store the token in local storage for future use
            localStorage.setItem("ID", this.id);
            localStorage.setItem("Owner ID", this.owner_id);
            localStorage.setItem("permissions", JSON.stringify(this.permissions)); 
            alert("Login successful");
            this.$router.push("/dashboard/contacts");
            } else {
                // Handle other status codes or errors here.
                alert("Login failed");
            }
        } catch (error) {
            // Handle network errors or exceptions here.
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
#login-bg{
    background-color: rgb(225, 225, 225);
    background-image: url("@/assets/bg.svg");
}
/* body {
 
} */
</style>
  