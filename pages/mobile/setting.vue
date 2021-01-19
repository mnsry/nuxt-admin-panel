<template>
  <v-main>
    <v-container v-if="mobile">
      <v-list color="rgba(0,0,0,.3)">
        <v-list-group v-model="list">
          <template #activator>
            <v-list-item-content>
              <v-list-item-title class="pt-2" v-text="name" />
            </v-list-item-content>
          </template>

          <v-list-item>
            <v-container fluid>
              <v-row dense>
                <v-col
                  v-for="pic in pics"
                  :key="pic.link"
                  class="d-flex child-flex"
                  :cols="height"
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
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      list: true,
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
  head: {
    titleTemplate: '%s | تنطیمات',
  },
  computed: {
    mobile() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return true
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.$router.push({ name: 'panel' })
    },
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 6
        case 'sm':
          return 4
        default:
          return 6
      }
    },
  },
  mounted() {
    this.$store.commit('navbar/updateNav', 'تنظیمات')
  },
}
</script>
