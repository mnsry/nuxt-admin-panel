export default function ({ $axios, store, error: nuxtError }) {
  // $axios.create({ baseURL: process.env.baseUrl })
  // $axios.setHeader('Authorization', 'Bearer ' + store.state.auth.token)
  $axios.onError((error) => {
    // when user dont Login Or Auth Failed
    if (error.response.status === 401) {
      store.dispatch('auth/logout')
    }
    // when User Forbidden
    if (error.response.status === 403) {
      nuxtError({
        statusCode: error.response.status,
        message: error.response.data.message,
      })
      return Promise.resolve(false)
    }
    // when Model Not Found Exception
    if (error.response.status === 404) {
      nuxtError({
        statusCode: error.response.status,
        message: error.response.data.message,
      })
      return Promise.resolve(false)
    }
    // when Method Not Allowed
    if (error.response.status === 405) {
      nuxtError({
        statusCode: error.response.status,
        message: error.response.data.message,
      })
      return Promise.resolve(false)
    }
    // when Internal Server Error
    if (error.response.status === 500) {
      nuxtError({
        statusCode: error.response.status,
        message: error.response.data.message,
      })
      return Promise.resolve(false)
    }
  })
}
