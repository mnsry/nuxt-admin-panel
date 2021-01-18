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
        <v-btn :to="{ name: 'role' }" color="blue" text outlined>
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
                v-model="display_name"
                :rules="[rules.display_nameRequired, rules.display_nameMin]"
                counter
                label="نام نمایشی :"
              />
              <br />
              <v-btn
                color="primary"
                :disabled="!formDisable"
                class="ml-4"
                outlined
                @click.stop="createRole"
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
    display_name: '',
    formDisable: true,
    rules: {
      nameRequired: (v) => !!v || 'وارد کردن نام اجباری است!',
      nameMin: (v) => (v && v.length >= 4) || 'حداقل 4 کاراکتر...',
      display_nameRequired: (v) => !!v || 'وارد کردن نام نمایشی اجباری است!',
      display_nameMin: (v) => (v && v.length >= 5) || 'حداقل 5 کاراکتر...',
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
  mounted() {
    this.$store.commit('alert/setAlert', ['', ''])
  },
  methods: {
    createRole() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('role/createRole', [this.name, this.display_name])
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
      this.display_name = ''
      this.$store.commit('alert/setAlert', ['', ''])
    },
  },
}
</script>
