export const state = () => ({
  messages: [],
  message: {},
})

export const mutations = {
  updateMessages(state, data) {
    state.messages = data
  },
  updateMessage(state, data) {
    state.message = data
  },
}

export const actions = {
  async getMessages({ commit }) {
    await this.$axios
      .$get(`/api/message`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('X-CSRF-Token'),
        },
      })
      .then((res) => {
        commit('updateMessages', res.data)
        commit('alert/setAlert', [res.message, 'success'], { root: true })
      })
  },
  async getMessage({ commit }, id) {
    await this.$axios
      .$get(`/api/message/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('X-CSRF-Token'),
        },
      })
      .then((res) => {
        commit('updateMessage', res.data)
        commit('alert/setAlert', [res.message, 'success'], { root: true })
      })
  },
  async createMessage({ commit }, [id, message]) {
    await this.$axios
      .$patch(
        `/api/message/${id}`,
        { message },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('X-CSRF-Token'),
          },
        }
      )
      .then(() => location.reload())
  },
  async deleteMessage({ commit }, id) {
    await this.$axios
      .$delete(`/api/message/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('X-CSRF-Token'),
        },
      })
      .then((res) => {
        commit('alert/setAlert', [res.message, 'success'], { root: true })
        setTimeout(() => {
          location.reload()
        }, 500)
      })
  },
}
