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

    <v-row dense>
      <v-col cols="12">
        <v-simple-table
          style="background-color: rgba(0, 0, 0, 0)"
          height="100px"
          dense
        >
          <template #default>
            <thead class="justify-content">
              <tr>
                <th></th>
                <th>نام</th>
                <th>فامیل</th>
                <th>آواتار</th>
                <th>تلفن همراه</th>
                <th>ایمیل</th>
                <th>نقش</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>{{ profile.name }}</td>
                <td>{{ profile.family }}</td>
                <td><v-img :src="profile.avatar" width="50" /></td>
                <td>{{ profile.mobile }}</td>
                <td>{{ profile.email }}</td>
                <td>
                  <div
                    v-for="(role, j) of profile.roles"
                    :key="j"
                    v-text="role.display_name"
                  />
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-data-table
          style="background-color: rgba(0, 0, 0, 0)"
          :footer-props="footer"
          :headers="showHeaders"
          :search="search"
          :items="sidebars"
          sort-by="id"
        >
          <template #top>
            <v-row justify="center" dense>
              <v-col cols="2">
                <v-btn outlined rounded block text>
                  <v-icon color="success" left>mdi-plus</v-icon>
                  <span class="green--text">افزودن جدید</span>
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

              <v-col cols="12">
                <v-select
                  v-model="selectedHeaders"
                  :items="headers"
                  prepend-inner-icon="mdi-table"
                  messages="ستون هایی را که میخواهید نمایش دهید انتخاب کنید."
                  deletable-chips
                  return-object
                  hide-selected
                  outlined
                  multiple
                  rounded
                  chips
                  dense
                  flat
                >
                  <template #no-data>
                    <div class="my-1 mr-3">همه موارد انتخاب شدن</div>
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </template>

          <template #[`item.actions`]="{ item }">
            <v-speed-dial direction="right" open-on-hover>
              <template #activator>
                <v-btn fab small outlined color="blue darken-2">
                  <v-icon> mdi-cog-transfer-outline </v-icon>
                </v-btn>
              </template>
              <v-btn
                :to="{ path: `/sidebar/${item.id}/edit` }"
                fab
                x-small
                color="green"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-speed-dial>
          </template>

          <template #[`item.prepend_icon`]="{ item }">
            <v-icon>{{ item.prepend_icon }}</v-icon>
          </template>

          <template #[`item.append_icon`]="{ item }">
            <v-icon>{{ item.append_icon }}</v-icon>
          </template>

          <template #[`item.sidebarItems`]="{ item }">
            <span v-for="sidebar of item.sidebarItems" :key="sidebar.id">
              • {{ sidebar.title }}
            </span>
          </template>

          <template
            #[`footer.page-text`]="{ pageStart, pageStop, itemsLength }"
          >
            <div>
              <span>نمایش : {{ pageStart }}</span>
              <span>تا {{ pageStop }}</span>
            </div>
            <div>
              <span>تعداد کل : {{ itemsLength }}</span>
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
        prepend_icon: {
          text: 'آیکن اصلی',
          value: 'prepend_icon',
          align: 'start',
          sortable: false,
        },
        title: { text: 'منو اصلی', value: 'title', align: 'start' },
        sidebarItems: {
          text: 'زیر منو',
          value: 'sidebarItems',
          align: 'start',
        },
        slug: { text: 'اسلاگ', value: 'slug', align: 'start' },
        append_icon: { text: 'آیکن جلو', value: 'append_icon', align: 'start' },
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
    profile() {
      return this.$store.state.sidebar.profile
    },
    sidebars() {
      return this.$store.state.sidebar.sidebars
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
