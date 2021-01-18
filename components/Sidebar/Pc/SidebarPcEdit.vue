<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-alert v-if="alertStatus" :type="alertStatus" rounded outlined>
          <div v-for="(message, i) of alert" :key="i">
            <span v-for="(item, j) of message" :key="j"> • {{ item }} </span>
          </div>
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn text color="secondary" outlined :to="{ name: 'sidebar' }">
          بازگشت
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-card color="rgba(0,0,0,0.3)" rounded>
          <v-card-text>
            <v-form ref="form" v-model="formDisable" lazy-validation>
              <v-col>
                <v-icon>{{ sidebar.prepend_icon }}</v-icon>
                <span>آیکن اصلی</span>
              </v-col>
              <v-text-field
                v-model="perpend_icon"
                :rules="[rules.prepend_iconRequired, rules.prepend_iconMin]"
                dense
                counter
              />
              <v-col>
                <span>نام منو</span>
              </v-col>
              <v-text-field
                v-model="title"
                :rules="[rules.titleRequired, rules.titleMin]"
                dense
                counter
              />
              <v-col>
                <v-icon>{{ sidebar.append_icon }}</v-icon>
                <span>آیکن جلو</span>
              </v-col>
              <v-text-field v-model="append_icon" dense counter />
              <v-col>
                <span>زیر منو ها</span>
              </v-col>
              <v-text-field
                v-for="(item, j) of sub_title"
                :key="j"
                v-model="sub_title[j]"
                dense
                counter
              />
              <v-col>
                <v-btn
                  color="primary"
                  :disabled="!formDisable"
                  class="ml-4"
                  outlined
                  @click.stop="updateSidebar"
                >
                  ارسال
                </v-btn>
                <v-btn color="secondary" class="mr-4" outlined @click="clear">
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
  data() {
    return {
      title: '',
      perpend_icon: '',
      append_icon: '',
      formDisable: true,
      rules: {
        titleRequired: (v) => !!v || 'وارد کردن نام اجباری است!',
        titleMin: (v) => (v && v.length >= 5) || 'حداقل 5 کاراکتر...',
        prepend_iconRequired: (v) => !!v || 'وارد کردن ایکن اجباری است!',
        prepend_iconMin: (v) => (v && v.length >= 5) || 'حداقل 5 کاراکتر...',
      },
      sub_title: [],
    }
  },
  computed: {
    alert() {
      return this.$store.state.alert.alert
    },
    alertStatus() {
      return this.$store.state.alert.alertStatus
    },
    sidebar() {
      return this.$store.state.sidebar.sidebar
    },
  },
  mounted() {
    this.pushData()
  },
  methods: {
    pushData() {
      setTimeout(() => {
        this.sidebar.sidebarItems.forEach((item) => {
          this.sub_title.push(item.title)
        })
        this.title = this.sidebar.title
        this.append_icon = this.sidebar.append_icon
        this.perpend_icon = this.sidebar.prepend_icon
      }, 500)
    },
    updateSidebar() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('sidebar/updateSidebar', [
          this.sidebar.id,
          this.title,
          this.perpend_icon,
          this.append_icon,
          this.sub_title,
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
      this.title = ''
      this.perpend_icon = ''
      this.append_icon = ''
      this.$store.commit('alert/setAlert', ['', ''])
    },
  },
}
</script>
