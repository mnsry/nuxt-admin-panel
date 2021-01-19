<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <user-pc-create v-if="!mobile" />

        <user-mobile-create v-if="mobile" />
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  head: {
    titleTemplate: '%s | کاربران: ایجاد جدید',
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  mounted() {
    this.$store.commit('navbar/updateNav', 'کاربران | ایجاد کاربر جدید')
  },
}
</script>
