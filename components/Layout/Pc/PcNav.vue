<template>
  <v-app-bar v-if="!mobile" clipped-right flat app dense>
    <v-app-bar-nav-icon
      @click.stop="$emit('toggle-drawer')"
    ></v-app-bar-nav-icon>

    <v-img
      class="mr-3"
      :lazy-src="require('@/assets/images/logo/logo.png')"
      :src="require('@/assets/images/logo/logo.png')"
      max-width="175"
      height="16"
    />

    <v-toolbar-title class="pr-6">{{ navbar }}</v-toolbar-title>

    <v-spacer />
    <v-text-field
      class="pt-6"
      append-icon="mdi-magnify"
      placeholder="جستجو ..."
      clearable
      flat
      dense
      solo
    />

    <v-spacer />
    <v-btn icon :ripple="false" @click="$router.go(+1)">
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>

    <v-btn icon :ripple="false" @click="$router.go(-1)">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-menu offset-y bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-compare</v-icon>
        </v-btn>
      </template>

      <v-card class="mx-auto" max-width="300">
        <v-system-bar color="indigo darken-4" dark>
          <span>{{ name }}</span>
          <v-spacer></v-spacer>
          <v-icon>mdi-close</v-icon>
        </v-system-bar>

        <v-container fluid>
          <v-row dense>
            <v-col
              v-for="pic in pics"
              :key="pic.link"
              class="d-flex child-flex"
              cols="4"
            >
              <v-img
                :src="pic.link"
                height="100px"
                @click.stop="$store.commit('theme/setPic', pic.link)"
              >
              </v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      name: 'انتخاب قالب ...',
      pics: [
        { link: require(`~/assets/images/theme/1.jpg`) },
        { link: require(`~/assets/images/theme/2.jpg`) },
        { link: require(`~/assets/images/theme/3.jpg`) },
        { link: require(`~/assets/images/theme/4.jpg`) },
        { link: require(`~/assets/images/theme/5.jpg`) },
      ],
    }
  },
  computed: {
    navbar() {
      return this.$store.state.navbar.navbar
    },
    mobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
}
</script>
