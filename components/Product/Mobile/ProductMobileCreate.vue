<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-alert
          v-if="alertStatus"
          :type="alertStatus"
          rounded
          outlined
          dismissible
        >
          <div v-for="(message, i) of alert" :key="i">
            <span v-for="(item, j) of message" :key="j"> • {{ item }} </span>
          </div>
        </v-alert>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-btn :to="{ name: 'product' }" color="blue" text outlined>
          بازگشت
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card color="rgba(0,0,0,0.3)" rounded>
          <v-card-text>
            <v-form ref="form" v-model="formDisable" lazy-validation>
              <v-text-field
                v-model="title"
                :rules="[rules.titleRequired, rules.titleMin]"
                label="عنوان :"
                counter
                dense
              />
              <br />
              <v-textarea
                v-model="body"
                :rules="[rules.bodyRequired, rules.bodyMin]"
                label="توضیحات :"
                auto-grow
                counter
                dense
              />
              <br />
              <v-file-input
                :rules="[rules.imageSize]"
                accept="image/png, image/jpeg"
                prepend-icon="mdi-camera"
                label="افزودن عکس"
                show-size
                dense
                @change="upload"
              >
              </v-file-input>
              <v-col class="text-center">
                <v-btn
                  color="primary"
                  :disabled="!formDisable"
                  class="ml-4"
                  outlined
                  @click.stop="createProduct"
                >
                  ارسال
                </v-btn>
                <v-btn class="mr-4" color="warning" outlined @click="clear">
                  پاک کردن
                </v-btn>
              </v-col>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    title: '',
    body: '',
    image: '',
    formDisable: true,
    rules: {
      titleRequired: (v) => !!v || 'وارد کردن عنوان اجباری است!',
      titleMin: (v) => (v && v.length >= 7) || 'حداقل 7 کاراکتر...',
      bodyRequired: (v) => !!v || 'وارد کردن توضیحات اجباری است!',
      bodyMin: (v) => (v && v.length >= 20) || 'حداقل 20 کاراکتر...',
      imageSize: (v) =>
        !v || v.size < 2000000 || 'عکس باید کمتر از 2 مگابایت باشد!',
    },
  }),
  computed: {
    alert() {
      return this.$store.state.alert.alert
    },
    alertStatus() {
      return this.$store.state.alert.alertStatus
    },
  },
  methods: {
    upload(files) {
      this.image = files
    },
    createProduct() {
      if (this.$refs.form.validate()) {
        const data = new FormData()
        data.append('image', this.image)
        data.append('title', this.title)
        data.append('body', this.body)
        this.$store.dispatch('product/createProduct', data)
      } else {
        const message = [
          'اطلاعات را بدرستی وارد نکردید',
          'لطفا با صبر و دقت فرم را پر کنید.',
        ]
        this.$store.commit('alert/setAlert', [[message], 'warning'])
      }
    },
    clear() {
      this.title = ''
      this.body = ''
      this.$store.commit('alert/setAlert', ['', ''])
    },
  },
}
</script>
