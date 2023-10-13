<template>
    <v-container class="text-center mx-auto" style="margin-top: 100px;">
        <v-col cols="12" class="mb-2" style=" float: right;">
            <router-link :to="'/dashboard/blog-form'">
                <v-btn class="product-btn" ><i class="fa-solid fa-plus" style="color: #ffffff;"> ADD NEW BLOG</i></v-btn>
            </router-link>
        </v-col>
    <v-row justify="center">

        <!-- Button to navigate to the blog form -->

        <!-- List of blogs -->
        <v-col v-for="blog in allBlogs" :key="blog.id" cols="12" md="6">
            <v-card class="pa-4" color="lighten-1" height="100%">
                <i class="fa-regular fa-pen-to-square fa-lg"  @click="editBlog(blog)" style="color: #005eff; padding: 2%; float:right;"></i>
                <i class="fa-solid fa-trash-can fa-lg" @click="deleteBlog(blog.id)" style="color: #ff0000; padding: 2%; float:right;"></i>
                <v-img :src="blog.imageUrl" alt="Blog Image" height="200" class="mb-2" width="100%"></v-img>
                <v-card-title class="mb-2" style="color:blue lighten-1">{{ blog.title }}</v-card-title>
                <v-card-text>{{ blog.description }}</v-card-text>
            </v-card>
        </v-col>
    </v-row>
</v-container>

<!-- Edit Modal -->
<v-dialog v-model="editDialog" max-width="600px">
    <v-card>
        <v-card-title>Edit Blog</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field v-model="editedBlog.title" label="Title"></v-text-field>
                <v-text-field v-model="editedBlog.imageUrl" label="Image URL"></v-text-field>
                <v-textarea v-model="editedBlog.description" label="Description"></v-textarea>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue" @click="saveEdit">Save</v-btn>
            <v-btn color="red" @click="closeEdit">Cancel</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<!-- ... Rest of your code -->

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';

export default {
    name: 'BlogPage',
    data() {
        return {
            editDialog: false, // Control the edit modal
            editedBlog: {}, // Store the edited blog data
            selectedBlogId: null, // Store the id of the selected blog for editing
        };
    },
    computed: {
        ...mapGetters(['allBlogs'])
    },
    methods: {
        ...mapActions(['fetchBlogs', 'deleteBlog', 'editBlogFromApi']),
        editBlog(blog) {
            // Open the edit modal and set the selected blog data
            this.selectedBlogId = blog.id;
            this.editedBlog = {
                ...blog
            };
            this.editDialog = true;
        },

        async saveEdit() {
            console.log("Save button clicked"); // Check if the button click is registered
            console.log("Edited Blog Data:", this.editedBlog);
            try {
                await this.editBlogFromApi({
                    id: this.editedBlog.id,
                    title: this.editedBlog.title,
                    description: this.editedBlog.description,
                    imageUrl: this.editedBlog.imageUrl
                });
                await this.fetchBlogs()
                this.editDialog = false;
            } catch (error) {
                console.error("Error saving edit:", error);
                // Handle error if needed
            }
        },

        closeEdit() {
            // Close the edit modal without saving changes
            this.editDialog = false;
        },
    },

    mounted() {
        this.fetchBlogs();
    },
}
</script>
<style scoped>
.v-img__img--contain {
    margin-top: 6%;
}
.v-card--variant-elevated {
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
    border: 0.5px solid rgb(185 185 185);
    background-color: #f6f6f6;
}
</style>