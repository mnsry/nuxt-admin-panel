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
        <v-card color="rgba(0,0,0,0.3)" class="mt-6 text-center">
          <v-col>
            <v-card-title class="justify-center">
              {{ role.display_name }}
              <span class="pr-4 caption"> {{ role.name }}</span>
            </v-card-title>

            <v-divider class="mx-4"></v-divider>

            <v-card-subtitle class="text-right">کاربران:</v-card-subtitle>
            <v-row dense>
              <v-col
                v-for="(user, i) of role.users"
                :key="i"
                class="d-flex child-flex"
                cols="4"
              >
                <v-card-text class="grey--text">
                  {{ user.name }}
                </v-card-text>
              </v-col>
            </v-row>

            <v-divider class="mx-4"></v-divider>

            <v-card-subtitle class="text-right">کلید ها:</v-card-subtitle>
            <v-row dense>
              <v-col
                v-for="(permission, i) of role.permissions"
                :key="'A' + i"
                class="d-flex child-flex"
                cols="6"
              >
                <v-checkbox
                  :label="permission.display_key"
                  input-value="true"
                  hide-details
                  disabled
                  dense
                />
              </v-col>
            </v-row>

            <v-divider class="mx-4"></v-divider>
            <br />
            <v-btn outlined x-small color="red" @click="deleteRole"
              >حذف شود</v-btn
            >
            <v-divider class="mx-4"></v-divider>

            <v-card-actions class="justify-center">
              <v-btn :to="{ name: 'role' }" color="blue" text outlined>
                بازگشت
              </v-btn>
              <v-btn :to="{ name: `role-id` }" color="warning" text outlined>
                نمایش نقش
              </v-btn>
              <v-btn
                :to="{ name: `role-id-edit` }"
                color="success"
                text
                outlined
              >
                ویرایش نقش
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
