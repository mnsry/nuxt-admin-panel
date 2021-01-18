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
        <v-btn :to="{ name: 'user' }" color="blue" text outlined>
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
                v-model="name"
                :rules="[rules.nameRequired, rules.nameMin]"
                label="نام :"
                counter
              />
              <v-text-field
                v-model="email"
                :rules="[rules.emailRequired, rules.emailEmail, rules.emailMin]"
                label="آدرس ایمیل :"
                counter
              />
              <v-text-field
                v-model="password"
                :rules="[rules.passwordRequired, rules.passwordMin]"
                label="کلمه عبور :"
                counter
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              />
              <br />
              <v-btn
                color="primary"
                :disabled="!formDisable"
                class="ml-4"
                outlined
                @click.stop="createUser"
              >
                ارسال اطلاعات
              </v-btn>
              <v-btn color="secondary" class="mr-4" outlined @click="clear">
                پاک کردن اطلاعات فرم
              </v-btn>
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
    name: '',
    email: '',
    password: '',
    showPassword: false,
    formDisable: true,
    rules: {
      nameRequired: (v) => !!v || 'وارد کردن نام اجباری است!',
      nameMin: (v) => (v && v.length >= 3) || 'حداقل 3 کاراکتر...',
      emailRequired: (v) => !!v || 'وارد کردن ایمیل اجباری است!',
      emailMin: (v) => (v && v.length >= 7) || 'حداقل 7 کاراکتر...',
      emailEmail: (v) => /.+@.+\..+/.test(v) || 'ایمیل باید معتبر باشد.',
      passwordRequired: (v) => !!v || 'وارد کردن کلمه عبور اجباری است!',
      passwordMin: (v) => (v && v.length >= 8) || 'حداقل 8 کاراکتر...',
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
    createUser() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('user/createUser', [
          this.name,
          this.email,
          this.password,
        ])
      } else {
        const message = [
          'اطلاعات را بدرستی وارد نکردید',
          'لطفا با صبر و دقت فرم را پر کنید.',
        ]
        this.$store.commit('alert/setAlert', [[message], 'warning'])
      }
    },
    clear() {
      this.name = ''
      this.email = ''
      this.password = ''
      this.$store.commit('alert/setAlert', ['', ''])
    },
  },
}
</script>
