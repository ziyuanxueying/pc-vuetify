<template>
  <v-container
    fluid
    grid-list-md
  >
    <v-layout
      row
      wrap
      align-end
      justify-end
      fill-height
    >
      <v-flex
        xs4
        md1
      >
        <v-btn
          class="ma-2"
          text
          color="indigo"
          @click.stop="meDrawer = !meDrawer"
        >
          <v-icon left>search</v-icon>
          {{$t('screen')}}
        </v-btn>
      </v-flex>
    </v-layout>
    <v-navigation-drawer
      fixed
      clipped
      v-model="meDrawer"
      app
      right
    >
      <v-card-title
        class="grey lighten-2"
        primary-title
      >{{ $t('choose') }}</v-card-title>
      <v-container>
        <v-layout
          row
          wrap
        >
          <v-flex
            xs6
            sm6
          >
            <div>開始時間</div>
            <v-menu
              v-model="menuStart"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateBegin"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="dateBegin"
                @input="menuStart = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex
            xs6
            sm6
          >
            <div>截止時間</div>
            <v-menu
              v-model="menuEnd"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateEnd"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                @input="menuEnd = false"
                v-model="dateEnd"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex
            xs12
            sm12
            md12
            lg12
            xl12
          >
            <v-text-field
              v-model="product.code"
              :label="$t('productCode')"
              :rules="$rules({dis:'productCode', required: false})"
            ></v-text-field>
          </v-flex>
          <v-flex
            xs12
            sm12
            md12
            lg12
            xl12
          >
            <v-select
              v-model="product.sellWellTypeId"
              :label="$t('sellWellTypeId')"
              :items="sellWellTypeIdArr"
              :item-value="'id'"
              :item-text="'name'"
              :rules="$rules({dis:'sellWellTypeId', required: false})"
            ></v-select>
          </v-flex>
          <v-flex
            xs12
            sm12
            md12
            lg12
            xl12
          >
            <v-select
              v-model="product.brandId"
              :label="$t('brandId')"
              :items="brandIdArr"
              :item-value="'id'"
              :item-text="'name'"
              :rules="$rules({dis:'brandId', required: false})"
            ></v-select>
          </v-flex>
          <v-flex
            xs12
            sm12
            md12
            lg12
            xl12
          >
            <v-text-field
              v-model="product.name"
              :label="$t('productName')"
              :rules="$rules({dis:'productName', required: false})"
            ></v-text-field>
          </v-flex>
          <v-flex
            xs12
            sm12
            md12
            lg12
            xl12
          >
            <v-checkbox
              :label="sortText"
              v-model="product.createdAtAsc"
            ></v-checkbox>
          </v-flex>
        </v-layout>
      </v-container>
      <v-layout>
        <v-btn
          text
          color="blue lighten-1"
          @click="doFilter"
        >{{$t('confirm')}}</v-btn>
        <v-btn
          text
          color="blue lighten-1"
          @click="resetFilter"
        >{{$t('reset')}}</v-btn>
      </v-layout>
    </v-navigation-drawer>

    <v-data-iterator
      :server-items-length="totalItems"
      :items="items"
      :footer-props="{ itemsPerPageOptions }"
      :items-per-page.sync="pagination.rowsPerPage"
      :no-data-text="$t('noDataTextGood')"
      hide-default-footer
    >
      <template v-slot:header></template>
      <template v-slot:default="props">
        <v-layout
          row
          wrap
        >
          <v-flex
            v-for="(item,index) in props.items"
            :key="index"
            xs12
            sm6
            md6
            lg4
          >
            <v-card style="height: 100%;">
              <v-flex class="product-img">
                <img
                  :src="item.img"
                  alt
                  srcset
                />
              </v-flex>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>{{$t('productCode')}}</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.code }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>{{$t('productName')}}</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.name }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>商品分類</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.sellWellType }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>{{$t('exchangeIntegral')}}</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.integral }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>{{$t('fanReturnIntegral')}}</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.fanReturnIntegral }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>{{$t('refereeReturnIntegral')}}</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.refereeReturnIntegral }}</v-list-item-content>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-flex
                class="control-btns"
                text-right
              >
                <v-btn
                  small
                  depressed
                  @click="show(item.id)"
                  data-cy="show"
                >{{$t('show')}}</v-btn>
              </v-flex>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
      <template v-slot:footer>
        <v-layout
          mt-2
          wrap
          align-center
          justify-center
        >
          <span class="grey--text">每頁記錄數</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                text
                color="primary"
                class="ml-2"
                v-on="on"
              >
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
import viewBase from '../../../base/view-base';
import _ from 'lodash';
export default {
  extends: viewBase,
  props: {
    drawer: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    // 筛选-筛选窗口是否显示
    meDrawer: false,
    // 筛选-开始时间
    dateBegin: undefined,
    // 筛选-结束时间
    dateEnd: undefined,
    // 筛选-開始時間窗口顯示
    menuStart: false,
    // 筛选-結束時間窗口顯示
    menuEnd: false,
    // 筛选-商品数据model
    product: {
      code: undefined,
      sellWellTypeId: undefined,
      brandId: undefined,
      name: undefined,
      createdAtAsc: false
    },
    brandEnable: true,

    // 分页-总记录数
    totalItems: 0,
    // 分页-每页记录数选择
    itemsPerPageOptions: [6, 18, 50, 100],
    // 分页-默认当前页及每页记录数
    pagination: {
      page: 1,
      rowsPerPage: 6
    },
    // 分页-当前页数据
    items: [],
    sellWellTypeIdArr: undefined,
    brandIdArr: undefined
  }),
  created() {
    this.brandInit();
    this.pageInit();
  },
  computed: {
    // 分页-总页数
    numberOfPages() {
      return Math.ceil(this.totalItems / this.pagination.rowsPerPage);
    },
    sortText() {
      return `商品發佈時間正序`;
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
    // 筛选-执行筛选条件
    doFilter() {
      // 关闭筛选窗口
      this.meDrawer = false;
      // 执行查询
      this.pageInit();
    },
    // 筛选-重置筛选条件
    resetFilter() {
      // 重置筛选条件
      this.dateBegin = undefined;
      this.dateEnd = undefined;
      this.product = {
        code: undefined,
        sellWellTypeId: undefined,
        brandId: undefined,
        name: undefined
      };
      // 关闭筛选窗口
      this.meDrawer = false;
      // 执行查询
      this.pageInit();
    },
    async pageInit() {
      // 获取类型下拉
      await this.productType();
      this.$axios.get('/product/find-list', {
        params: {
          offset: (this.pagination.page - 1) * this.pagination.rowsPerPage,
          limit: this.pagination.rowsPerPage,
          dateBegin: this.dateBegin,
          dateEnd: this.dateEnd,
          code: this.product.code,
          sellWellTypeId: this.product.sellWellTypeId,
          brandId: this.product.brandId,
          name: this.product.name,
          createdAtAsc: this.product.createdAtAsc
        }
      }).then(result => {
        this.items = _(result.rows).map(m => {
          m.sellWellType = _(this.sellWellTypeIdArr).filter({ id: m.productTypeId }).value()[0].name;
          return m;
        }).value();
        this.totalItems = result.count;
      });
    },
    show(id) {
      this.$router.push({ path: '/admin/product/product-show', query: { productId: id } });
    },
    del(id) {
      // 逻辑删除商品
      this.$axios.post('/product/delete-product', { id }).then(result => {
        this.pageInit();
      }).catch((err) => {
        this.$toast(err.message);
      });
    },
    productType() {
      this.$axios.get('/product-type/find-all').then(result => {
        this.sellWellTypeIdArr = result.rows;
      });
    },
    // 初始化获取品牌id列表下拉
    brandInit() {
      this.$axios.get('/brand/find-down-all').then(result => {
        this.brandIdArr = result.rows;
      });
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
.control-btns {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  button {
    margin-right: 5px;
  }
}
.iterator-head {
  padding: 20px;
}
.btn-add {
  width: 50px;
}
.product-img {
  text-align: center;
  height: 270px;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 260px;
  }
}
</style>
