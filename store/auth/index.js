export const state = () => ({
  key: 'HvfdZD*T%ZSD$G90_FGJ*LFG%6tyg*%BD&D^Fui90Z',
  wait: false,
})

export const mutations = {
  updateWait(state) {
    state.wait = !state.wait
  },

  login(state, data) {
    localStorage.setItem('X-CSRF-Token', data)
    localStorage.setItem('Credentials ', state.key)
    this.$router.push({ name: 'panel' })
  },

  logout() {
    localStorage.removeItem('X-CSRF-Token')
    localStorage.removeItem('Credentials ')
    this.$router.push({ name: 'panel-login' })
  },

  getLocalStorageNull(state) {
    if (localStorage.getItem('Credentials ') === state.key) {
      this.$router.push({ name: 'panel' })
    }
  },

  getLocalStorage(state) {
    if (localStorage.getItem('Credentials ') !== state.key) {
      localStorage.removeItem('X-CSRF-Token')
    }
  },
}

export const actions = {
  async login({ commit, dispatch }, [email, password]) {
    await this.$axios
      .$post('/login', { email, password })
      .then((res) => {
        commit('login', res)
      })
      .catch((err) => {
        commit('logout')
        alert(err.response.data.message)
      })
    await commit('updateWait')
  },

  async logout({ commit }) {
    await this.$axios.$post('/logout')
    await commit('logout')
  },
}
