/*
 * @Author: 吴占超
 * @Date: 2019-06-03 20:46:49
 * @Last Modified by: 冯杰
 * @Last Modified time: 2019-11-20 15:11:51
 */
'use strict';

import Login from '../pages/Login.vue';

export default [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/role',
    name: 'role',
    component: () => import('../views/role/role-list.vue')
  },
  {
    path: '/role/save',
    name: 'role-save',
    component: () => import('../views/role/role-save.vue')
  },
  {
    path: '/role/role-set',
    name: 'role-set',
    component: () => import('../views/role/role-set.vue')
  },
  {
    path: '/qrcode',
    name: 'qrcode',
    component: () => import('../views/QrCode.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user/user-list.vue')
  },
  {
    path: '/user/save',
    name: 'user-save',
    component: () => import('../views/user/user-save.vue')
  },
  {
    path: '/router',
    name: 'router',
    component: () => import('../views/sys-router-operation/router-list.vue')
  },
  {
    path: '/router/save',
    name: 'router-save',
    component: () => import('../views/sys-router-operation/router-save.vue')
  },
  {
    path: '/router/menu',
    name: 'router-menu',
    component: () => import('../views/sys-router-operation/router-menu.vue')
  },
  {
    path: '/router/btn',
    name: 'router-btn',
    component: () => import('../views/sys-router-operation/router-btn.vue')
  },
  {
    path: '/router/savebtn',
    name: 'router-savebtn',
    component: () => import('../views/sys-router-operation/router-savebtn.vue')
  },
  {
    path: '/api',
    name: 'api',
    component: () => import('../views/sys-api-operation/api-list.vue')
  },
  {
    path: '/api/save',
    name: 'api-save',
    component: () => import('../views/sys-api-operation/api-save.vue')
  },
  {
    path: '/notice',
    name: 'notice',
    component: () => import('../views/notice/notice-list.vue')
  },
  {
    path: '/notice/save',
    name: 'notice-save',
    component: () => import('../views/notice/notice-save.vue')
  },
  {
    path: '/notice/unread',
    name: 'notice-unread',
    component: () => import('../views/notice/notice-unread.vue')
  },
  {
    path: '/notice/details',
    name: 'notice-details',
    component: () => import('../views/notice/notice-details.vue')
  },
  {
    path: '/version',
    name: 'version',
    component: () => import('../views/version/version-list.vue')
  },
  {
    path: '/version/save',
    name: 'version-save',
    component: () => import('../views/version/version-save.vue')
  }
];
