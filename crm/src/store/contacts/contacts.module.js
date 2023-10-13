import { Api_Base_URL } from "@/constants/BaseURL.js";
import axios from "axios";
import {useToast} from 'vue-toast-notification';
const $toast = useToast();

const token = localStorage.getItem("token");

const state = {
  contactsData: {
    itemsPerPage: 5,
    headers: [
      {
        title: "Email",
        align: "center",
        key: "email",
      },
      {
        title: "Created At",
        align: "center",
        key: "created_at",
      },
      {
        title: "Phone Number",
        align: "center",
        key: "number",
      },
      {
        title: "Actions",
        align: "center",
        key: "actions",
      },
    ],
    contacts: [],
  },
};

const getters = {
  allContacts: (state) => state.contactsData.contacts,
  allContactHeaders: (state) => state.contactsData.headers,
};

const actions = {
  async fetchContacts({ commit }) {
    try {
      const response = await axios.get(`${Api_Base_URL}users/contact`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const contactsData = response.data.data;
      commit("setContactsData", contactsData);
    } catch (error) {
      console.error("Error fetching contacts data:", error);
      throw error;
    }
  },

  async deleteContact({ commit }, contactId) {
    try {
      const response = await axios.delete(
        `${Api_Base_URL}users/contact/${contactId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      commit("removeContact", contactId);
      $toast.success('Contact Deleted Successfully',{
        position:'top',
        class:'vue-toast-notification '
      })
      return response.data; // You can return the response if needed
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw new Error(error);
    }
  },

  async addNewContact({ commit }, { number, email, user_id }) {
    try {
      const response = await axios.post(
        `${Api_Base_URL}users/contact`,
        {
          number,
          email,
          user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Commit a mutation to update the store with the response data
      commit("addContact", response.data);
      $toast.success('New Contact Added',{
        position:'top',
        class:'vue-toast-notification '
      })
      return response.data; // You can return the response if needed
    } catch (error) {
      console.error("Error creating contact:", error);
      throw new Error(error);
    }
  },

  async updateContact({ commit }, { id, email, number }) {
    try {
      const response = await axios.put(
        `${Api_Base_URL}users/contact/${id}`,
        {
          email,
          number
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Commit a mutation to update the store with the response data
      commit("updateContact", response.data);
      $toast.success('Contact Updated Successfully',{
        position:'top',
        class:'vue-toast-notification '
      })
    } catch (error) {
      console.error("Error updating contact:", error);
      throw new Error(error);
    }
  },
  async syncContact({ commit }) {
    try {
      const response = await axios.get(
        `${Api_Base_URL}users/contact/sync`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Commit a mutation to update the store with the response data
      commit("syncContact", response.data);
      $toast.success('sync Contact Successfully',{
        position:'top',
        class:'vue-toast-notification '
      })
    } catch (error) {
      console.error("Error updating contact:", error);
      throw new Error(error);
    }
  }
};

const mutations = {
  setContactsData(state, contactsData) {
    state.contactsData.contacts = contactsData;
  },

  removeContact(state, contactId) {
    state.contactsData.contacts = state.contactsData.contacts.filter(
      (contact) => contact.id !== contactId
    );
  },

  addContact: (state, newContact) =>
    state.contactsData.contacts.push(newContact),

    updateContact(state, updatedContact) {
      const index = state.contactsData.contacts.findIndex(
        (contact) => contact.id === updatedContact.id
      );
      if (index !== -1) {
        state.contactsData.contacts[index] = updatedContact;
      }
    },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
