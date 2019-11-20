/*
 * @Author: 吴占超
 * @Date: 2019-04-29 11:38:33
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-08-02 10:17:10
 * 导航守卫
 */
'use strict';

import router from '../plugins/router';
import store from '../plugins/store';
import * as _ from 'lodash';

router.beforeEach((to, from, next) => {
  if (store.getters['auth/user'] && store.getters['auth/user'].userName === 'admin') {
    return next();
  }
  if (['/login'].includes(to.path) ||
    (to.path === '/home' && store.getters['auth/user'])) {
    return next();
  }
  if (!store.getters['auth/user']) {
    return router.replace('/login');
  }
  const userRouter = store.getters['auth/user'];
  const ritem = _.chain(userRouter.router).find(p => to.path === p.path).value();
  if (ritem) {
    return next();
  }
});
