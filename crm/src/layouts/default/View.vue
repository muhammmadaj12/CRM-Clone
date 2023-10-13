<template>
 <v-app>
    <Header />
    <router-view />
  <Footer/>
</v-app>
</template>

<script setup>
  import Header from "@/views/Header.vue"
  import Footer from "@/views/Footer.vue"
</script>
