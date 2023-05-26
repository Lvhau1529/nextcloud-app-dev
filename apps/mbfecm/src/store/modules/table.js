const state = {
  selectedRowKeys: [],
};

// getters
const getters = {
  getSelectedRowKeys(state) {
    // Replace all escaped commas with regular commas
    const handleReplace = state.selectedRowKeys.map((str) =>
      str.replace(/\\,/g, ",")
    );
    // Parse the JSON strings into objects
    return handleReplace.map((str) => JSON.parse(str));
  },
};

// mutations
const mutations = {
  SET_SELECTED_ROW_KEYS(state, payload) {
    state.selectedRowKeys = payload;
  },
};

// actions
const actions = {
  setSelectedRowKeys({ commit }, payload) {
    commit("SET_SELECTED_ROW_KEYS", payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
