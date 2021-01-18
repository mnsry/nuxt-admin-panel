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
          :footer-props="footer"
          :headers="showHeaders"
          :search="search"
          :items="products"
          sort-by="id"
        >
          <!--          <template v-slot:top>-->
          <!--            <v-row justify="center" dense>-->
          <!--              <v-col cols="2">-->
          <!--                <v-btn-->
          <!--                  :to="{ name: 'product-create' }"-->
          <!--                  outlined-->
          <!--                  rounded-->
          <!--                  block-->
          <!--                  text-->
          <!--                >-->
          <!--                  <v-icon color="success" left>mdi-plus</v-icon>-->
          <!--                  <span class="green&#45;&#45;text">افزودن جدید</span>-->
          <!--                </v-btn>-->
          <!--              </v-col>-->

          <!--              <v-col cols="9">-->
          <!--                <v-text-field-->
          <!--                  v-model="search"-->
          <!--                  prepend-inner-icon="mdi-magnify"-->
          <!--                  placeholder="جستجو ..."-->
          <!--                  prefix=" "-->
          <!--                  clearable-->
          <!--                  rounded-->
          <!--                  outlined-->
          <!--                  dense-->
          <!--                  flat-->
          <!--                ></v-text-field>-->
          <!--              </v-col>-->

          <!--              <v-col cols="12">-->
          <!--                <v-select-->
          <!--                  v-model="selectedHeaders"-->
          <!--                  :items="headers"-->
          <!--                  prepend-inner-icon="mdi-table"-->
          <!--                  messages="ستون هایی را که میخواهید نمایش دهید انتخاب کنید."-->
          <!--                  deletable-chips-->
          <!--                  return-object-->
          <!--                  hide-selected-->
          <!--                  outlined-->
          <!--                  multiple-->
          <!--                  rounded-->
          <!--                  chips-->
          <!--                  dense-->
          <!--                  flat-->
          <!--                >-->
          <!--                  <template v-slot:no-data>-->
          <!--                    <div class="my-1 mr-3">همه موارد انتخاب شدن</div>-->
          <!--                  </template>-->
          <!--                </v-select>-->
          <!--              </v-col>-->
          <!--            </v-row>-->
          <!--          </template>-->

          <!--          <template v-slot:item.user="{ item }">-->
          <!--            {{ item.user.name }}-->
          <!--          </template>-->

          <!--          <template v-slot:item.image="{ item }">-->
          <!--            <div class="p-2">-->
          <!--              <v-img-->
          <!--                :src="item.image"-->
          <!--                :alt="item.title"-->
          <!--                width="50"-->
          <!--                height="50"-->
          <!--              ></v-img>-->
          <!--            </div>-->
          <!--          </template>-->

          <!--          <template v-slot:item.actions="{ item }">-->
          <!--            <v-speed-dial direction="right" open-on-hover>-->
          <!--              <template v-slot:activator>-->
          <!--                <v-btn fab small outlined color="blue darken-2">-->
          <!--                  <v-icon> mdi-shopping-search </v-icon>-->
          <!--                </v-btn>-->
          <!--              </template>-->
          <!--              <v-btn-->
          <!--                :to="{ path: `/product/${item.id}` }"-->
          <!--                fab-->
          <!--                x-small-->
          <!--                color="indigo"-->
          <!--              >-->
          <!--                <v-icon>mdi-eye</v-icon>-->
          <!--              </v-btn>-->
          <!--              <v-btn-->
          <!--                :to="{ path: `/product/${item.id}/edit` }"-->
          <!--                fab-->
          <!--                x-small-->
          <!--                color="green"-->
          <!--              >-->
          <!--                <v-icon>mdi-pencil</v-icon>-->
          <!--              </v-btn>-->
          <!--              <v-btn-->
          <!--                :to="{ path: `/product/${item.id}/delete` }"-->
          <!--                fab-->
          <!--                x-small-->
          <!--                color="red"-->
          <!--              >-->
          <!--                <v-icon>mdi-delete</v-icon>-->
          <!--              </v-btn>-->
          <!--            </v-speed-dial>-->
          <!--          </template>-->

          <!--          <template-->
          <!--            v-slot:footer.page-text="{ pageStart, pageStop, itemsLength }"-->
          <!--          >-->
          <!--            <div>-->
          <!--              <span>نمایش : {{ pageStart }}</span>-->
          <!--              <span>تا {{ pageStop }}</span>-->
          <!--            </div>-->
          <!--            <div>-->
          <!--              <span>تعداد کل : {{ itemsLength }}</span>-->
          <!--            </div>-->
          <!--          </template>-->
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
      headersMap: {
        id: {
          text: 'آیدی',
          value: 'id',
          align: 'start',
          sortable: false,
          width: '1px',
        },
        title: {
          text: 'عنوان محصول',
          value: 'title',
          align: 'start',
        },
        user: { text: 'کاربر سازنده', value: 'user', align: 'start' },
        body: {
          text: 'توضیحات',
          value: 'body',
          align: 'start',
          width: '300px',
        },
        image: { text: 'عکس', value: 'image', align: 'start' },
        created_at: {
          text: 'تاریخ ایجاد',
          value: 'created_at',
          align: 'start',
        },
        actions: {
          text: 'بیشتر',
          value: 'actions',
          align: 'end',
          sortable: false,
        },
      },
      selectedHeaders: [],
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
    showHeaders() {
      return this.headers.filter((s) => this.selectedHeaders.includes(s))
    },
  },
  created() {
    this.headers = Object.values(this.headersMap)
    this.selectedHeaders = this.headers
  },
}
</script>
