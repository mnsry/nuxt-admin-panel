export const state = () => ({
  welcome: '',
  profile: {},
  sidebars: [],
  sidebar: {},
})

export const mutations = {
  updateWelcome(state, data) {
    state.welcome = data
  },
  updateProfile(state, data) {
    state.profile = data
  },
  updateSidebars(state, data) {
    state.sidebars = data
  },
  updateSidebar(state, data) {
    state.sidebar = data
  },
}

export const actions = {
  async getApiSidebars({ commit }) {
    await this.$axios
      .$get('/api/sidebar', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('X-CSRF-Token'),
        },
      })
      .then((res) => {
        commit('updateWelcome', res.welcome)
        commit('updateProfile', res.profile)
        commit('updateSidebars', res.data)
        commit('alert/setAlert', [res.message, 'success'], { root: true })
      })
  },
  async getApiSidebar({ commit }, id) {
    await this.$axios
      .$get(`/api/sidebar/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('X-CSRF-Token'),
        },
      })
      .then((res) => {
        commit('updateSidebar', res.data)
        commit('alert/setAlert', [res.message, 'success'], { root: true })
      })
  },
  async updateSidebar(
    { commit },
    // eslint-disable-next-line camelcase
    [id, title, prepend_icon, append_icon, sub_title]
  ) {
    await this.$axios
      .$patch(
        `/api/sidebar/${id}`,
        {
          title,
          prepend_icon,
          append_icon,
          sub_title,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('X-CSRF-Token'),
          },
        }
      )
      .then((res) =>
        commit('alert/setAlert', [res.message, 'success'], { root: true })
      )
      .catch((err) =>
        commit('alert/setAlert', [err.response.data.errors, 'error'], {
          root: true,
        })
      )
  },
}
