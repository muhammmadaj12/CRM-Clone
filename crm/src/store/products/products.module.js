import axios from "axios";
import { Api_Base_URL } from "@/constants/BaseURL.js";
const token = localStorage.getItem("token");

const state = {
  products: [], // Store the list of products
};

const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  // Mutation to update a product
  UPDATE_PRODUCT(state, updatedProduct) {
    const index = state.products.findIndex((product) => product.id === updatedProduct.id);
    if (index !== -1) {
      // Update the product in the array with the updated data
      state.products[index] = updatedProduct;
    }
  },

// Mutation to delete a product
DELETE_PRODUCT(state, productId) {
    // Find the index of the product to delete
    const index = state.products.findIndex((product) => product.id === productId);
    if (index !== -1) {
      // Remove the product from the array
      state.products.splice(index, 1);
    }
  },
};

const actions = {
  // Action to fetch products from the API
  async fetchProducts({ commit }) {
    try {
      const response = await axios.get(`${Api_Base_URL}users/product`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      const products = response.data.data;
      commit("SET_PRODUCTS", products);
    } catch (error) {
      console.error(error);
    }
  },

  // Action to delete a product by ID
  async deleteProductById({ dispatch }, productId) {
    try {
      const response = await axios.delete(`${Api_Base_URL}users/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Check if the response status is 200 or whatever success status code your API uses
      if (response && response.status === 200) {
        // After successfully deleting the product, fetch the updated list of products
        dispatch("fetchProducts");
      }
  
      return response; // Return the response object
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async updateProduct({ commit }, { productId, updatedProductData }) {
    try {
      const response = await axios.put(
        `${Api_Base_URL}users/product/${productId}`,
        updatedProductData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Commit the mutation to update the product in the store
      commit("UPDATE_PRODUCT", response.data.data);

      // You can also return the updated product if needed
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

};

const getters = {
  // Getter to get the list of products
  allProducts: (state) => state.products,

};

export default {
  state,
  mutations,
  actions,
  getters,
};
