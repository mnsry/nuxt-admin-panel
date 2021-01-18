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
          :headers="headersMap"
          :items="roles"
          :search="search"
          mobile-breakpoint="50"
          hide-default-footer
          hide-default-header
          show-expand
          single-expand
          :expanded.sync="expanded"
        >
          <!--          <template v-slot:top>-->
          <!--            <v-row justify="center" dense>-->
          <!--              <v-col cols="3" class="d-flex child-flex">-->
          <!--                <v-btn :to="{ name: 'role-create' }" outlined rounded text>-->
          <!--                  <v-icon color="success" left>mdi-plus</v-icon>-->
          <!--                  <span class="green&#45;&#45;text">جدید</span>-->
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
          <!--            </v-row>-->
          <!--          </template>-->

          <!--          <template v-slot:expanded-item="{ headers, item }">-->
          <!--            <td :colspan="headers.length" class="text-center">-->
          <!--              <span class="pl-4">مدیریت نقش: </span>-->
          <!--              <v-btn-->
          <!--                :to="{ path: `/role/${item.id}` }"-->
          <!--                fab-->
          <!--                x-small-->
          <!--                color="indigo"-->
          <!--              >-->
          <!--                <v-icon>mdi-eye</v-icon>-->
          <!--              </v-btn>-->
          <!--              <v-btn-->
          <!--                :to="{ path: `/role/${item.id}/edit` }"-->
          <!--                fab-->
          <!--                x-small-->
          <!--                class="mx-2"-->
          <!--                color="green"-->
          <!--              >-->
          <!--                <v-icon>mdi-pencil</v-icon>-->
          <!--              </v-btn>-->
          <!--              <v-btn-->
          <!--                :to="{ path: `/role/${item.id}/delete` }"-->
          <!--                fab-->
          <!--                x-small-->
          <!--                color="red"-->
          <!--              >-->
          <!--                <v-icon>mdi-delete</v-icon>-->
          <!--              </v-btn>-->
          <!--            </td>-->
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
      expanded: [],
      headersMap: [
        { text: 'نام نمایش', value: 'display_name', align: 'start' },
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
    roles() {
      return this.$store.state.role.roles
    },
  },
}
</script>
