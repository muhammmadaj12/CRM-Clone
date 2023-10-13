import axios from "axios";
import { Api_Base_URL } from "@/constants/BaseURL.js";
const token = localStorage.getItem("token");
const state = {
  formsData: {
    itemsPerPage: 5,
    headers: [
      {
        title: "ID",
        align: "center",
        key: "id",
      },
      {
        title: "Form Name",
        align: "center",
        key: "name",
      },
      {
        title: "URL",
        align: "center",
        key: "url",
      },
      {
        title: "Created At",
        align: "center",
        key: "created_at",
      },
      {
        title: "Actions",
        align: "center",
        key: "actions",
      },
    ],
    formsdetails: [], // Initialize formsdetails as an empty array to hold API data
  },
};

const getters = {
  formBody: (state) => state.formsData.formsdetails,
  formHeader: (state) => state.formsData.headers,
};

export const actions = {
  async fetchFormData({ commit }) {
    try {
      const response = await axios.get(`${Api_Base_URL}company/form`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const formData = response.data.data;
      commit("SET_FORM_DATA", formData); // Define a mutation to set the data
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  },

  async editForm({ commit }, formData) {
    try {
      const response = await axios.post(
        `${Api_Base_URL}jsons/edit`,
        formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.data === "edit success") {
        commit("EDIT_FORM", formData); // Define a mutation to update the form
      }
    } catch (error) {
      console.error("Error editing form:", error);
    }
  },

  async deleteForm({ commit }, item) {
    try {
      console.log("Deleting form with ID0:", item); // Add this line
      const response = await axios.delete( // Use DELETE request here
        `${Api_Base_URL}jsons/delete/${item}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      console.log("Delete response:", response.data); // Add this line
      if (response.data === "delete success") {
        commit("DELETE_FORM", item); // Call the mutation
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  }
};

const mutations = {
  SET_FORM_DATA(state, formData) {
    console.log("API Data:", formData);
    state.formsData.formsdetails = formData;
  },

  EDIT_FORM(state, formData) {
    // Find and update the form in the state
    const index = state.formsData.formsdetails.findIndex(
      (item) => item.id === formData.id
    );
    if (index !== -1) {
      state.formsData.formsdetails[index] = formData;
    }
  },

  DELETE_FORM(state, id) {
    console.log("Deleting form with ID from state1:", id); // Add this line
    // Remove the form from the state
    state.formsData.formsdetails = state.formsData.formsdetails.filter(
      (item) => item.id !== id
    );
  }
};


export default {
  state,
  getters,
  actions,
  mutations,
};
