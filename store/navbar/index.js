export const state = () => ({
  navbar: '',
})

export const mutations = {
  updateNav(state, data) {
    state.navbar = data
  },
}
