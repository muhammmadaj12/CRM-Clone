<template>
    <v-btn color="rgb(101, 101, 101)">{{ title }}</v-btn>
</template>
  
<script >
export default {
    name: 'Button',
    props: {
        title: String,
    },
}
</script>
  