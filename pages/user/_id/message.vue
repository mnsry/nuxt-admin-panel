<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card color="rgba(0,0,0,0.3)" rounded>
            <v-card-text>
              <v-form
                ref="form"
                v-model="formDisable"
                lazy-validation
                class="mt-5"
              >
                <v-text-field
                  v-model="name"
                  label="پیام "
                  :rules="[rules.nameRequired, rules.nameMin]"
                  counter
                />
                <br />

                <v-btn
                  color="primary"
                  :disabled="!formDisable"
                  class="ml-4"
                  outlined
                  @click.stop="createMessage"
                >
                  ارسال پیام
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data: () => ({
    name: '',
    formDisable: true,
    rules: {
      nameRequired: (v) => !!v || 'وارد کردن پیام اجباری است!',
      nameMin: (v) => (v && v.length >= 3) || 'حداقل 3 کاراکتر...',
    },
  }),
  head: {
    titleTemplate: '%s | کاربر: ارسال پیام',
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  mounted() {
    this.$store.commit('navbar/updateNav', 'کاربران | ارسال پیام')
  },
  methods: {
    createMessage() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('message/createMessage', [
          this.$route.params.id,
          this.name,
        ])
      }
    },
  },
}
</script>
