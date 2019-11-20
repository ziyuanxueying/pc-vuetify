<template>
  <v-navigation-drawer fixed clipped v-model="meDrawer" app right>
    <v-card-title class="grey lighten-2" primary-title>{{ $t('choose') }}</v-card-title>
    <v-list dense v-for="item in navArray" :key="item.id">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ $t(item.text) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-container>
        <v-layout row wrap v-if="item.id===1">
          <v-flex v-for="i in 3" :key="`4${i}`" xs4>
            <v-btn
              @click="newActive = i "
              :key="`card${i}`"
              :color="newActive === i ? 'primary' : 'grey lighten-4'"
            >{{`Active${i}`}}</v-btn>
          </v-flex>
        </v-layout>
        <v-layout row wrap v-if="item.id===2">
          <v-flex xs6 sm6>
            <div>开始时间</div>
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
                <v-text-field v-model="dateBegin" prepend-icon="event" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="dateBegin" @input="menuStart = false" @change="dateChoose"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs6 sm6 @click="pageInit2">
            <div>截止时间</div>
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
                <v-text-field v-model="dateEnd" prepend-icon="event" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker @input="menuEnd = false" v-model="dateEnd" @change="pageInit2"></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>

        <v-layout row wrap v-if="item.id===3" xs12 sm6 md3>
          <v-text-field v-model="orderId" placeholder="请输入要查询的订单号"></v-text-field>
        </v-layout>
      </v-container>
    </v-list>
    <v-container>
      <div>{{$t('selections')}}</div>
      <v-layout row wrap>
        <v-flex v-for="choose in chooseArray" :key="choose.id">
          <v-card
            @click="choose.click = !choose.click"
            :color="choose.click ? 'primary' : 'grey lighten-4'"
          >
            <v-card-text>{{`Active${choose.id}`}}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-layout>
      <v-btn text color="blue lighten-1" @click="meDrawer=false">{{$t('confirm')}}</v-btn>
      <v-btn text color="blue lighten-1">{{$t('reset')}}</v-btn>
    </v-layout>
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
    newActive: undefined,
    meDrawer: true,
    navArray: [
      {
        id: 1,
        text: 'brand'
      },
      {
        id: 2,
        text: 'date'
      },
      {
        id: 3,
        text: 'order'
      }
    ],
    chooseArray: [
      {
        id: 1,
        click: false
      },
      {
        id: 2,
        click: false
      },
      {
        id: 3,
        click: false
      }
    ],
    dateBegin: new Date(new Date().setDate(new Date().getDate())).toISOString().substr(0, 10),
    dateEnd: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().substr(0, 10),
    // 開始時間窗口顯示
    menuStart: false,
    // 結束時間窗口顯示
    menuEnd: false,
    orderId: undefined
  }),
  computed: {
    getNavArray() {
      let tlist = this.navArray;
      if (tlist && this.$store.getters['auth/user'].userName === 'mingshang') {
        tlist = _.filter(tlist, { index: 5 });
        // tlist = _.find(tlist, [7, 5]);
      } else {
        tlist = _.reject(tlist, { id: 3 });
      }
      return tlist;
    }
  },
  watch: {
    drawer(value) {
      this.meDrawer = value;
    },
    meDrawer(value) {
      this.$emit('todrawer', value);
    }
  },
  methods: {
    chooseClick(item) {

    },
    pageInit(e) {
      console.log(e);
      this.menu2 = !this.menu2;
    },
    pageInit2(e) {
      this.menu2 = !this.menu2;
      console.log(this.menu2);
    },
    dateChoose(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
