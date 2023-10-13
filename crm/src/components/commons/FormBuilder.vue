<template>
  <div id="forms">
    <v-container>
      <v-row>
        <v-col cols="12" id="cForm">
          <!-- Text field for form name -->
          <v-text-field v-model="formName" label="Form Name"></v-text-field>

          <!-- Form builder container -->
          <div class="build-wrap form-wrap-div"></div>
        </v-col>
        <div id="publish-btn">
          <v-btn style="background-color: rgb(102, 161, 106);" @click="requestPublish">Publish Form</v-btn>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import 'https://code.jquery.com/jquery-3.6.0.min.js';
import 'https://code.jquery.com/ui/1.12.1/jquery-ui.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/jQuery-formBuilder/3.9.10/form-builder.min.js';
import axios from 'axios';
import { Api_Base_URL } from '@/constants/BaseURL.js';
const token = localStorage.getItem("token");

export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      formName: '', // Add a data property for the form name
      formData: null, // Add a data property to store form data
    };
  },
  methods: {
    requestPublish() {
      // Get the form data as JSON (replace 'formBuilder' with your actual form builder reference)
      this.formData = $('.build-wrap').formBuilder('getData', 'json');

      // Create an object containing the form name and data
      const formDataToSend = {
        name: this.formName,
        json: this.formData,
      };

      // Send the formDataToSend to your API using an HTTP request
      // Replace the following code with your actual API call
      axios.post(`${Api_Base_URL}company/form`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        // Handle the API response as needed
        console.log('Form published:', response.data);

        // Show an alert when data is submitted
        alert('Your data is submitted');

        // console.log("Submitted url", responsce);

        // Navigate to the /dashboard/forms route
        this.$router.push('/dashboard/forms');
      })
      .catch(error => {
        console.error('Error publishing form:', error);
      });
    },
  },
  mounted() {
    // Initialize the form builder after the component is mounted
    $('.build-wrap').formBuilder(); // Corrected class name
  },
};
</script>

<style scoped>
#publish-btn {
  margin-top: -3.8%;
  margin-left: 74%;
  height: 41px;
}
#publish-btn button {
  width: 83%;
  height: 33px;
}
#forms {
  padding: 5% 0;
}
</style>
