<template>
    <div>
      <form ref="loginForm" @submit.prevent="login">
        <!-- Pass a deep copy of formFields to the Forms component -->
        <Forms :fields="JSON.parse(JSON.stringify(formFields))" @updateField="updateField" />
        
  
        <v-btn type="submit">Login</v-btn>
      </form>
    </div>
  </template>
  
  <script>
  import Forms from "@/components/commons/FormFields.vue";
  
  export default {
    components: {
      Forms,
    },
    data() {
      return {
        formFields: [
          { label: "Username", value: "", type: "text" },
          { label: "Password", value: "", type: "password" },
        ],
      };
    },
    methods: {
      login() {
        if (this.formFields.some((field) => !field.value.trim())) {
          console.error("Please fill in all fields.");
          return;
        }
        console.log("Form Fields:", this.formFields);
        this.formFields.forEach((field) => {
          field.value = "";
        });
        this.$refs.loginForm.resetValidation();
      },
      updateField({ index, value }) {
        this.formFields[index].value = value.toString();
      },
    },
  };
  </script>
  