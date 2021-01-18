import pic from '~/assets/images/theme/1.jpg'

export const state = () => ({
  pic: '',
})

export const mutations = {
  setPic(state, data) {
    localStorage.setItem('theme', data)
    state.pic = localStorage.getItem('theme')
  },
  getLocalStorage(state) {
    const theme = localStorage.getItem('theme')
    !theme ? (state.pic = pic) : (state.pic = theme)
  },
}
