<template>
  <v-navigation-drawer style="top:48px" fixed clipped v-model="meDrawer" app>
    <v-list dense>
      <v-list-item v-for="item in navArray" :key="item.id" :to="item.path">
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ $t(item.text) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div style="height:58px;">
      <!--navigation-drawer控件高度不能使用计算，默认值是100vh，所以需要底部填充，让手机显示正常-->
    </div>
  </v-navigation-drawer>
</template>

<script>
import * as _ from 'lodash';
export default {
  props: {
    drawer: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    meDrawer: true,
    navArray: [
      {
        id: 10,
        icon: 'fa-home',
        text: 'home',
        path: '/'
      },
      {
        id: 20,
        icon: 'fa-list',
        text: 'role',
        path: '/role'
      },
      {
        id: 30,
        icon: 'fa-list',
        text: 'user',
        path: '/user'
      },
      {
        id: 40,
        icon: 'fa-list',
        text: 'router',
        path: '/router'
      },
      {
        id: 50,
        icon: 'fa-list',
        text: 'api',
        path: '/api'
      },
      {
        id: 120,
        icon: 'fa-list',
        text: 'notice',
        path: '/notice',
        index: 5
      }, {
        id: 130,
        icon: 'fa-list',
        text: 'version',
        path: '/version',
        index: 5
      }
    ]
  }),
  computed: {
    // getNavArray() {
    //   let tlist = this.navArray;
    //   if (tlist && this.$store.getters['auth/user'].userName === 'mingshang') {
    //     tlist = _.filter(tlist, { index: 5 });
    //     // tlist = _.find(tlist, [7, 5]);
    //   } else {
    //     // tlist = _.reject(tlist, { id: 3 });
    //   }
    //   return tlist;
    // }
  },
  created() {
    this.navFilter();
  },
  methods: {
    async navFilter() {
      const user = this.$store.getters['auth/user'];
      if (user.userName === 'admin') {
        return;
      }
      const routerList = user.router;
      this.navArray = _.chain(routerList)
        .filter(p => p.routerMenu === 1)
        .uniqBy(p => p.id)
        .orderBy(p => _.toNumber(p.orderNo))
        .map((p, index) => {
          return {
            id: p.id,
            icon: p.icon,
            text: p.routerName,
            path: p.path,
            index
          };
        }).value();
    }
  },
  watch: {
    drawer(value) {
      this.meDrawer = value;
    },
    meDrawer(value) {
      this.$emit('todrawer', value);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
