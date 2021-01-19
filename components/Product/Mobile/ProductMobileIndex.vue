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
          :headers="headersMap"
          :search="search"
          :items="products"
          single-expand
          :expanded.sync="expanded"
          show-expand
        >
          <template #top>
            <v-row justify="center" dense>
              <v-col cols="3">
                <v-btn
                  :to="{ name: 'product-create' }"
                  outlined
                  rounded
                  block
                  text
                >
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

          <template #[`item.image`]="{ item }">
            <div class="p-2">
              <v-img
                :src="item.image"
                :alt="item.title"
                width="50"
                height="50"
              ></v-img>
            </div>
          </template>

          <template #expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="text-center">
              <span class="pr-4">مدیریت محصول: </span>{{ item.mobile }}
              <v-btn
                :to="{ path: `/product/${item.id}` }"
                fab
                x-small
                color="indigo"
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>
              <v-btn
                :to="{ path: `/product/${item.id}/edit` }"
                fab
                x-small
                color="green"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                :to="{ path: `/product/${item.id}/delete` }"
                fab
                x-small
                color="red"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
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
        { text: 'عکس', value: 'image' },
        { text: 'عنوان محصول', value: 'title' },
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
    products() {
      return this.$store.state.product.products
    },
  },
}
</script>
