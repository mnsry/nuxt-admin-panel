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
  head: {
    titleTemplate: '%s | پیام ها',
  },
  mounted() {
    this.$store.commit('navbar/updateNav', 'صندوق پیام')
  },
}
</script>
