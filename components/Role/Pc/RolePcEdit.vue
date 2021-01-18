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
        <v-btn :to="{ name: `role-id` }" color="warning" text outlined>
          نمایش نقش
        </v-btn>
        <v-btn :to="{ name: `role-id-delete` }" color="red" text outlined>
          حذف نقش
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card color="rgba(0,0,0,0.3)" rounded>
          <v-card-text>
            <v-form
              ref="form"
              v-model="formDisable"
              class="mt-5"
              lazy-validation
            >
              <v-text-field
                v-model="name"
                :rules="[rules.nameRequired, rules.nameMin]"
                label="نام :"
                counter
              />
              <br />
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
                @click.stop="updateRole"
              >
                ارسال اطلاعات
              </v-btn>
              <v-btn color="secondary" class="mr-4" outlined @click="clear">
                پاک کردن اطلاعات فرم
              </v-btn>
              <v-row dense>
                <v-col
                  v-for="(permission, i) of permissions"
                  :key="'A' + i"
                  class="d-flex child-flex"
                  cols="3"
                >
                  <v-checkbox
                    v-model="select"
                    :label="permission.display_key"
                    :value="permission.id"
                    hide-details
                    multiple
                    dense
                  />
                </v-col>
              </v-row>
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
    select: [],
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
    role() {
      return this.$store.state.role.role
    },
    permissions() {
      return this.$store.state.role.permissions
    },
    permissions_selected() {
      return this.$store.state.role.permissions_selected
    },
  },
  mounted() {
    this.pushData()
  },
  methods: {
    pushData() {
      setTimeout(() => {
        this.permissions_selected.forEach((item) => {
          this.select.push(item)
        })
        this.name = this.role.name
        this.display_name = this.role.display_name
      }, 500)
    },
    updateRole() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('role/updateRole', [
          this.role.id,
          this.name,
          this.display_name,
          this.select,
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
      this.display_name = ''
      this.$store.commit('alert/setAlert', ['', ''])
    },
  },
}
</script>
