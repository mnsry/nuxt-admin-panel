<template>
  <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
    <v-tabs v-model="tab" background-color="blue lighten-3" grow>
      <v-tab disabled>
        <v-icon color="white" large>mdi-account-outline</v-icon>
      </v-tab>
      <v-tab-item>
        <v-card :loading="wait" class="px-4">
          <v-card-text>
            <v-form ref="form" v-model="formDisable" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    :rules="[rules.emailRequired, rules.emailEmail]"
                    prepend-icon="mdi-email"
                    label="آدرس ایمیل"
                    type="email"
                    counter
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.passwordRequired, rules.passwordMin]"
                    :type="showPassword ? 'text' : 'password'"
                    prepend-icon="mdi-key"
                    label="کلمه عبور"
                    counter
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </v-col>

                <v-col class="d-flex" cols="12" sm="6" xsm="12">
                  <v-progress-circular
                    v-if="wait"
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-col>

                <v-spacer />

                <v-col
                  v-if="!wait"
                  class="d-flex"
                  cols="12"
                  sm="3"
                  xsm="12"
                  align-end
                >
                  <v-btn
                    large
                    block
                    :disabled="!formDisable"
                    color="blue"
                    @click="login"
                  >
                    <span> ورود به سیستم </span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-dialog>
</template>

<script>
export default {
  layout: 'empty',
  data: () => ({
    dialog: true,
    tab: 0,
    email: '',
    password: '',
    showPassword: false,
    formDisable: true,
    rules: {
      passwordRequired: (v) => !!v || 'وارد کردن کلمه عبور اجباری است!',
      passwordMin: (v) => (v && v.length >= 8) || 'حداقل 8 کاراکتر...',
      emailEmail: (v) => /.+@.+\..+/.test(v) || 'ایمیل باید معتبر باشد.',
      emailRequired: (v) => !!v || 'وارد کردن ایمیل اجباری است!',
    },
  }),
  head: {
    titleTemplate: '%s | ورود به پنل',
  },
  computed: {
    wait() {
      return this.$store.state.auth.wait
    },
  },
  mounted() {
    this.$store.commit('auth/getLocalStorageNull')
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        await this.$store.commit('auth/updateWait')
        await this.$store.dispatch('auth/login', [this.email, this.password])
      }
    },
  },
}
</script>
