<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <role-pc-create v-if="!mobile" />

        <role-mobile-create v-if="mobile" />
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  head: {
    titleTemplate: '%s | نقش ها: ایجاد جدید',
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  mounted() {
    this.$store.commit('navbar/updateNav', 'نقش ها | ایجاد نقش جدید')
  },
}
</script>
