<template>
  <v-form>
    <div v-for="(field, index) in fields" :key="index">
      <v-text-field
        v-if="field.type === 'text' || field.type === 'email' || field.type === 'password'"
        :label="field.label"
        :type="field.type"
        v-model="formData[field.key]"
        class="custom-text-field"
        :error-messages="errorMessages[field.key]"
        @input="validateField(field)"
      ></v-text-field>

      <v-textarea
        v-else-if="field.type === 'textarea'"
        :label="field.label"
        v-model="formData[field.key]"
        class="custom-textarea"
        :error-messages="errorMessages[field.key]"
        @input="validateField(field)"
      ></v-textarea>
    </div>
  </v-form>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
  name: 'FormFields',
  props: {
    formData: Object,
    fields: Array,
  },
  setup(props) {
    const formDataRef = ref(props.formData);
    const errorMessages = {}; // Store error messages for each field

    // Watch for changes in formData and validate the fields
    watch(formDataRef, (newVal) => {
      props.fields.forEach((field) => {
        const fieldName = field.key;
        const fieldValue = newVal[fieldName];
        const fieldRules = field.rules || {};

        // Check required validation
        if (fieldRules.required && (!fieldValue || fieldValue.trim() === '')) {
          errorMessages[fieldName] = 'This field is required.';
        } else {
          errorMessages[fieldName] = ''; // Clear the error message
        }

        // Check email format validation (if it's an email field)
        if (field.type === 'email' && fieldRules.email && fieldValue && !isValidEmail(fieldValue)) {
          errorMessages[fieldName] = 'Please enter a valid email address.';
        }
      });
    });

    // Function to validate a single field on input
    const validateField = (field) => { // Receive the field object
      const fieldName = field.key;
      const fieldValue = formDataRef.value[fieldName];
      const fieldRules = field.rules || {};

      // Check required validation
      if (fieldRules.required && (!fieldValue || fieldValue.trim() === '')) {
        errorMessages[fieldName] = 'This field is required.';
      } else {
        errorMessages[fieldName] = ''; // Clear the error message
      }

      // Check email format validation (if it's an email field)
      if (field.type === 'email' && fieldRules.email && fieldValue && !isValidEmail(fieldValue)) {
        errorMessages[fieldName] = 'Please enter a valid email address.';
      }
    };

    const isValidEmail = (email) => {
      // Add your email format validation logic here
      // You can use a regular expression or a library like validator.js
      // For simplicity, we're using a basic example here
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    };

    return {
      formDataRef,
      validateField, // Expose the validateField function
      errorMessages,
    };
  },
};
</script>

<style scoped>
.custom-text-field {
  padding: 10px;
  /* Adjust the padding as needed */
}

.custom-textarea {
  padding: 10px;
  /* Adjust the padding as needed */
}
</style>
