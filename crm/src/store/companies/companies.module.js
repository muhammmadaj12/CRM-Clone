import { Api_Base_URL } from "@/constants/BaseURL.js";
import axios from "axios";
import {useToast} from 'vue-toast-notification';
const $toast = useToast();


const token = localStorage.getItem("token");

const state = {
  companyData: {
    itemsPerPage: 5,
    headers: [
      {
        title: "Company Name",
        align: "center",
        key: "name",
      },
      {
        title: "Industry",
        align: "center",
        key: "industry",
      },
      {
        title: "City",
        align: "center",
        key: "city",
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
    companies: [],
  },
};
const getters = {
  allCompanies: (state) => state.companyData.companies,
  allCompaniesHeaders: (state) => state.companyData.headers,
};

const actions = {
  async fetchCompanyData({ commit }) {
    try {
      const response = await axios.get(`${Api_Base_URL}users/company`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const companiesData = response.data.data;
      commit("setCompanyData", companiesData);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  },

  async addNewCompany({ commit }, { name, city, industry, owner_id }) {
    try {
      const response = await axios.post(
        `${Api_Base_URL}users/company`,
        {
          name,
          city,
          industry,
          owner_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Commit a mutation to update the store with the response data
      commit("addCompany", response.data);
      $toast.success('New Company Added',{
        position:'top',
        class:'vue-toast-notification '
      })
    } catch (error) {
      console.error("Error creating company:", error);
      throw new Error(error);
    }
  },

  async deleteCompany({ commit }, companyId) {
    try {
      const response = await axios.delete(
        `${Api_Base_URL}users/company/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      commit("removeCompany", companyId);
      $toast.success('Company Deleted Successfully',{
        position:'top',
        class:'vue-toast-notification '
      })
      return response.data; 
    } catch (error) {
      console.error("Error deleting company:", error);
      throw new Error(error);
    }
  },

  async updateCompany({ commit }, { id, name, industry, city }) {
    try {
      const response = await axios.put(
        `${Api_Base_URL}users/company/${id}`,
        {
          name,
          industry,
          city,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Commit a mutation to update the store with the response data
      commit("updateCompany", response.data);
      $toast.success('Company Updated Successfully',{
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
  setCompanyData(state, companiesData) {
    state.companyData.companies = companiesData;
  },

  addCompany(state, newCompany) {
    state.companyData.companies.push(newCompany);
  },

  removeCompany(state, companyId) {
    // Use the filter method to remove the company with the specified ID
    state.companyData.companies = state.companyData.companies.filter(
      (company) => company.id !== companyId
    );
  },

  updateCompany(state, updatedCompany) {
    // Find and update the company in the companies array
    const index = state.companyData.companies.findIndex(
      (company) => company.id === updatedCompany.id
    );
    if (index !== -1) {
      state.companyData.companies[index] = updatedCompany;
    }
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
