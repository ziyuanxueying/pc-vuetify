import Vue from 'vue';
import _ from 'lodash';

const viewBase = Vue.extend({
  data: () => ({
    domType: {}
  }),
  created() {
    this.loadDomJur();
  },
  methods: {
    loadDomJur() {
      const routerItem = _.chain(this.$store.getters['auth/user'].router).find(p => p.displayName === this.$router.currentRoute.name).value();
      const user = this.$store.getters['auth/user'];
      const username = _.get(user, 'userName');
      console.log(username);
      routerItem &&
        this.$axios.get('/sys-dom-operation/dom-jur?routerId=' + _.get(routerItem, 'id')).then((result) => {
          _.chain(result).map(p => {
            // 1.enable 2.readonly 3.hide
            this.$set(this.domType, p.domId, username === 'admin' || p.operationType !== 3);
            this.$set(this.domType, `_${p.domId}`, !(p.operationType === 1 || username === 'admin'));
          }).value();
        });
    }
  }
});
export default viewBase;
