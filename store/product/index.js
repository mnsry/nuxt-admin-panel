export const state = () => ({
  products: [],
  product: {},
  user: {},
})

export const mutations = {
  updateProducts(state, data) {
    state.products = data
  },
  updateProduct(state, data) {
    state.product = data
  },
  updateUser(state, data) {
    state.user = data
  },
}

export const actions = {
  async getProducts({ commit }) {
    await this.$axios
      .$get('/api/product', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('X-CSRF-Token'),
        },
      })
      .then((res) => {
        commit('updateProducts', res.data)
        commit('alert/setAlert', [res.message, 'success'], { root: true })
      })
  },
  async getProduct({ commit }, id) {
    await this.$axios
      .$get(`/api/product/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('X-CSRF-Token'),
        },
      })
      .then((res) => {
        commit('updateProduct', res.data)
        commit('updateUser', res.data.user)
        commit('alert/setAlert', [res.message, 'success'], { root: true })
      })
  },
  async createProduct({ commit }, data) {
    await this.$axios
      .$post('/api/product', data, {
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

  async updateProduct({ commit }, { id, data }) {
    await this.$axios
      .$post(`/api/product/${id}`, data, {
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
  async deleteProduct({ commit }, id) {
    await this.$axios
      .$delete(`/api/product/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('X-CSRF-Token'),
        },
      })
      .then((res) =>
        commit('alert/setAlert', [res.message, 'warning'], { root: true })
      )
  },
}
