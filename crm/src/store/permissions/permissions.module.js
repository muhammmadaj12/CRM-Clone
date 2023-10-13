const state = {
  alowedPermissions:
  [
            {
                marketing: "MARKETING",
            },
        
            {
                sales: "SALES",
            },
        
        
            {
                contacts: "CONTACTS",
            },
]
}
const getters = {
  permissionItems: (state) => state.alowedPermissions,
};

const actions = {};
const mutations = {};
export default {
  state,
  getters,
  actions,
  mutations,
};
