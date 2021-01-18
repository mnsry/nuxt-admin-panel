export const state = () => ({
  roles: [],
  role: {},
  permissions: [],
  permissions_selected: [],
  permissions_display_table: [],
})

export const mutations = {
  updateRoles(state, data) {
    state.roles = data
  },
  updateRole(state, data) {
    state.role = data
  },
  updatePermissions(state, data) {
    state.permissions = data
  },
  updatePermissions_selected(state, data) {
    state.permissions_selected = data
  },
  updatePermissions_display_table(state, data) {
    state.permissions_display_table = data
  },
}

export const actions = {
  async getRoles({ commit }) {
    await this.$axios
      .$get('/api/role', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('X-CSRF-Token'),
        },
      })
      .then((res) => {
        commit('updateRoles', res.data)
        commit('alert/setAlert', [res.message, 'success'], { root: true })
      })
  },
  async getRole({ commit }, id) {
    await this.$axios
      .$get(`/api/role/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('X-CSRF-Token'),
        },
      })
      .then((res) => {
        commit('updateRole', res.data)
        commit('updatePermissions', res.permissions)
        commit('updatePermissions_selected', res.permissions_selected)
        commit('updatePermissions_display_table', res.permissions_display_table)
        commit('alert/setAlert', [res.message, 'success'], { root: true })
      })
  },
  // eslint-disable-next-line camelcase
  async createRole({ commit }, [name, display_name]) {
    await this.$axios
      .$post(
        '/api/role',
        { name, display_name },
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
  // eslint-disable-next-line camelcase
  async updateRole({ commit }, [id, name, display_name, permissions]) {
    await this.$axios
      .$patch(
        `/api/role/${id}`,
        { name, display_name, permissions },
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
  async deleteRole({ commit }, id) {
    await this.$axios
      .$delete(`/api/role/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('X-CSRF-Token'),
        },
      })
      .then((res) =>
        commit('alert/setAlert', [res.message, 'warning'], { root: true })
      )
  },
}
