<template>
  <v-main>
    <v-container v-if="mobile">
      <v-row v-if="$fetchState.pending" align-content="center" justify="center">
        <v-col cols="12" class="subtitle-1 text-center">
          درحال دریافت اطلاعات ...
        </v-col>

        <v-col cols="11">
          <v-progress-linear
            indeterminate
            rounded
            color="blue"
          ></v-progress-linear>
        </v-col>
      </v-row>

      <v-row
        v-else-if="$fetchState.error"
        align-content="center"
        justify="center"
      >
        <v-col cols="12" class="subtitle-1 text-center">
          متاسفانه مشکلی پیش آمده!
        </v-col>

        <v-col cols="11">
          <v-progress-linear
            color="red lighten-2"
            buffer-value="25"
            reverse
            stream
          ></v-progress-linear>
        </v-col>

        <v-col cols="11" class="py-10">
          <v-btn outlined depressed color="red lighten-2" block @click="$fetch">
            تلاش مجدد
            <v-icon right dark> mdi-refresh </v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col>
          <v-list color="rgba(0,0,0,0)" subheader>
            <v-list-group append-icon="" no-action>
              <template v-slot:activator>
                <v-list-item-avatar class="mr-n2">
                  <v-img
                    :lazy-src="require('@/assets/images/logo/google.png')"
                    :src="profile.avatar"
                    :alt="profile.name"
                  />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="body-1" v-text="profile.name" />
                  <v-list-item-title
                    class="body-2 pt-1"
                    v-text="profile.family"
                  />
                </v-list-item-content>
              </template>
              <v-list-item @click.stop="$store.dispatch('auth/logout')">
                <v-icon right dense>mdi-logout-variant</v-icon>
                <v-list-item-title v-text="logout" />
              </v-list-item>
            </v-list-group>

            <v-divider inset />

            <v-list-group
              v-for="(sidebar, i) in sidebars"
              :key="i"
              :prepend-icon="sidebar.prepend_icon"
              :append-icon="sidebar.append_icon"
              no-action
            >
              <template v-slot:activator>
                <v-list-item-title v-text="sidebar.title" />
              </template>

              <v-list-item
                v-for="(item, j) in sidebar.sidebarItems"
                :key="'A' + j"
                :to="{ name: item.slug }"
              >
                <v-icon right small>mdi-arrow-left-thick</v-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title" />
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  async fetch() {
    if (!this.welcome) {
      await this.$store.dispatch('sidebar/getApiSidebars')
    }
  },
  data() {
    return {
      logout: 'خروج از سیستم',
    }
  },
  computed: {
    welcome() {
      return this.$store.state.sidebar.welcome
    },
    profile() {
      return this.$store.state.sidebar.profile
    },
    sidebars() {
      return this.$store.state.sidebar.sidebars
    },
    mobile() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return true
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.$router.push({ name: 'panel' })
    },
  },
  mounted() {
    this.$store.commit('navbar/updateNav', 'دسته ها')
  },
  head: {
    titleTemplate: '%s | دسته ها',
  },
}
</script>
