export const state = () => ({
  alert: [],
  alertStatus: '',
})

export const mutations = {
  setAlert(state, [data, status]) {
    state.alert = data
    state.alertStatus = status
  },
}
