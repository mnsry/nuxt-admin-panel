<template>
  <v-main>
    <v-container>
      <v-row align-content="center" justify="center">
        <v-col cols="12" class="subtitle-1 text-center">
          <span> {{ otherError }} </span>
          <span> | </span>
          <span> {{ error.statusCode }} </span>
        </v-col>

        <v-col cols="11">
          <v-progress-linear
            color="red lighten-2"
            buffer-value="25"
            reverse
            stream
          ></v-progress-linear>
        </v-col>

        <v-col class="d-flex justify-center py-15" cols="12">
          <h2 v-if="error.message === 'This page could not be found'">
            {{ pageNotFound }}
          </h2>
          <h2 v-else>{{ error.message }}</h2>
        </v-col>

        <v-col cols="6" class="d-flex justify-center">
          <v-col>
            <v-btn
              block
              outlined
              depressed
              color="indigo lighten-2"
              @click="$router.go(-1)"
            >
              <span> برگشت </span>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              block
              outlined
              depressed
              color="indigo lighten-2"
              @click.stop="reload"
            >
              <span> رفرش </span>
            </v-btn>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'صفحه مورد نظر پیدا نشد!',
      otherError: 'خطایی روی داده!',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  methods: {
    reload() {
      location.reload()
    },
  },
}
</script>
