<template>
  <v-form ref="form" v-model="valid">
    <v-container grid-list-md text-xs-center>
      <v-layout>
        <v-flex xs12 sm6>
          <v-card>
            <v-container>
              <v-text-field
                v-model="item.userName"
                :counter="10"
                :rules="$rules({dis:'userName'})"
                :label="$t('userName')"
                required
              ></v-text-field>
              <v-text-field
                v-model="item.realName"
                :rules="$rules({dis:'realName'})"
                :label="$t('realName')"
                required
              ></v-text-field>
              <v-text-field
                v-model="item.passWord"
                :rules="$rules({dis:'passWord'})"
                :label="$t('passWord')"
                required
              ></v-text-field>
              <v-select
                v-model="item.roleId"
                :items="roleNameList"
                item-text="roleName"
                item-value="id"
                :label="$t('roleName')"
                required
              ></v-select>
              <v-select
                v-model="item.shopId"
                :items="shopList"
                item-text="name"
                item-value="id"
                :label="$t('business')"
                required
              ></v-select>
              <v-divider style="margin-bottom: 10px;"></v-divider>
            </v-container>
            <v-card-actions>
              <v-layout row wrap>
                <v-btn
                  text
                  color="#1976d2"
                  @click="approval()"
                  v-show="domType.upd"
                  :disabled="domType._upd"
                  data-cy="upd"
                >{{$t('upd')}}</v-btn>
                <v-btn text color="#1976d2" @click="cancel()">{{$t('cancel')}}</v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>
<script>
import _ from 'lodash';

import viewBase from '../../base/view-base';
export default {
  extends: viewBase,
  data: () => ({
    valid: true,
    item: {},
    reserveTime: undefined,
    roleNameList: [],
    shopList: []
  }),
  created() {
    this.pageInit(this.$route.query.id);
  },
  methods: {
    pageInit(id) {
      // 查询编辑数据
      id && this.$axios.get(`/sys-user/${id}`).then(result => {
        this.item = result;
      });
      // 查询店铺信息list
      // shop/find-binddata
      this.$axios.get(`/shop/find-bind-data`)
        .then(result => {
          this.shopList = result;
        }).catch((err) => {
          this.$toast.fail(`${this.$t('error')}!${JSON.stringify(err)}`);
        });
      // 查询所有角色list
      this.$axios.get(`/sys-role/find-binddata`)
        .then(result => {
          this.roleNameList = result;
        }).catch((err) => {
          this.$toast.fail(`${this.$t('error')}!${JSON.stringify(err)}`);
        });
    },
    approval() {
      if (!this.item) {
        return this.$toast.fail(`refundId is not exist!`);
      }
      let url = '/sys-user/create-user';
      _.get(this.item, 'id') && (url = '/sys-user/update-user');
      console.log(this.item);
      // 接口參數不包含roleName
      this.item.roleName = undefined;
      this.$axios.post(url, this.item)
        .then(result => {
          result
            ? this.$router.push({ name: 'user' })
            : this.$toast.fail(`${this.$t('error')}!`);
        }).catch((err) => {
          this.$toast.fail(`${this.$t('error')}!${JSON.stringify(err)}`);
        });
    },
    cancel() {
      this.$router.push({ name: 'user' });
    }
  }
};
</script>

<style lang="scss" scoped>
.acl {
  color: cadetblue;
}
</style>
