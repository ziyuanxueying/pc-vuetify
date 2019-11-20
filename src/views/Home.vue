<template>
  <v-container fluid grid-list-md>
    <template>
      <v-layout row wrap style="backgroundColor:#1976d2;">
        <v-flex xs12 sm12 md12 lg12>
          <v-layout row wrap style="backgroundColor:#ededed;" ml-1 py-2>
            <v-flex xs12 ml-2>
              {{ $t('homeWelcome') }}：
              <span class="red--text">{{ username }}</span>
            </v-flex>
            <v-flex xs12 ml-2>{{ $t('homeNowTime') }}：{{ nowTime }}</v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </template>
    <template>
      <v-layout row wrap style="border:1px solid #ededed; position: reactive;" mt-10>
        <span
          class="white"
          style="padding:0 6px; margin:0 10px; margin-top: -12px; position: absolute;"
        >{{ $t('homeNotice') }}</span>
        <v-layout mt-5 mb-4 px-4>
          <v-flex xs4 sm3 md2 lg2>
            <v-card outlined @click="goToCheck">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-flex text-center px-0>{{ $t('homeCheck') }}</v-flex>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-flex text-center px-0>{{ checkCount }}</v-flex>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-flex>
          <v-flex xs4 sm3 md2 lg2>
            <v-card outlined @click="goToNotice">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-flex text-center px-0>{{ $t('homeUnread') }}</v-flex>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-flex text-center px-0>{{ unreadCount }}</v-flex>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-layout>
    </template>
    <template>
      <v-layout row wrap style="border:1px solid #ededed; position: reactive;" mt-10>
        <span
          class="white"
          style="padding:0 6px; margin:0 10px; margin-top: -12px; position: absolute;"
        >{{ $t('homeVersion') }}</span>
        <v-layout mt-6 mb-5 px-5>
          <template>
            <v-expansion-panels>
              <v-expansion-panel v-for="(item,i) in items" :key="i">
                <v-expansion-panel-header expand-icon="mdi-menu-down">
                  <v-container>
                    <v-layout>
                      <v-flex xs6 px-0 py-0>{{ item.title }} {{ item.versionNumber }}</v-flex>
                      <v-flex
                        xs6
                        text-right
                        class="body-2 font-weight-light"
                        px-0
                        py-0
                      >{{ fromatDate(item.createdAt) }}</v-flex>
                    </v-layout>
                  </v-container>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="body-2">{{ item.content }}</v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>
        </v-layout>
      </v-layout>
    </template>
  </v-container>
</template>
<script>
const dateFormat = require('dateformat');
export default {
  data() {
    return {
      items: [],
      nowTime: '',
      timer: null,
      username: '',
      unreadCount: 0,
      checkCount: 0
    };
  },
  created() {
    const self = this;
    this.timer = setInterval(() => {
      self.nowTime = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
    }, 1000);
    let user = JSON.parse(sessionStorage.getItem('user'));
    this.username = user.userName;
    this.init();
  },
  methods: {
    init() {
      Promise.all(
        [
          this.$axios.get('/sys-version/find-list', {
            params: {
              offset: 0,
              limit: 5
            }
          }),
          this.$axios.get('/home-page/count'),
          this.$axios.get('/shop/find-list', {
            params: {
              offset: 0,
              limit: 0,
              state: 20
            }
          })
        ]).then(result => {
        this.items = result[0].rows;
        this.unreadCount = result[1].notice;
        this.checkCount = result[2].count;
      });
    },
    goToCheck() {
      this.$router.push({ name: 'check-list' });
    },
    goToNotice() {
      this.$router.push({ name: 'notice-unread' });
    },
    fromatDate(t) {
      return dateFormat(new Date(t), 'yyyy-mm-dd');
    }
  },
  destroyed() {
    clearInterval(this.timer);
  },
  components: {

  }
};
</script>
