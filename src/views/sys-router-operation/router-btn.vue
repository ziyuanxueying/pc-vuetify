<template>
  <v-container fluid grid-list-md>
    <v-toolbar class="mb-2 iterator-head" flat>
      <v-toolbar-title style="width:100%;">{{$t('routerBtnTitle')}}</v-toolbar-title>
    </v-toolbar>
    <v-layout>
      <v-flex xs12 sm6>
        <v-card>
          <v-card-title>
            <h4>{{ router.displayName}}&nbsp;</h4>
            <h6>{{ $t('routerBtnTitle')}}</h6>
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
          <v-layout v-for="(item,index) in items" :key="index" align-center>
            <v-flex>
              <v-card-text>{{$t(item.domId)}}</v-card-text>
            </v-flex>
            <v-spacer></v-spacer>
            <div>
              <v-btn
                text
                small
                icon
                color="indigo"
                @click="clickRouter('router-savebtn',item)"
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
                @click="clickDelete(item)"
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
// import _ from 'lodash';\
import viewBase from '../../base/view-base';
export default {
  extends: viewBase,
  data: () => ({
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
      this.$axios.get('/sys-dom-operation/find-list', {
        params: {
          routerOperationId: this.router.id
        }
      }).then(result => {
        this.items = result;
      });
    },
    clickAdd() {
      let item = {};
      item.routerOperationId = this.router.id;
      this.$router.push({ name: 'router-savebtn', params: item });
    },
    clickDelete(item) {
      let itemIds = {};
      itemIds.id = item.id;
      itemIds.apiDomOperationId = item.apiDomOperationId;
      this.$axios.post(`/sys-dom-operation/destroy`, itemIds)
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
