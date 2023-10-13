<template>
   <div id="forms">
    <v-container style="margin-top: 100px;">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title class="text-h5 text-center" style="color: rgb(0, 0, 0);">
              Enter Your Blog Here
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="submitForm">
                <v-text-field
                  v-model="blog.title"
                  label="Title"
                  outlined
                  required
                  :rules="titleRules"
                ></v-text-field>
                <v-textarea
                  v-model="blog.description"
                  label="Description"
                  outlined
                  required
                  :rules="descriptionRules"
                ></v-textarea>
                <v-text-field
                  v-model="blog.imageUrl"
                  label="Image URL"
                  outlined
                  required
                  :rules="urlRules"
                ></v-text-field>
                <v-row justify="center">
                  <v-col cols="6">
                    <v-btn
                      type="submit"
                      block
                      class="product-btn"
                    >
                      Submit
                    </v-btn>
                  </v-col>
                  <v-col cols="6">
                    <router-link to="/dashboard/blogs">
                      <v-btn class="product-btn" block>
                        View Blog
                      </v-btn>
                    </router-link>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
   </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';

  export default {
    name:'BlogForm',
    data() {
      return {
        blog: {
          title: "",
          description: "",
          imageUrl: "",
        },

        titleRules: [
            value => {
                if (value?.length > 1) return true

                return 'Title can not be empty.'
            },
        ],
        descriptionRules: [
            value => {
                if (value?.length > 1) return true

                return 'Description can not be empty.'
            },
        ],
        urlRules: [
            value => {
                if (value?.length > 1) return true

                return 'Image Url can not be empty.'
            },
        ],
      };
    },
    methods: {
      ...mapActions(['createBlog']), 
      
     async submitForm() {
        if (this.formValidation()) {   
        await this.createBlog({
          title:this.blog.title,
          description:this.blog.description,
          imageUrl:this.blog.imageUrl
        })

          this.blog.title=''
        this.titleRules=''
        this.blog.description=''
        this.descriptionRules=''
        this.blog.imageUrl=''
        this.urlRules=''
        }
        

      },
  
      formValidation() {
        if (!this.blog.title || !this.blog.description || !this.blog.imageUrl) {
          return false;
        }
        return true;
      },
    },
  };
  </script>
  <style scoped>
  #forms{
    padding: 2% 0;
  }
  .v-card--variant-elevated {
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
    border: 0.5px solid rgb(185 185 185);
    background-color: #f6f6f6;
}
bg-primary {
    background-color:rgb(100, 100, 100)!important; 
}
</style>
  