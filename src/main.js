import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './plugins/router';
import store from './plugins/store';
import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n';
import './plugins/vant.js';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './routers/guards';
import './plugins/rules';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app');
