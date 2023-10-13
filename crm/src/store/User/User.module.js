import {Api_Base_URL} from '@/constants/BaseURL.js'
import axios from 'axios';
const token=localStorage.getItem("token");
const state = {
    userData: {
      itemsPerPage: 5,
      header: [
        {
          title: "Name",
          align: "center",
          key: "name",
        },
        {
          title: "Email",
          align: "center",
          key: "email", 
        },
        {
          title: "Company",
          align: "center",
          key: "company_name",
        },
        {
          title: 'Permissions',
          align: 'center',
          key: 'permissions'
        },
        {
          title: 'Actions',
          align: 'center',
          key: 'actions'
        }
      ],
      
      user: [],
      companyName: [],
      companyID: [],
      permissionName: [],
      permissionID: [],
    },
  };
  
  const getters = {
    allusers: (state) => state.userData.user,
    allHeader:(state)=>state.userData.header,
    companyName: (state) => state.userData.companyName,
    companyID: (state) => state.userData.companyID,
    permissionName: (state) => state.userData.permissionName,
    permissionID: (state) => state.userData.permissionID,
  };
  
  const actions = {
    async fetchUserData({ commit }) {
      
      try {
        const response = await axios.get(`${Api_Base_URL}users`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        const userData = response.data.data;
        console.log(userData);
        commit('setUserData', userData );
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    
    async addNewUser({ commit }, { name, email, password, owner_id, company_name, permission}) {
      try {
          const response = await axios.post(
              `${Api_Base_URL}users/register`,
              {
                  name,
                  email,
                  password,
                  owner_id,
                  company_name,
                  permission
              },
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );
  
          // Commit a mutation to update the store with the response data
          commit('addUser', response.data);
      } catch (error) {
          console.error("Error adding user:", error);
          throw new Error(error);
      }
  },
  
  async deleteUser({ commit }, id) {
    try {
      const response = await axios.delete(`${Api_Base_URL}users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Commit a mutation to remove the deleted company from the store
      commit('removeUser', id);
  
      return response.data; // You can return the response if needed
    } catch (error) {
      console.error('Error deleting User:', error);
      throw new Error(error);
  }
    
  },
  
  async updateUser({ commit }, { id, name, email, password, company_name, permission }) {
    try {
      const response = await axios.put(
        `${Api_Base_URL}users/${id}`,
        {
          name,
          email,
          password,
          company_name,
          permission
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Commit a mutation to update the store with the response data
      commit('updateUser', response.data);
    } catch (error) {
      console.error("Error updating User:", error);
      throw new Error(error);
    }
  },
  async fetchCompanies({ commit }) {
    try {
      const response = await axios.get(`${Api_Base_URL}users/company`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const companyN = response.data.data.map(company => company.name);
      const companyI = response.data.data.map(company => company.id);
      console.log("company IDs = ",companyN )
      console.log("company IDs = ",companyI )
      commit('setCompanyName', companyN);
      commit('setCompanyID', companyI);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  },
  async fetchPermissions({ commit }) {
    try {
      const response = await axios.get(`${Api_Base_URL}permission`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const permissions=response.data.Data;
      const permissionN = permissions.map(permission => permission.name);
      const permissionI = permissions.map(permission => permission.id);
      console.log("Permission Name = ",permissionN )
      console.log("Permission IDs = ",permissionI )
      commit('setpermissionName', permissionN);
      commit('setpermissionID', permissionI);
    } catch (error) {
      console.error('Error fetching permission:', error);
    }
  },
  
};
  

      const mutations =
      {
          setUserData(state, userData ) {
            state.userData.user = userData ;
          },

          addUser(state, newUser) {
            state.userData.user.push(newUser);
          },

          removeUser(state, id) {
            // Use the filter method to remove the company with the specified ID
            state.userData.user = state.userData.user.filter(
              (user) => user.id !== id
            );
          },
          
          updateUser(state, updatedUser) {
            // Find and update the company in the companies array
            const index = state.userData.user.findIndex(
              (user) => user.id === updatedUser.id
            );
            if (index !== -1) {
              state.userData.user[index] = updatedUser;
            }
          },
          setCompanyName(state, companyNames) {
            state.userData.companyName = companyNames;
          },
          setCompanyID(state, companyIDs) {
            state.userData.companyID = companyIDs;
          },
          setpermissionName(state, permissionNames) {
            state.userData.permissionName = permissionNames;
          },
          setpermissionID(state, permissionIDs) {
            state.userData.permissionID = permissionIDs;
          },
      };
  export default {
    state,
    getters,
    actions,
    mutations,
  };
  