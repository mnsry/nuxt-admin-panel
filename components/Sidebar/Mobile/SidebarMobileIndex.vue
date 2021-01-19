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
        <v-data-table
          style="background-color: rgba(0, 0, 0, 0)"
          mobile-breakpoint="50"
          hide-default-footer
          :headers="headersMap"
          :search="search"
          :items="sidebars"
        >
          <template #top>
            <v-row justify="center" dense>
              <v-col cols="3" class="d-flex child-flex">
                <v-btn disabled outlined rounded text>
                  <v-icon color="success" left>mdi-plus</v-icon>
                  <span class="green--text">جدید</span>
                </v-btn>
              </v-col>

              <v-col cols="9">
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

          <template #[`item.actions`]="{ item }">
            <v-btn
              :to="{ path: `/sidebar/${item.id}/edit` }"
              fab
              x-small
              color="green"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>

          <template #[`item.prepend_icon`]="{ item }">
            <v-icon>{{ item.prepend_icon }}</v-icon>
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
      expanded: [],
      headersMap: [
        { text: 'آیکن اصلی', value: 'prepend_icon', sortable: false },
        { text: 'منو اصلی', value: 'title', sortable: false },
        { text: 'ویرایش منو', value: 'actions', sortable: false },
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
    profile() {
      return this.$store.state.sidebar.profile
    },
    sidebars() {
      return this.$store.state.sidebar.sidebars
    },
  },
}
</script>
