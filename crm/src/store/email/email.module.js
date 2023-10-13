import { Api_Base_URL } from "@/constants/BaseURL.js";
import axios from "axios";
export const accessToken = localStorage.getItem("AccessToken");
let num=1;
const token = localStorage.getItem("token");
const state = {
      receiveEmails: [],
      sendEmailsData: [],
  };
  

const getters={
    allReceivedEmails: (state) => state.receiveEmails,
    allSendEmails: (state) => state.sendEmailsData,
}

const actions={
  
    async fetchEmails({ commit }) {
        try {
          console.log("Fetching emails...");
          const response = await axios.post(`${Api_Base_URL}emails/inbox`,{
            accessToken
          },{
            headers: {
              Authorization: `Bearer ${token}`, // Include both tokens in the header
            },
          }); // Use await to wait for the response
    
          // Check if the response status is OK (200)
          if (response.status === 200) {
            // Access the data from the response
            const responseData = response.data;
    
            // Commit the data to your Vuex store mutation
            console.log("respondeData",responseData)
            commit("setReceiveEmails", responseData);
    
            return responseData; // Return the data if needed
          } else {
            // Handle the case where the response status is not OK
            console.error("Error fetching emails. Response status:", response.status);
            throw new Error("Failed to fetch emails");
          }
        } catch (e) {
          console.error("An error occurred:", e);
          throw e;
        }
      },
      async viewSentEmails({ commit }) {
        try {
          console.log("Fetching emails...");
          const response = await axios.post(`${Api_Base_URL}emails/sent`,{
            accessToken
          },{
            headers: {
              Authorization: `Bearer ${token}`, // Include both tokens in the header
            },
          }); // Use await to wait for the response
    
          // Check if the response status is OK (200)
          if (response.status === 200) {
            // Access the data from the response
            const responseData = response.data;
    
            // Commit the data to your Vuex store mutation
            console.log("respondeData",responseData)
            commit("setSendEmails", responseData);
    
            return responseData; // Return the data if needed
          } else {
            // Handle the case where the response status is not OK
            console.error("Error fetching emails. Response status:", response.status);
            throw new Error("Failed to fetch emails");
          }
        } catch (e) {
          console.error("An error occurred:", e);
          throw e;
        }
      }
}

const mutations={
    setReceiveEmails: (state, receiveEmailsData) => {
        state.receiveEmails = receiveEmailsData;
      },
      setSendEmails: (state, sendEmailData) => {
        state.sendEmailsData = sendEmailData;
      }
}

export default{
    state,
    getters,
    actions,
    mutations
}