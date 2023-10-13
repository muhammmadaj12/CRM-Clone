// sendemails.module.js

const state = {
  sentEmails: [
    {
      id: 1,
      from: 'sender@example.com',
      to: 'recipient1@example.com',
      subject: 'Subject 1',
      message: 'This is the first email message.',
    },
    {
      id: 2,
      from: 'sender@example.com',
      to: 'recipient2@example.com',
      subject: 'Subject 2',
      message: 'This is the second email message.',
    },
    // Add more email objects as needed
  ],
  selectedEmail: null, // Store the selected email for displaying details
};

const mutations = {
  SET_SELECTED_EMAIL(state, email) {
    state.selectedEmail = email;
  },
};

const actions = {
  selectEmail({ commit }, email) {
    commit('SET_SELECTED_EMAIL', email);
  },
};

const getters = {
  getSentEmails: (state) => state.sentEmails,
  getSelectedEmail: (state) => state.selectedEmail,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
