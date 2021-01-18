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
        <v-btn :to="{ name: 'product' }" color="blue" text outlined>
          بازگشت
        </v-btn>
        <v-btn :to="{ name: `product-id-edit` }" color="success" text outlined>
          ویرایش محصول
        </v-btn>
        <v-btn :to="{ name: `product-id-delete` }" color="red" text outlined>
          حذف محصول
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card color="rgba(0,0,0,0.3)" rounded>
          <v-card-text>
            <span>عنوان :</span>
            <p class="text--primary">{{ product.title }}</p>
            <br />
            <span>توضیحات :</span>
            <p class="text--primary">{{ product.body }}</p>
            <br />
            <span>نام کاربر سازنده :</span>
            <p>{{ user.name }}</p>
            <br />
            <span>عکس:</span>
            <v-img :src="product.image" width="50"></v-img>
          </v-card-text>
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
}
</script>
