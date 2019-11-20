<template>
  <v-container grid-list-md>
    <v-layout row wrap align-center justify-space-between>
      <v-flex xs6 sm6 md6>{{address}}</v-flex>
      <v-flex xs6 sm6 md6 :class="`f-right`">{{thisDate}}</v-flex>
      <!-- 手機 -->
      <v-flex v-if="$vuetify.breakpoint.xsOnly">
        <v-btn color="success" to="zxing">{{$t('zxing')}}</v-btn>
      </v-flex>
      <!-- 手機end -->
      <!-- 電腦 -->
      <v-flex xs12>
        <v-textarea outline :label="$t('input-qrcode')" :value="qrcode"></v-textarea>
      </v-flex>
      <!-- end電腦 -->
      <!-- 手機 -->
      <v-flex v-if="$vuetify.breakpoint.xsOnly"></v-flex>
      <!-- 手機end -->
      <!-- 電腦 -->
      <v-flex v-else>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :footer-props="{ itemsPerPageOptions }"
          :items-per-page.sync="pagination.rowsPerPage"
          :server-items-length="totalDesserts"
          :loading="loading"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item,index) in items" :key="index">
                <td>{{ item.name }}</td>
                <td class="text-right">{{ item.calories }}</td>
                <td class="text-right">{{ item.fat }}</td>
                <td class="text-right">{{ item.carbs }}</td>
                <td class="text-right">{{ item.protein }}</td>
                <td class="text-right">{{ item.iron }}</td>
              </tr>
            </tbody>
          </template>
          <template v-slot:footer>
            <v-layout mt-2 wrap align-center justify-center>
              <span class="grey--text">每頁記錄數</span>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn text color="primary" class="ml-2" v-on="on">
                    {{ pagination.rowsPerPage }}
                    <v-icon>keyboard_arrow_down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(number, index) in itemsPerPageOptions"
                    :key="index"
                    @click="updateItemsPerPage(number)"
                  >
                    <v-list-item-title>{{ number }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <span class="grey--text">共 {{totalDesserts}} 條</span>

              <v-spacer></v-spacer>

              <span class="mr-4 grey--text">Page {{ pagination.page }} of {{ numberOfPages }}</span>
              <v-btn
                text
                fab
                small
                color="blue"
                :disabled="pagination.page === 1"
                @click="formerPage"
              >
                <v-icon>keyboard_arrow_left</v-icon>
              </v-btn>
              <v-btn
                text
                fab
                small
                color="blue"
                :disabled="pagination.page >= numberOfPages"
                @click="nextPage"
              >
                <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-layout>
          </template>
        </v-data-table>
      </v-flex>
      <!-- end電腦 -->
    </v-layout>
  </v-container>
</template>

<script>
import dateFormat from 'dateformat';
import i18n from '../plugins/i18n';

export default {
  data: () => ({
    address: '马百良上环皇后大道店',
    thisDate: dateFormat(new Date(), 'yyyy-mm-dd'),
    qrcode: undefined,
    headers: [{
      text: i18n.t('no'),
      sortable: false,
      value: 'no'
    }, {
      text: i18n.t('product.name'),
      value: 'product.name'
    }, {
      text: i18n.t('quantity'),
      value: 'quantity'
    }, {
      text: i18n.t('productAmount'),
      value: 'productAmount'
    }, {
      text: i18n.t('barcodeStatus'),
      value: 'barcodeStatus'
    }, {
      text: i18n.t('tools'),
      sortable: false
    }],
    desserts: [],
    pagination: {
      descending: undefined,
      page: 1,
      rowsPerPage: 6, // -1 for All",
      sortBy: undefined,
      totalItems: 0
    },
    itemsPerPageOptions: [6, 18, 50, 100],
    totalDesserts: 0,
    loading: false
  }),
  computed: {
    numberOfPages() {
      return Math.ceil(this.totalDesserts / this.pagination.rowsPerPage);
    }
  },
  methods: {
    // 下一頁
    nextPage() {
      if (this.pagination.page + 1 <= this.numberOfPages) this.pagination.page += 1;
    },
    // 上一頁
    formerPage() {
      if (this.pagination.page - 1 >= 1) this.pagination.page -= 1;
    },
    // 更換每頁記錄數
    updateItemsPerPage(number) {
      this.pagination.rowsPerPage = number;
    },
    findOrderByUser() {

    }
  }
};
</script>

<style lang="scss" scoped>
.f-right {
  text-align: right;
}
</style>
