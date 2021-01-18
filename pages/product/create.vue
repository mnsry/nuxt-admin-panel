<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <product-pc-create v-if="!mobile" />

        <product-mobile-create v-if="mobile" />
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  mounted() {
    this.$store.commit('navbar/updateNav', 'محصولات | ایجاد محصول جدید')
  },
  head: {
    titleTemplate: '%s | محصولات: ایجاد جدید',
  },
}
</script>
