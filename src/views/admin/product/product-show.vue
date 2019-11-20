<template>
  <v-form ref="form">
    <v-container
      grid-list-md
      text-xs-center
    >
      <v-layout>
        <v-flex
          xs12
          sm10
          md8
        >
          <v-card>
            <v-card-text>
              <v-layout
                row
                wrap
                style="color:#000; font-size:16px"
              >
                <v-flex
                  xs5
                  text-right
                >{{$t('shop')}}：</v-flex>
                <v-flex
                  xs7
                  sm7
                  md7
                  lg7
                  xl7
                >{{product.shopName}}</v-flex>
                <v-flex
                  xs5
                  text-right
                >{{$t('productCode')}}：</v-flex>
                <v-flex
                  xs7
                  sm7
                  md7
                  lg7
                  xl7
                >{{product.code}}</v-flex>
                <v-flex
                  xs5
                  text-right
                >{{$t('productType')}}：</v-flex>
                <v-flex
                  xs7
                  sm7
                  md7
                  lg7
                  xl7
                >{{product.productTypeName}}</v-flex>
                <v-flex
                  xs5
                  text-right
                >{{$t('sellWellTypeId')}}：</v-flex>
                <v-flex
                  xs7
                  sm7
                  md7
                  lg7
                  xl7
                >{{product.sellWellTypeName}}</v-flex>
                <v-flex
                  xs5
                  text-right
                >{{$t('brandId')}}：</v-flex>
                <v-flex
                  xs7
                  sm7
                  md7
                  lg7
                  xl7
                >{{product.brandName}}</v-flex>
                <v-flex
                  xs5
                  text-right
                >{{$t('productName')}}：</v-flex>
                <v-flex
                  xs7
                  sm7
                  md7
                  lg7
                  xl7
                >{{product.name}}</v-flex>
                <v-flex
                  xs5
                  text-right
                >{{$t('productTitle')}}：</v-flex>
                <v-flex
                  xs7
                  sm7
                  md7
                  lg7
                  xl7
                >{{product.title}}</v-flex>
                <v-flex
                  xs5
                  text-right
                >{{$t('exchangeIntegral')}}：</v-flex>
                <v-flex
                  xs7
                  sm7
                  md7
                  lg7
                  xl7
                >{{product.integral}}</v-flex>
                <v-flex
                  xs5
                  text-right
                >{{$t('fanReturnIntegral')}}：</v-flex>
                <v-flex
                  xs7
                  sm7
                  md7
                  lg7
                  xl7
                >{{product.fanReturnIntegral}}</v-flex>
                <v-flex
                  xs5
                  text-right
                >{{$t('refereeReturnIntegral')}}：</v-flex>
                <v-flex
                  xs7
                  sm7
                  md7
                  lg7
                  xl7
                >{{product.refereeReturnIntegral}}</v-flex>
                <v-flex xs12>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex
                  xs12
                  sm12
                  md12
                  lg12
                  xl12
                >
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      xs4
                      sm4
                      text-center
                    >{{$t('currencyType')}}</v-flex>
                    <v-flex
                      xs4
                      sm4
                      text-center
                    >{{$t('normalPrice')}}</v-flex>
                    <v-flex
                      xs4
                      sm4
                      text-center
                    >{{$t('fanPrice')}}</v-flex>
                  </v-layout>
                  <v-layout
                    v-for="(item,index) in prices"
                    :key="index"
                    row
                    wrap
                  >
                    <v-flex
                      xs4
                      sm4
                    >
                      <v-select
                        readonly
                        v-model="item.currency"
                        :items="currencyArr"
                        :item-value="'id'"
                        :item-text="'name'"
                      ></v-select>
                    </v-flex>
                    <v-flex
                      xs4
                      sm4
                    >
                      <v-text-field
                        readonly
                        v-model="item.price"
                        :placeholder="$t('normalPrice')"
                      ></v-text-field>
                    </v-flex>
                    <v-flex
                      xs4
                      sm4
                    >
                      <v-text-field
                        readonly
                        v-model="item.fanPrice"
                        :placeholder="$t('fanPrice')"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm12
                  md12
                  lg12
                  xl12
                  text-xs-left
                  text-lg-left
                  text-md-left
                  text-sm-left
                  text-xl-left
                >
                  <v-flex style="width:100px; height: 100px; border: 1px #ccc dashed; display:flex; align-items:center; justify-content: center;">
                    <v-img
                      v-if="product.img"
                      :src="product.img"
                      style="max-width:90px;max-height:90px;"
                    ></v-img>
                  </v-flex>
                </v-flex>
                <v-flex xs12>{{$t('introduceText')}}：</v-flex>
                <v-flex xs12>{{product.introduceText}}</v-flex>
                <v-flex xs12>{{$t('productRemark')}}：</v-flex>
                <v-flex xs12>{{product.remark}}</v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-layout
                row
                wrap
              >
                <v-flex
                  xs12
                  text-right
                >
                  <v-btn
                    text
                    color="#1976d2"
                    @click="cancel"
                  >
                    <v-icon>keyboard_backspace</v-icon>
                    {{$t('back')}}
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import * as _ from 'lodash';

