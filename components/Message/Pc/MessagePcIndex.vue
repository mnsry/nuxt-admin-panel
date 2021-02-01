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
          :items="messages"
          sort-by="id"
        >
          <template #top>
            <v-row justify="center" dense>
              <v-col cols="11">
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
                  :src="item.to_user_info.avatar"
                  :alt="item.to_user_info.name"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  v-text="item.to_user_info.name"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <template #[`item.actions`]="{ item }">
            <v-btn
              :to="{ path: `/user/${item.to_user_info.id}/message` }"
              fab
              x-small
              color="success"
            >
              <v-icon>mdi-message</v-icon>
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
  </v-container>
</template>

<script>
export default {
  data() {
    return {
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
    }
  },
  computed: {
    alert() {
      return this.$store.state.alert.alert
    },
    alertStatus() {
      return this.$store.state.alert.alertStatus
    },
    messages() {
      return this.$store.state.message.messages
    },
  },
}
</script>
