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
        <v-btn :to="{ name: 'user' }" color="blue" text outlined>
          بازگشت
        </v-btn>
        <v-btn :to="{ name: `user-id` }" color="warning" text outlined>
          نمایش کاربر
        </v-btn>
        <v-btn :to="{ name: `user-id-edit` }" color="success" text outlined>
          ویرایش کاربر
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card color="rgba(0,0,0,0.3)" rounded>
          <v-card-text>
            <span>نام :</span>
            <p class="text--primary">{{ user.name }}</p>
            <br />
            <span>ایمیل :</span>
            <p class="text--primary">{{ user.email }}</p>
            <br />
            <span>نام نقش ها :</span>
            <div v-for="(role, i) of user.roles" :key="i" class="text--primary">
              {{ role.display_name }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn outlined color="red" @click="deleteUser">حذف شود</v-btn>
          </v-card-actions>
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