export default {
  data: () => ({
    brandIdArr: undefined,
    // 商家
    shopArr: undefined,
    // 产品分类
    productTypeArr: undefined,
    // 商品数据model
    product: {
      id: undefined,
      shopId: undefined,
      code: undefined,
      productTypeId: undefined,
      sellWellTypeId: undefined,
      brandId: undefined,
      name: undefined,
      title: undefined,
      integral: undefined,
      fanReturnIntegral: undefined,
      normalReturnIntegral: undefined,
      refereeReturnIntegral: undefined,
      img: undefined,
      imgSuffix: undefined,
      barcode: undefined,
      introduceText: undefined,
      remark: undefined,
      prices: undefined
    },
    // 商品价格列表
    prices: [
      {
        currency: 'HKD',
        price: undefined,
        fanPrice: undefined
      }
    ],
    orderId: undefined
  }),
  created() {
    this.brandInit();
  },
  mounted() {
    this.product.id = this.$route.query.productId;
    this.$route.query.orderId && (this.orderId = this.$route.query.orderId);
    console.log(this.$route.query);
    this.pageInit();
  },
  computed: {
    currencyArr() {
      return [{ id: 'HKD', name: this.$t('HKD') }, { id: 'RMB', name: this.$t('RMB') }];
    }
  },
  methods: {
    pageInit() {
      // 商品分类列表
      const ajaxProductType = this.$axios.get('/product-type/find-all');
      // 店铺列表
      const ajaxShop = this.$axios.get('/shop/find-bind-data');
      Promise.all([ajaxProductType, ajaxShop]).then(result => {
        this.productTypeArr = result[0];
        this.shopArr = result[1];
        // 分类、店铺加载完成后，如果是编辑商品，则查询商品信息并赋值
        if (this.product.id) {
          this.$axios.get('/product/find-by-id', { params: { id: this.product.id } }).then(result => {
            this.product = result;
            this.product.remark = this.product.productDetail[0].remark;
            this.prices = this.product.productPrice;

            const shop = _(this.shopArr).filter({ id: this.product.shopId }).value();
            shop && shop.length > 0 && (this.product.shopName = shop[0].name);

            const productType = _(this.productTypeArr).filter({ id: this.product.productTypeId }).value();
            productType && productType.length > 0 && (this.product.productTypeName = productType[0].name);

            const sellWellType = _(this.productTypeArr).filter({ id: this.product.sellWellTypeId }).value();
            sellWellType && sellWellType.length > 0 && (this.product.sellWellTypeName = sellWellType[0].name);

            const brand = _(this.brandIdArr).filter({ id: this.product.brandId }).value();
            brand && brand.length > 0 && (this.product.brandName = brand[0].name);
          });
        }
      });
    },
    cancel() {
      if (this.orderId) {
        this.$router.back(-1);
      } else {
        this.$router.push(`/admin/product`);
      }
    },
    // 初始化获取品牌id列表下拉
    brandInit() {
      this.$axios.get('/brand/find-down-all').then(result => {
        this.brandIdArr = result.rows;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
