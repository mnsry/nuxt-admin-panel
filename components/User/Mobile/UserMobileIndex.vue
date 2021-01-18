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
          hide-default-header
          :headers="dessertHeaders"
          :search="search"
          :items="users"
          single-expand
          :expanded.sync="expanded"
          show-expand
        >
          <template v-slot:top>
            <v-row justify="center" dense>
              <v-col cols="3" class="d-flex child-flex">
                <v-btn :to="{ name: 'user-create' }" outlined rounded text>
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

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="text-center">
              <v-btn
                :to="{ path: `/user/${item.id}` }"
                fab
                x-small
                color="indigo"
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>
              <v-btn
                :to="{ path: `/user/${item.id}/edit` }"
                fab
                x-small
                class="mx-2"
                color="green"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                :to="{ path: `/user/${item.id}/delete` }"
                fab
                x-small
                color="red"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <span class="pr-4">موبایل: </span>{{ item.mobile }}
            </td>
          </template>

          <template v-slot:item.avatar="{ item }">
            <div class="p-2">
              <v-img
                :src="item.avatar"
                :alt="item.name"
                width="50"
                height="50"
              ></v-img>
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
      expanded: [],
      dessertHeaders: [
        {
          text: 'آواتار',
          value: 'avatar',
          align: 'start',
          width: '1px',
        },
        { text: 'نام', value: 'name', align: 'start' },
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
    users() {
      return this.$store.state.user.users
    },
  },
}
</script>
