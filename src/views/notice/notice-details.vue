<template>
  <v-container fluid grid-list-md>
    <template>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3>
          <v-layout>
            <v-flex xs12 sm12>
              <v-card-title>
                <h6>{{ item.title }}</h6>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>{{ item.content }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-flex xs6 sm6>
                <v-list-item-content
                  class="align-end"
                >{{ $t('createdUser') }}：{{ item.SysUser.userName || '' }}</v-list-item-content>
              </v-flex>
              <v-flex xs6 sm6>
                <v-list-item-content class="align-end">{{ item.createdAt }}</v-list-item-content>
              </v-flex>
            </v-list-item>
          </v-list>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
// import _ from 'lodash';
import viewBase from '../../base/view-base';
export default {
  extends: viewBase,
  data: () => ({
    item: {
      title: '',
      content: '',
      createAt: '',
      SysUser: {
        userName: ''
      }
    }
  }),
  created() {
    this.pageInit();
  },
  methods: {
    pageInit() {
      const id = this.$route.query.id;
      this.$axios.get('/notice/find-info', {
        params: {
          id: id
        }
      }).then(result => {
        this.item = result;
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
.iterator-head {
  padding: 20px;
}
.btn-add {
  width: 50px;
}
</style>
