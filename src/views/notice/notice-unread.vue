<template>
  <v-container fluid grid-list-md>
    <v-data-iterator :items="items" hide-default-footer>
      <template v-slot:default="props">
        <v-layout row wrap>
          <v-flex v-for="(item,index) in props.items" :key="index" xs12 sm6 md4 lg3>
            <v-card @click="clickDetails(item)">
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
    </v-data-iterator>
  </v-container>
</template>

<script>
import viewBase from '../../base/view-base';
// import _ from 'lodash';
export default {
  extends: viewBase,
  data: () => ({
    items: []
  }),
  created() {
    this.pageInit();
  },
  methods: {
    pageInit() {
      this.$axios.get('/notice/unread-list').then(result => {
        this.items = result;
      });
    },
    clickDetails(item) {
      this.$router.push({
        name: 'notice-details',
        query: {
          id: item.id
        }
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
