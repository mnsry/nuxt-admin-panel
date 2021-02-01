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
        <v-data-table
          style="background-color: rgba(0, 0, 0, 0)"
          :footer-props="footer"
          :headers="headersMap"
          :search="search"
          :items="message"
          sort-by="id"
        >
          <template #top>
            <v-row justify="center" dense>
              <v-col cols="1">
                <v-btn :to="{ name: 'message' }" outlined rounded block text>
                  <v-icon color="success" left>mdi-email</v-icon>
                  <span class="green--text">صندوق پیام ها</span>
                </v-btn>
              </v-col>

              <v-col cols="10">
                <v-text-field
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  placeholder="جستجو ..."
                  prefix=" "
                  clearable
                  rounded
                  outlined
                  dense
                  flat
                ></v-text-field>
              </v-col>
            </v-row>
          </template>

          <template #[`item.to_user_info`]="{ item }">
            <v-list-item>
              <v-list-item-avatar>
                <v-img
                  :src="item.auth_user.avatar"
                  :alt="item.auth_user.name"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  v-text="item.auth_user.name"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <template #[`item.actions`]="{ item }">
            <v-btn
              fab
              x-small
              color="red"
              @click="$store.dispatch('message/deleteMessage', item.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>

          <template
            #[`footer.page-text`]="{ pageStart, pageStop, itemsLength }"
          >
            <div>
              <span>نمایش : {{ pageStart }}</span>
              <span>تا {{ pageStop }}</span>
            </div>
            <div>
              <span>تعداد کل : {{ itemsLength }}</span>
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card color="rgba(0,0,0,0.1)" rounded>
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
</template>

<script>
export default {
  data: () => ({
    search: '',
    footer: {
      itemsPerPageAllText: 'همه',
      itemsPerPageText: 'صفحه بندی',
    },
    headers: [],
    headersMap: [
      {
        text: 'کاربر',
        value: 'to_user_info',
        align: 'start',
        sortable: false,
      },
      {
        text: 'پیام',
        value: 'message',
        align: 'start',
      },
      {
        text: 'بیشتر',
        value: 'actions',
        align: 'end',
        sortable: false,
      },
    ],
    name: '',
    formDisable: true,
    rules: {
      nameRequired: (v) => !!v || 'وارد کردن پیام اجباری است!',
      nameMin: (v) => (v && v.length >= 3) || 'حداقل 3 کاراکتر...',
    },
  }),
  computed: {
    alert() {
      return this.$store.state.alert.alert
    },
    alertStatus() {
      return this.$store.state.alert.alertStatus
    },
    message() {
      return this.$store.state.message.message
    },
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
