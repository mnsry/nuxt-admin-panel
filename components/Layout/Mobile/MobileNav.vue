<template>
  <v-app-bar v-if="mobile" color="rgba(0,0,0,1)" hide-on-scroll dense flat app>
    <v-btn icon :ripple="false" @click="$router.go(-1)">
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>

    <v-btn icon :ripple="false" @click="$router.go(+1)">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-spacer />

    <v-toolbar-title class="pr-3">{{ navbar }}</v-toolbar-title>

    <v-spacer />
    <v-img
      v-if="mobileXs"
      class="mr-2"
      :lazy-src="require('@/assets/images/logo/m.png')"
      :src="require('@/assets/images/logo/m.png')"
      max-width="85"
      height="17"
    />
    <v-img
      v-else
      class="mr-3"
      :lazy-src="require('@/assets/images/logo/logo.png')"
      :src="require('@/assets/images/logo/logo.png')"
      max-width="175"
      height="16"
    />
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    navbar() {
      return this.$store.state.navbar.navbar
    },
    mobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
    mobileXs() {
      return this.$vuetify.breakpoint.xs
    },
  },
}
</script>
