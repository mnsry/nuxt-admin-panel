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
          <v-col cols="12" class="d-flex justify-center">
            <v-img max-width="100" :src="product.image"></v-img>
          </v-col>
          <v-col>
            <v-card-title class="justify-center">
              {{ product.title }}
            </v-card-title>

            <v-divider class="mx-4"></v-divider>
            <v-col>
              <span>کاربر سازنده: </span>
              <span> {{ user.name }}</span>
            </v-col>

            <v-divider class="mx-4"></v-divider>

            <v-card-text>{{ product.body }}</v-card-text>

            <v-divider class="mx-4"></v-divider>
            <v-btn outlined x-small color="red" @click="deleteProduct"
              >حذف شود</v-btn
            >
            <v-divider class="mx-4"></v-divider>

            <v-card-actions class="justify-center">
              <v-btn :to="{ name: 'product' }" color="blue" text outlined>
                بازگشت
              </v-btn>
              <v-btn :to="{ name: 'product-id' }" color="warning" text outlined>
                نمایش محصول
              </v-btn>
              <v-btn
                :to="{ name: 'product-id-edit' }"
                color="success"
                text
                outlined
              >
                ویرایش محصول
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
    product() {
      return this.$store.state.product.product
    },
    user() {
      return this.$store.state.product.user
    },
  },
  methods: {
    deleteProduct() {
      this.$store.dispatch('product/deleteProduct', this.$route.params.id)
    },
  },
}
</script>
