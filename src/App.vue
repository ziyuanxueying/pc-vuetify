<template>
  <v-app>
    <div style="height:48px;"></div>
    <!-- 导航 -->
    <w-navigation v-if="$store.getters['auth/user']" :drawer="drawer" @todrawer="(p)=> drawer = p"></w-navigation>
    <!-- 导航end -->
    <!-- 标题 -->
    <v-app-bar color="primary" dense fixed>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>{{$t('advokate')}}</span>
        <span class="font-weight-light">{{$t('pc')}}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text style="padding: 0;">
        <v-icon>person</v-icon>
        <span>{{userName}}</span>
      </v-btn>
      <!-- <v-btn text @click="openHelpPage">
          <v-icon>help</v-icon>
          <span>{{$t('help')}}</span>
      </v-btn>-->
      <v-btn data-cy="btnOut" v-if="isLogin" text @click="btnLogOut" style="padding: 0;">
        <v-icon>input</v-icon>
        <!-- <span>{{$t('logout')}}</span> -->
      </v-btn>
      <v-toolbar-title style="min-width:100px">
        <v-select
          v-model="i18nValue"
          :items="i18nArray"
          ref="lang"
          menu-props="auto"
          label="Select"
          hide-details
          prepend-icon="fa-language"
          single-line
          style="max-width:120px"
          @change="changeLanguage"
        ></v-select>
      </v-toolbar-title>
    </v-app-bar>
    <!-- 标题end -->
    <v-content class="v-content">
      <div class="v-body">
        <router-view />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import WNavigation from './components/WNavigation.vue';
export default {
  name: 'App',
  components: {
    WNavigation
  },
  data: () => ({
    drawer: true,
    i18nValue: process.env.VUE_APP_I18N_LOCALE,
    i18nArray: ['en', 'zh-cn', 'zh-hk']
  }),
  computed: {
    userName() {
      if (!this.$store.getters['auth/user']) return this.$t('loginPlease');
      return '';
      // return this.$store.getters['auth/user'].userName;
    },
    isLogin() {
      return !!this.$store.getters['auth/user'];
    }
  },
  // watch: {
  //   i18nValue(value) {
  //     this.$i18n.locale = value;
  //   }
  // },
  methods: {
    /**
    * 退出按钮点击事件
    */
    btnLogOut() {
      this.$axios.post('/sys-user/logout')
        .then((result) => {
          this.$store.dispatch('auth/logoutSuccess');
          this.$router.push('/login');
        }).catch((err) => {
          this.$toast(err.message);
        });
    },
    /**
     * 选择语言
     */
    changeLanguage() {
      // 更改多语言选择加载
      this.$i18n.locale = this.i18nValue;
      // 清除焦点，以显示 fa-language 的icon图标
      this.$refs['lang'].blur();
    }
  }
};
</script>

<style lang="scss" scoped>
.v-content {
  background-color: #ededed;

  .v-body {
    margin: 20px auto;
    background-color: #ffffff;
  }
}

.word {
  word-wrap: break-word;
  word-break: break-all;
}
</style>
