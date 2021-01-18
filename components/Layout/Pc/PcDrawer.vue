<template>
  <v-navigation-drawer
    v-if="!mobile"
    :value="drawer"
    color="rgba(0,0,0,.1)"
    width="222"
    :mini-variant.sync="drawer"
    permanent
    clipped
    right
    app
  >
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

      <v-col cols="11">
        <div v-if="$nuxt.isOffline" class="text-center">آفلاین هستید ...</div>
        <v-btn
          v-else
          outlined
          depressed
          color="red lighten-2"
          block
          @click="$fetch"
        >
          تلاش مجدد
          <v-icon right dark> mdi-refresh </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <v-list subheader>
          <v-list-group append-icon="" no-action>
            <template #activator>
              <v-list-item-avatar class="mr-n2">
                <v-img
                  :lazy-src="require('@/assets/images/logo/mansory.png')"
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
            <v-list-item v-if="!load" @click.stop="logout">
              <v-icon right dense>mdi-logout-variant</v-icon>
              <v-list-item-title>خروج از سیستم</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="load" @click.stop="load = !load">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
              <v-list-item-title class="pr-3 py-2 blue--text subtitle-1">
                کنسلش شود!
              </v-list-item-title>
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
            <template #activator>
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
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      load: false,
    }
  },
  async fetch() {
    await this.$store.dispatch('sidebar/getApiSidebars')
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
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  methods: {
    logout() {
      this.load = !this.load
      setTimeout(() => {
        this.notLogout()
      }, 3000)
    },
    notLogout() {
      if (this.load) {
        this.$store.dispatch('auth/logout')
      }
    },
  },
  fetchOnServer: false,
}
</script>
