export const state = () => ({
  messages: [],
})

export const mutations = {
  updateMessages(state, data) {
    state.messages = data
  },
}

export const actions = {
  async getMessage({ commit }) {
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
  async createMessage({ commit }, [id, message]) {
    await this.$axios.$patch(
      `/api/message/${id}`,
      { message },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('X-CSRF-Token'),
        },
      }
    )
  },
}
