<template>
  <v-form ref="form" v-model="valid">
    <v-container grid-list-md text-xs-center>
      <v-layout>
        <v-flex xs12 sm6>
          <v-card>
            <v-card-title>
              <v-layout row wrap>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-text-field
                    :label="$t('routerDisplay')"
                    v-model="router.displayName"
                    :rules="$rules({dis:'routerDisplay'})"
                  ></v-text-field>
                </v-flex>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-text-field
                    :label="$t('routerOpera')"
                    v-model="router.operationName"
                    :rules="$rules({dis:'routerOpera'})"
                  ></v-text-field>
                </v-flex>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-text-field
                    :label="$t('routerRouterName')"
                    v-model="router.routerName"
                    :rules="$rules({dis:'routerRouterName'})"
                  ></v-text-field>
                </v-flex>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-text-field
                    :label="$t('routerPath')"
                    v-model="router.path"
                    :rules="$rules({dis:'routerPath'})"
                  ></v-text-field>
                </v-flex>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-text-field
                    :label="$t('routerIcon')"
                    v-model="router.icon"
                    :rules="$rules({dis:'routerIcon'})"
                  ></v-text-field>
                </v-flex>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-select :items="items" v-model="router.routerMenu" :label="$t('routerMenu')"></v-select>
                </v-flex>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-text-field :label="$t('routerRemark')" v-model="router.remark"></v-text-field>
                </v-flex>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-text-field :label="$t('routerOrderNo')" v-model="router.orderNo"></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-title>

            <v-layout row wrap v-if="routerList">
              <!-- <v-flex xs6 sm4 md4 lg3 v-for="(api,index) in routerList" :key="index">
                <v-container>
                  <v-card
                    @click="apiClick(index)"
                    :color="api.check ? 'blue lighten-4' : 'grey lighten-4'"
                  >
                    <v-card-title>{{ api.name }}</v-card-title>
                  </v-card>
                </v-container>
              </v-flex>-->
              <v-container>
                <v-chip-group v-model="routerSelect" column multiple>
                  <v-chip
                    filter
                    outlined
                    filter-icon="done"
                    active-class="primary--text"
                    v-for="(api,index) in routerList"
                    :key="index"
                    :value="api.id"
                  >{{ api.name }}</v-chip>
                </v-chip-group>
              </v-container>
            </v-layout>

            <v-card-actions>
              <v-layout row wrap>
                <v-btn text color="#1976d2" @click="create()">
                  <v-icon>save</v-icon>
                  {{$t('confirm')}}
                </v-btn>
                <v-btn text color="#1976d2" @click="cancel()">
                  <v-icon>keyboard_backspace</v-icon>
                  {{$t('cancel')}}
                </v-btn>
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
export default {
  data: () => ({
    valid: true,
    router: {},
    routerList: [],
    routerSelect: [],
    items: [
      { text: '是', value: 1 }, { text: '否', value: 0 }
    ]
  }),
  created() {
    this.router = this.$route.params ? this.$route.params : this.router;
    this.$set(this.router, 'routerMenu', this.router.routerMenu ? this.router.routerMenu : 0);
    this.router.createdAt = undefined;
    console.log(this.router);
    this.pageInit();
  },
  methods: {
    pageInit() {
      this.$axios.get('/sys-api-operation/find-list', {})
        .then(result => {
          _.map(result, (row) => { row.check = _.includes(this.router.apiOperationList, row.id); return row; });
          this.routerList = result;
          this.routerSelect = this.router ? this.router.apiOperationList : [];
        });
    },
    apiClick(index) {
      const item = this.routerList[index];
      item.check = !item.check;
      item.check ? this.routerSelect.push(item.id) : _.remove(this.routerSelect, (n) => { return n === item.id; });
    },
    create() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.router.delApiOperations = _.filter(this.router.apiOperationList, (id) => { return !_.includes(this.routerSelect, id); });// --删除的
      this.router.apiOperations = _.filter(this.routerSelect, (id) => { return !_.includes(this.router.apiOperationList, id); });// --新增的
      this.router.apiOperationList = undefined;
      this.$axios.post(`/sys-router-operation/update`, this.router)
        .then(result => {
          result
            ? this.$router.push({ name: 'router' })
            : this.$toast.fail(`${this.$t('error')}!`);
        }).catch((err) => {
          this.$toast.fail(`${this.$t('error')}!${err}`);
        });
    },
    cancel() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
