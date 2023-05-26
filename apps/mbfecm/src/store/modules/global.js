const state = {
  folderSelected: "",
  treeData: [],
};

// getters
const getters = {};

// mutations
const mutations = {
  SET_FOLDER_SELECTED(state, payload) {
    state.folderSelected = payload;
  },
  SET_TREE_DATA(state, payload) {
    state.treeData = payload;
  },
};

// actions
const actions = {
  setFolderSelected({ commit }, payload) {
    commit("SET_FOLDER_SELECTED", payload);
  },
  setTreeData({ commit }, payload) {
    commit("SET_TREE_DATA", payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
