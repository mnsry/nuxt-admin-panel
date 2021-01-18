export const state = () => ({
  users: [],
  user: {},
  roles: [],
  roles_selected: [],
})

export const mutations = {
  updateUsers(state, data) {
    state.users = data
  },
  updateUser(state, data) {
    state.user = data
  },
  updateRoles(state, data) {
    state.roles = data
  },
  updateRoles_selected(state, data) {
    state.roles_selected = data
  },
}

export const actions = {
  async getUsers({ commit }) {
    await this.$axios
      .$get('/api/user', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('X-CSRF-Token'),
        },
      })
      .then((res) => {
        commit('updateUsers', res.data)
        commit('alert/setAlert', [res.message, 'success'], { root: true })
      })
  },
  async getUser({ commit }, id) {
    await this.$axios
      .$get(`/api/user/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('X-CSRF-Token'),
        },
      })
      .then((res) => {
        commit('updateUser', res.data)
        commit('updateRoles', res.roles)
        commit('updateRoles_selected', res.roles_selected)
        commit('alert/setAlert', [res.message, 'success'], { root: true })
      })
  },
  async createUser({ commit }, [name, email, password]) {
    await this.$axios
      .$post(
        '/api/user',
        { name, email, password },
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
  async updateUser({ commit }, { id, form }) {
    await this.$axios
      .$post(`/api/user/${id}`, form, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('X-CSRF-Token'),
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) =>
        commit('alert/setAlert', [res.message, 'success'], { root: true })
      )
      .catch((err) =>
        commit('alert/setAlert', [err.response.data.errors, 'error'], {
          root: true,
        })
      )
  },
  async deleteUser({ commit }, id) {
    await this.$axios
      .$delete(`/api/user/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('X-CSRF-Token'),
        },
      })
      .then((res) =>
        commit('alert/setAlert', [res.message, 'warning'], { root: true })
      )
  },
}
