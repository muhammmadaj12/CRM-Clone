<template>
    <div>
      <v-container>
        <h1>Edit Form</h1>
        <v-text-field v-model="editedForm.name" label="Form Name"></v-text-field>
        
        <!-- Bind the content of the <div> to a data property -->
        <div :content="editedForm.json" class="build-wrap form-wrap-div" id="jquery-form-builder"></div>
        
        <v-btn @click="saveForm">Save</v-btn>
      </v-container>
    </div>
  </template>
  
  <script>
  import 'https://code.jquery.com/jquery-3.6.0.min.js';
  import 'https://code.jquery.com/ui/1.12.1/jquery-ui.js';
  import 'https://cdnjs.cloudflare.com/ajax/libs/jQuery-formBuilder/3.9.10/form-builder.min.js';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        editedForm: {
          id: null,
          name: '',
          json: '',
        },
      };
    },
    created() {
      // Retrieve the query parameters from the URL
      const queryParams = this.$route.query;
      this.editedForm.id = queryParams.id;
      this.editedForm.name = queryParams.name;
      this.editedForm.json = queryParams.json;
    },
    mounted() {
      // Initialize your jQueryFormBuilder here with the JSON data
      this.initializeFormBuilder();
    },
    methods: {
      initializeFormBuilder() {
  try {
    // Use jQuery to manipulate the content of the div
    const formBuilderContent = JSON.parse(this.editedForm.json);
    $('#jquery-form-builder').formBuilder({
      formData: formBuilderContent, // Prefill the form with JSON data
    });
  } catch (error) {
    console.error('Error parsing JSON:', error);
    // Handle the error, e.g., display an error message to the user
  }
},
      saveForm() {
    // Get the updated JSON data from the form builder
    const updatedFormContent = $('#jquery-form-builder').formBuilder('getData', 'json');

    // Update the editedForm's JSON data
    this.editedForm.json = updatedFormContent;

    // Send a POST request to your API endpoint
    axios
      .post('http://10.0.10.57:8000/api/jsons/edit', {
        id: this.editedForm.id,
        name: this.editedForm.name,
        json: this.editedForm.json,
      })
      .then((response) => {
        // Handle the response from the API
        const responseData = response.data;

        // Assuming your API returns a message and data
        if (responseData.message === 'Form edit Successfully') {
          // Handle success, e.g., show a success message to the user
          alert('Form edited successfully');
        } else {
          // Handle any error or validation messages from the API
          console.error('Error editing form:', responseData.message);
        }

        // After saving, navigate back to the forms page
        this.$router.push('/dashboard/forms');
      })
      .catch((error) => {
        // Handle any network errors or request failures
        console.error('Error sending form edit request:', error);
      });
  },
    },
  };
  </script>
  