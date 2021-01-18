<template>
  <v-bottom-navigation v-if="mobile" color="rgba(0,0,0,1)" height="45" grow app>
    <v-btn v-for="(item, i) of items" :key="i" :to="{ name: item.route }">
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data: () => ({
    items: [
      { route: 'panel', icon: 'mdi-home-variant' },
      { route: 'mobile-menu', icon: 'mdi-menu' },
      { route: 'mobile-setting', icon: 'mdi-cog-transfer-outline' },
    ],
  }),
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
}
</script>
