<template>
  <v-app id="bg-pic" :style="{ backgroundImage: `url(${theme})` }">
    <pc-nav
      v-if="!mobile"
      @toggle-drawer="$refs.data.drawer = !$refs.data.drawer"
    />
    <pc-drawer v-if="!mobile" ref="data" />

    <mobile-nav v-if="mobile" />
    <mobile-drawer v-if="mobile" />

    <nuxt />
  </v-app>
</template>

<script>
export default {
  computed: {
    theme() {
      return this.$store.state.theme.pic
    },
    mobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  mounted() {
    this.$store.commit('theme/getLocalStorage')
    this.$store.commit('auth/getLocalStorage')
  },
}
</script>
