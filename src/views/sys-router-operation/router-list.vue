<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      :server-items-length="totalItems"
      :items="items"
      :footer-props="{ itemsPerPageOptions }"
      :items-per-page.sync="pagination.rowsPerPage"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar class="mb-2 iterator-head" flat>
          <v-toolbar-title style="width:100%;">
            <v-text-field
              :placeholder="$t('searchPlaceholder')"
              v-model="searchText"
              append-outer-icon="search"
              @click:append-outer="clickSearch"
            ></v-text-field>
            <template>
              <v-layout align-center justify-end fill-height>
                <v-btn
                  class="btn-add"
                  text
                  color="indigo"
                  :to="`/router/save`"
                  v-show="domType.add"
                  :disabled="domType._add"
                  data-cy="add"
                >
                  <v-icon>add</v-icon>
                  {{$t('add')}}
                </v-btn>
              </v-layout>
            </template>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:default="props">
        <v-layout row wrap>
          <v-flex v-for="(item,index) in items" :key="index" xs12 sm6 md4 lg4>
            <v-card>
              <v-layout align-center justify-space-between>
                <v-flex xs6 sm6>
                  <v-card-title>
                    <h6>{{ $t(item.displayName) }}</h6>
                  </v-card-title>
                </v-flex>
                <div>
                  <v-btn
                    text
                    small
                    icon
                    color="indigo"
                    @click="clickRouter('router-btn',item)"
                    v-show="domType.routerBtn"
                    :disabled="domType._routerBtn"
                    data-cy="routerBtn"
                  >{{$t('routerBtn')}}</v-btn>
                  <v-btn
                    text
                    small
                    icon
                    color="indigo"
                    @click="clickRouter('router-menu',item)"
                    v-show="domType.routerMenu"
                    :disabled="domType._routerMenu"
                    data-cy="routerMenu"
                  >
                    <v-icon>list_alt</v-icon>
                  </v-btn>
                  <v-btn
                    text
                    small
                    icon
                    color="indigo"
                    @click="clickEdit('router-save',item)"
                    v-show="domType.edit"
                    :disabled="domType._edit"
                    data-cy="edit"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn
                    text
                    small
                    icon
                    color="indigo"
                    @click="clickDelete(item.id)"
                    v-show="domType.del"
                    :disabled="domType._del"
                    data-cy="del"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </div>
              </v-layout>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>{{$t('routerOpera')}}</v-list-item-content>
                  <div class="align-end">{{ item.operationName }}</div>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>{{$t('routerRouterName')}}</v-list-item-content>
                  <div class="align-end">{{ item.routerName }}</div>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>{{$t('routerPath')}}</v-list-item-content>
                  <div class="align-end">{{ item.path }}</div>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>{{$t('routerMenu')}}</v-list-item-content>
                  <div class="align-end">{{ item.routerMenu === 1?'是':'否' }}</div>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>{{$t('routerRemark')}}</v-list-item-content>
                  <div class="align-end">{{ item.remark }}</div>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>{{$t('routerOrderNo')}}</v-list-item-content>
                  <div class="align-end">{{ item.orderNo }}</div>
                </v-list-item>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
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
          <span class="grey--text">共 {{totalItems}} 條</span>
          <v-spacer></v-spacer>
          <span class="mr-4 grey--text">Page {{ pagination.page }} of {{ numberOfPages }}</span>
          <span>
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
          </span>
        </v-layout>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
// import _ from 'lodash';
import viewBase from '../../base/view-base';
export default {
  extends: viewBase,
  data: () => ({
    totalItems: 0,
    itemsPerPageOptions: [4, 8, 12, 50],
    pagination: {
      page: 1,
      rowsPerPage: 8
    },
    items: [],
    searchText: undefined
  }),
  created() {
    this.pageInit();
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.totalItems / this.pagination.rowsPerPage);
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
    pageInit() {
      this.$axios.get('/sys-router-operation/find-list', {
        params: {
          offset: (this.pagination.page - 1) * this.pagination.rowsPerPage,
          limit: this.pagination.rowsPerPage
        }
      }).then(result => {
        this.items = result.rows;
        this.totalItems = result.count;
      });
    },
    clickDelete(id) {
      this.$axios.post(`/sys-router-operation/destroy`, { id })
        .then(result => {
          result.id !== 0
            ? this.$toast.success(this.$t('success'))
            : this.$toast.fail(`${this.$t('error')}!`);
          this.pageInit();
        }).catch((err) => {
          this.$toast.fail(`${this.$t('error')}!${err}`);
        });
    },
    clickRouter(router, item) {
      this.$router.push({ name: router, query: { id: item.id, displayName: item.displayName } });
    },
    clickEdit(router, item) {
      this.$router.push({ name: router, params: item });
    },
    clickSearch() {
      this.pagination = {
        page: 1,
        rowsPerPage: 10
      };
    }
  },
  watch: {
    pagination: {
      handler() {
        this.pageInit();
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.iterator-head {
  padding: 20px;
}
.btn-add {
  width: 50px;
}
.align-end {
  text-align: right !important;
}
</style>
