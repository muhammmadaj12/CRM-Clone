import { Api_Base_URL } from "@/constants/BaseURL.js";
import axios from "axios";
import {useToast} from 'vue-toast-notification';


const token = localStorage.getItem("token");
const $toast = useToast();

const state = {
  dealData: {
    itemsPerPage: 5,
    headers: [
      {
        title: "Name",
        align: "center",
        key: "name",
      },
      {
        title: "Status",
        align: "center",
        key: "status",
      },
      {
        title: "Description",
        align: "center",
        key: "description",
      },
      {
        title: "Company Name",
        align: "center",
        key: "company_name",
      },
      {
        title: "Actions",
        align: "center",
        key: "actions",
      },
    ],
    deals: [],
  },
  selectedStatus: "active",
};

const getters = {
  allDeals: (state) => state.dealData.deals,
  allDealsHeaders: (state) => state.dealData.headers,
  selectedStatus: (state) => state.selectedStatus,
};

const actions = {
 
  async fetchDeals({ commit }, status) {
    try {
      const response = await axios.get(`${Api_Base_URL}company/${status}deal`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("sta", status);
      const dealData = response.data.data;
      commit("setdealData", dealData);
      // Update the selected status in the state
      commit("setSelectedStatus", status);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  },

  async deleteDeal({ commit }, dealId) {
    try {
      const response = await axios.delete(
        `${Api_Base_URL}company/deal/${dealId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      commit("removeDeal", dealId);
      $toast.success('Deal Deleted Successfully',{
        position:'top',
        class:'vue-toast-notification '
      })
      return response.data;
    } catch (error) {
      console.error("Error deleting deal:", error);
      throw new Error(error);
    }
  },

  async addNewDeal({ commit }, { name, description, status }) {
    try {
      const response = await axios.post(
        `${Api_Base_URL}company/deal`,
        {
          name,
          description,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Commit a mutation to update the store with the response data
      commit("addDeal", response.data);
      $toast.success('Deal Added Successfully',{
        position:'top',
        class:'vue-toast-notification '
      })
    } catch (error) {
      console.error("Error creating company:", error);
      throw new Error(error);
    }
  },

  async updateDeals({ commit }, { id, name, description, status }) {
    try {
      const response = await axios.put(
        `${Api_Base_URL}company/deal/${id}`,
        {
          name,
          description,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      // Commit a mutation to update the store with the response data
      commit("updateDeal", response.data);
      $toast.success('Deal Updated Successfully',{
        position:'top',
        class:'vue-toast-notification '
      })
    } catch (error) {
      console.error("Error updating company:", error);
      throw new Error(error);
    }
  },
};

const mutations = {
  setdealData(state, dealData) {
    state.dealData.deals = dealData;
  },
  setSelectedStatus(state, status) {
    state.selectedStatus = status;
  },
  removeDeal(state, dealId) {
    state.dealData.deals = state.dealData.deals.filter((d) => d.id !== dealId);
  },
  addDeal(state, newDeal) {
    state.dealData.deals.push(newDeal);
  },

  updateDeal(state, updatedDeal) {
    const index = state.dealData.deals.findIndex(
      (d) => d.id === updatedDeal.id
    );
    if (index !== -1) {
      state.dealData.deals[index] = updatedDeal;
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
