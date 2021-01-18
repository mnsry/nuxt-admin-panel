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
        <v-card color="rgba(0,0,0,0.3)" rounded>
          <v-col cols="12" class="d-flex justify-center">
            <v-img max-width="100" :src="user.avatar"></v-img>
          </v-col>
          <v-card-text>
            <v-form ref="form" v-model="formDisable" lazy-validation>
              <v-text-field
                v-model="name"
                label="نام "
                :rules="[rules.nameRequired, rules.nameMin]"
                counter
              />
              <br />
              <v-text-field
                v-model="family"
                :rules="[rules.familyRequired, rules.familyMin]"
                label="نام خانوادگی "
                counter
              />
              <br />
              <v-text-field
                v-model="mobile"
                type="number"
                :rules="[rules.mobile]"
                label="شماره همراه "
                counter
              />
              <br />
              <v-file-input
                :rules="[rules.imageSize]"
                accept="image/png, image/jpeg"
                prepend-icon="mdi-camera"
                label="تغییر عکس"
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
                  @click.stop="updateUser"
                >
                  ارسال
                </v-btn>
                <v-btn color="secondary" class="mr-4" outlined @click="clear">
                  پاک کردن
                </v-btn>
              </v-col>
              <v-col class="d-flex justify-center">
                <v-checkbox
                  v-for="role of roles"
                  :key="role.id"
                  v-model="select"
                  class="pr-4"
                  :label="role.display_name"
                  :value="role.id"
                  multiple
                  dense
                ></v-checkbox>
              </v-col>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn :to="{ name: 'user' }" color="blue" text outlined>
              بازگشت
            </v-btn>
            <v-btn :to="{ name: `user-id` }" color="warning" text outlined>
              نمایش کاربر
            </v-btn>
            <v-btn :to="{ name: `user-id-delete` }" color="red" text outlined>
              حذف کاربر
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    name: '',
    family: '',
    mobile: '',
    avatar: '',
    select: [],
    formDisable: true,
    rules: {
      nameRequired: (v) => !!v || 'وارد کردن نام اجباری است!',
      nameMin: (v) => (v && v.length >= 3) || 'حداقل 3 کاراکتر...',
      familyRequired: (v) => !!v || 'وارد کردن نام خانوادگی اجباری است!',
      familyMin: (v) => (v && v.length >= 3) || 'حداقل 3 کاراکتر...',
      mobile: (v) => (v && v.length >= 11) || 'باید 11 کاراکتر باشد.',
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
    user() {
      return this.$store.state.user.user
    },
    roles() {
      return this.$store.state.user.roles
    },
    roles_selected() {
      return this.$store.state.user.roles_selected
    },
  },
  mounted() {
    this.pushData()
  },
  methods: {
    pushData() {
      setTimeout(() => {
        this.roles_selected.forEach((count) => {
          this.select.push(count)
        })
        this.name = this.user.name
        this.family = this.user.family
        this.mobile = this.user.mobile
      }, 500)
    },
    upload(files) {
      this.avatar = files
    },
    updateUser() {
      if (this.$refs.form.validate()) {
        const form = new FormData()
        form.append('name', this.name)
        form.append('family', this.family)
        form.append('mobile', this.mobile)
        form.append('avatar', this.avatar)
        form.append('roles', JSON.stringify(this.select))
        form.append('_method', 'put')
        this.$store.dispatch('user/updateUser', {
          id: this.user.id,
          form,
        })
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
      this.family = ''
      this.$store.commit('alert/setAlert', ['', ''])
    },
  },
}
</script>
