<template>
  <v-main>
    <v-container>
      <v-row class="app_center">
        <v-col>
          <img src="@/assets/images/logo/mansory.png" alt="welcome" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  mounted() {
    this.$axios.$get('/api/test')
    this.$store.commit('navbar/updateNav', 'داشبورد')
  },
  head: {
    titleTemplate: '%s | خوش آمدید',
  },
}
</script>
