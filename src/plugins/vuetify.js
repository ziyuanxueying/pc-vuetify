import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import zhHans from 'vuetify/es5/locale/zh-Hans';
import i18n from './i18n';

Vue.use(Vuetify);

export default new Vuetify({
  // lang: {
  //   locales: { zhHans },
  //   current: 'zh-Hans'
  // },
  icons: {
    iconfont: 'fa'
  },
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  }
});
