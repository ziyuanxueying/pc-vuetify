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
                    :label="$t('routerDomId')"
                    v-model="router.domId"
                    :rules="$rules({dis:'routerDomId'})"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-title>

            <v-container>
              <v-chip-group
                v-model="apiSelection"
                active-class="deep-purple--text text--accent-4"
                column
                multiple
              >
                <v-chip v-for="(btn,index) in routerList" :value="btn.id" :key="index">{{btn.name}}</v-chip>
              </v-chip-group>
            </v-container>
            <v-card-actions>
              <v-layout row wrap>
                <v-btn
                  text
                  color="#1976d2"
                  @click="create()"
                  v-show="domType.add"
                  :disabled="domType._add"
                  data-cy="add"
                >
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
import viewBase from '../../base/view-base';
export default {
  extends: viewBase,
  data: () => ({
    domType: {
      add: true,
      edit: true,
      del: true,
      _add: false,
      _edit: false,
      _del: false
    },
    valid: true,
    router: {},
    routerList: [],
    apiSelection: undefined
  }),
  created() {
    this.router = this.$route.params ? this.$route.params : this.router;
    // this.router.apiOperationId = _.chain(this.router.apiOperationId)
    //   .filter(p => p != null).value();
    console.log(this.router.apiOperationId);
    this.pageInit();
  },
  methods: {
    pageInit() {
      this.$axios.get('/sys-api-operation/find-list', {})
        .then(result => {
          _.map(result, (row) => { row.check = _.includes(this.router.apiOperationList, row.id); return row; });
          this.routerList = result;
          this.apiSelection = this.router.apiOperationId;
        });
    },
    create() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.router.id && (this.router.delApiOperations = _.difference(this.router.apiOperationId, this.apiSelection));// --删除的
      this.router.apiOperations = _.difference(this.apiSelection, this.router.apiOperationId);// --新增的
      this.router.apiOperationId = undefined;
      // 接口不包含createdAt
      this.router.createdAt = undefined;
      console.log(this.router);
      let url = this.router && this.router.id ? '/sys-dom-operation/update' : '/sys-dom-operation/create';
      this.$axios.post(url, this.router)
        .then(result => {
          result
            ? this.$router.back()
            : this.$toast.fail(`${this.$t('error')}!`);
        }).catch((err) => {
          this.$toast.fail(`${this.$t('error')}!${err}`);
        });
    },
    cancel() {
      this.$router.back();
    }
  },
  watch: {
    router: {
      handler() {
        // console.log(this.router.apiOperationId);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
