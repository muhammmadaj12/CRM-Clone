import { Api_Base_URL } from "@/constants/BaseURL";
import axios from "axios";
const token = localStorage.getItem("token");

import {useToast} from 'vue-toast-notification';
const $toast = useToast();


const state = {
  blogs: [],
};

const getters = {
  allBlogs: (state) => state.blogs,
};

const actions = {
  async createBlog({ commit }, { title, imageUrl, description }) {
    try {
      const response = await axios.post(
        `${Api_Base_URL}company/blogs`,
        {
          title,
          imageUrl,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      commit("addNewBlogs", response.data);
      $toast.success('New Blog Added',{
        position:'top',
        class:'vue-toast-notification '
      })
      return response.data;
    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  },

  async fetchBlogs({ commit }) {
    try {
      const response = await axios.get(`${Api_Base_URL}company/blogs`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
      });
      commit("setBlogs", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      throw error;
    }
  },

  async deleteBlog({ commit }, id) {
    try {
     const response= await axios.delete(`${Api_Base_URL}company/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("removeBlog", id);
      $toast.success('Blog Deleted Successfully',{
        position:'top',
        class:'vue-toast-notification '
      })
      return response.data
    } catch (error) {
      console.error("Error deleting blog:", error);
      throw error;
    }
  },

  async editBlogFromApi({ commit }, { id, title, description, imageUrl }) {
    try {
      const response = await axios.put(
        `${Api_Base_URL}company/blogs/${id}`,
        {
          title,
          description,
          imageUrl
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      $toast.success('Blog Edit Successfully',{
        position:'top',
        class:'vue-toast-notification '
      })
      commit("updateBlog", response.data);
    } catch (error) {
      console.error("Error updating Blog:", error);
      throw new Error(error);
    }
  },
}




const mutations = {
  addNewBlogs: (state, blog) => state.blogs.push(blog),
  setBlogs:(state, blogs)=> state.blogs=blogs,

  removeBlog:(state, blogId)=> {
    state.blogs = state.blogs.filter(
      (blog) => blog.id !== blogId
    );
  },

  updateBlog(state, editBlog) {
    const index = state.blogs.findIndex(
      (blog) => blog.id === editBlog.id
    );
    if (index !== -1) {
      state.blogs[index] = editBlog;
    }
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
