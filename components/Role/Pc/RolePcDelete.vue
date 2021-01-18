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
        <v-btn :to="{ name: `role-id-edit` }" color="success" text outlined>
          ویرایش نقش
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card color="rgba(0,0,0,0.3)" rounded>
          <v-card-text>
            <span>نام اسلاگ :</span>
            <p class="text--primary">{{ role.name }}</p>
            <br />
            <span>نام نمایشی :</span>
            <p class="text--primary">{{ role.display_name }}</p>
            <br />
            <span>نام کاربران :</span>
            <div v-for="(user, i) of role.users" :key="i" class="text--primary">
              {{ user.name }}
            </div>
            <br />
            <span>نام کلیدا :</span>
            <div
              v-for="(permission, i) of role.permissions"
              :key="'A' + i"
              class="text--primary"
            >
              {{ permission.display_key }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn small color="red" @click="deleteRole">حذف شود</v-btn>
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
    role() {
      return this.$store.state.role.role
    },
  },
  methods: {
    deleteRole() {
      this.$store.dispatch('role/deleteRole', this.$route.params.id)
    },
  },
}
</script>
