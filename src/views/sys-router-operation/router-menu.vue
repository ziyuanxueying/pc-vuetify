<template>
  <v-container fluid grid-list-md>
    <v-toolbar class="iterator-head" flat>
      <v-toolbar-title>{{ $t('routerMenuTitle')}}</v-toolbar-title>
    </v-toolbar>
    <v-layout>
      <v-flex xs12 sm6>
        <v-card xs10>
          <v-card-title>
            <h4>{{ router.displayName}}&nbsp;</h4>
            <h6>{{ $t('routerMenuTitle')}}</h6>
            <v-layout align-center justify-end fill-height>
              <v-btn
                class="btn-add"
                text
                color="indigo"
                @click="clickAdd"
                v-show="domType.add"
                :disabled="domType._add"
                data-cy="add"
              >
                <v-icon>add</v-icon>
                {{$t('add')}}
              </v-btn>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-layout v-for="(item,index) in items" :key="index" align-center justify-space-between>
            <v-flex xs6 sm6>
              <v-card-title>
                <h6>{{ item.displayName }}</h6>
              </v-card-title>
            </v-flex>
            <div>
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
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import _ from 'lodash';
import viewBase from '../../base/view-base';
export default {
  extends: viewBase,
  data: () => ({
    domType: {
      add: true,
      _add: false
    },
    totalItems: 0,
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      page: 1,
      rowsPerPage: 10
    },
    items: [],
    searchText: undefined,
    router: {}
  }),
  created() {
    this.router = this.$route.query ? this.$route.query : this.router;
    this.pageInit();
  },
  methods: {
    pageInit() {
      this.$axios.get('/sys-router-operation/find-list', {
        params: {
          offset: (this.pagination.page - 1) * this.pagination.rowsPerPage,
          limit: this.pagination.rowsPerPage,
          pid: this.router.id
        }
      }).then(result => {
        this.items = result.rows;
        console.log(this.items);
        this.totalItems = result.count;
      });
    },
    clickAdd() {
      const pid = this.router.id;
      this.router = {};
      this.router.pid = pid;
      this.$router.push({ name: 'router-save', params: this.router });
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
      if (router === 'router-menu') {
        this.router = item;
        this.pageInit();
      }
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
</style>
