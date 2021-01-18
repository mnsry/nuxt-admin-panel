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

    <v-row> </v-row>

    <v-row>
      <v-col cols="12">
        <v-card color="rgba(0,0,0,0.3)" class="mt-6 text-center">
          <v-col cols="12" class="d-flex justify-center">
            <v-img max-width="100" :src="user.avatar"></v-img>
          </v-col>
          <v-col>
            <v-card-title class="justify-center">
              {{ user.name }}
              <span class="pr-4 caption"> {{ user.family }}</span>
            </v-card-title>

            <v-card-text v-for="role of user.roles" :key="role.id">
              <div class="grey--text ml-4">
                {{ role.display_name }}
              </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-text>{{ user.mobile }}</v-card-text>
            <v-card-text>{{ user.created_at }}</v-card-text>
            <v-card-text> E-Mail: {{ user.email }} </v-card-text>
            <v-btn outlined x-small color="red" @click="deleteUser"
              >حذف شود</v-btn
            >

            <v-card-actions class="justify-center">
              <v-btn :to="{ name: 'user' }" color="blue" text outlined>
                بازگشت
              </v-btn>
              <v-btn :to="{ name: `user-id` }" color="warning" text outlined>
                نمایش کاربر
              </v-btn>
              <v-btn
                :to="{ name: `user-id-edit` }"
                color="success"
                text
                outlined
              >
                ویرایش کاربر
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
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
  },
  methods: {
    deleteUser() {
      this.$store.dispatch('user/deleteUser', this.$route.params.id)
    },
  },
}
</script>
