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
              data-cy="searchText"
              @click:append-outer="clickSearch"
            ></v-text-field>
            <template>
              <!-- <v-container fluid> -->
              <v-layout align-center justify-end fill-height>
                <v-btn
                  class="btn-add"
                  text
                  color="indigo"
                  :to="`/version/save`"
                  v-show="domType.add"
                  :disabled="domType._add"
                  data-cy="add"
                >
                  <v-icon>add</v-icon>
                  {{$t('add')}}
                </v-btn>
              </v-layout>
              <!-- </v-container> -->
            </template>
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:default="props">
        <v-layout row wrap>
          <v-flex v-for="(item,index) in props.items" :key="index" xs12 sm6 md4 lg3>
            <v-card>
              <v-layout>
                <v-flex xs8 sm8>
                  <v-card-title>
                    <h6>{{ item.title }}</h6>
                  </v-card-title>
                </v-flex>
                <template v-if="true">
                  <!-- <v-layout align-center justify-end fill-height> -->
                  <v-flex xs2 sm2 justify-end fill-height>
                    <v-btn
                      text
                      icon
                      color="indigo"
                      @click="clickEdit(item)"
                      v-show="domType.edit"
                      :disabled="domType._edit"
                      :data-cy="'edit'+index"
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex xs2 sm2>
                    <v-btn
                      text
                      icon
                      color="indigo"
                      @click="clickDelete(item.id)"
                      v-show="domType.del"
                      :disabled="domType._del"
                      :data-cy="'del'+index"
                    >
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-flex>
                  <!-- </v-layout> -->
                </template>
              </v-layout>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content class="align-end">{{ item.content }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>{{$t('versionNumber')}}</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.versionNumber }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>{{$t('createdUser')}}</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.SysUser.userName }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>{{$t('createdAt')}}</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.createdAt }}</v-list-item-content>
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
              <v-btn dark text color="primary" class="ml-2" v-on="on">
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
import viewBase from '../../base/view-base';
export default {
  extends: viewBase,
  data: () => ({
    totalItems: 0,
    itemsPerPageOptions: [4, 8, 12],
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
      this.pagination.page = 1;
    },
    pageInit() {
      this.$axios.get('/sys-version/find-list', {
        params: {
          offset: (this.pagination.page - 1) * this.pagination.rowsPerPage,
          limit: this.pagination.rowsPerPage,
          search: this.searchText
        }
      }).then(result => {
        this.items = result.rows;
        this.totalItems = result.count;
      });
    },
    clickDelete(id) {
      this.$axios.post(`/sys-version/destroy`, { id })
        .then(result => {
          result.id !== 0
            ? this.$toast.success(this.$t('success'))
            : this.$toast.fail(`${this.$t('error')}!`);
          this.pageInit();
        }).catch((err) => {
          this.$toast.fail(`${this.$t('error')}!${err}`);
        });
    },
    clickEdit(item) {
      this.$router.push({
        name: 'version-save',
        params: {
          id: item.id,
          title: item.title,
          content: item.content,
          versionNumber: item.versionNumber
        }
      });
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
