<template>
  <v-container grid-list-md>
    <v-card-title>
      <h5>{{$t('set-role')}}：{{$t(role.title)}}</h5>
    </v-card-title>
    <v-divider></v-divider>
    <v-layout row wrap>
      <v-flex xs12 v-for="(nav,index) in navArray" :key="index">
        <v-layout align-center warp>
          <v-chip
            class="ma-2"
            filter
            filter-icon="done"
            active-class="primary--text"
            :label="nav.type==='dom'"
            :input-value="nav.check"
            @click="navClick(nav)"
          >{{ $t(nav.displayName) }}</v-chip>
          <div style="width:30px;"></div>
          <v-chip-group mandatory v-model="nav.operationType" v-if="nav.type==='dom'">
            <v-chip
              filter
              outlined
              filter-icon="done"
              active-class="primary--text"
              v-for="(btn,pos) in btnList"
              :key="pos"
              :disabled="!nav.check"
              :value="btn.value"
              @click="childClick(nav,btn.value)"
            >{{ btn.title }}</v-chip>
          </v-chip-group>
        </v-layout>
        <!-- <v-chip
          filter
          filter-icon="done"
          active-class="primary--text"
          :input-value="nav.check"
          :key="index"
          @click="navClick(nav)"
        >{{ $t(nav.displayName) }}</v-chip>
        <v-chip-group mandatory v-model="nav.operationType" v-if="nav.type==='dom'">
          <v-chip
            filter
            outlined
            filter-icon="done"
            active-class="primary--text"
            v-for="(btn,pos) in btnList"
            :key="pos"
            :disabled="!nav.check"
            :value="btn.value"
            @click="childClick(nav,btn.value)"
          >{{ btn.title }}</v-chip>
        </v-chip-group>-->
      </v-flex>
    </v-layout>

    <v-divider></v-divider>
    <v-card-title v-if="childArray.title">
      <h6>{{$t(childArray.title.displayName)}}</h6>
    </v-card-title>
    <v-layout row wrap v-if="childArray.title">
      <v-flex xs12 v-for="edit in childArray.editArray" :key="edit.id">
        <v-layout align-center warp>
          <v-chip
            filter
            filter-icon="done"
            active-class="primary--text"
            :label="edit.type==='dom'"
            :input-value="edit.check"
            @click="childClick(edit)"
          >{{ $t(edit.displayName) }}</v-chip>
          <div style="width:30px;"></div>
          <v-chip-group mandatory v-model="edit.operationType" v-if="edit.type==='dom'">
            <v-chip
              filter
              outlined
              filter-icon="done"
              active-class="primary--text"
              v-for="(btn,pos) in btnList"
              :key="pos"
              :disabled="!edit.check"
              :value="btn.value"
              @click="childClick(edit,btn.value)"
            >{{ btn.title }}</v-chip>
          </v-chip-group>
          <v-btn small icon color="indigo" v-if="edit.type==='router'" @click="childMenu(edit)">
            <v-icon>settings</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-divider></v-divider>
  </v-container>
</template>
<script>
import viewBase from '../../base/view-base';
import _ from 'lodash';
export default {
  extends: viewBase,
  data: () => ({
    navArray: [],
    roleId: undefined,
    childArray: {
      title: {},
      editArray: []
    },
    btnList: [{ value: 1, title: 'enable', check: false },
      { value: 2, title: 'readonly', check: false },
      { value: 3, title: 'hide', check: false }],
    role: {}
  }),
  created() {
    this.role = this.$route.query ? this.$route.query : this.role;
    this.pageInit(this.role.child);
  },
  methods: {
    pageInit(child) {
      this.$axios.get('/sys-router-operation/dom-list', {
        params: { roleId: this.role.id, pid: child }
      }).then(result => {
        this.navArray = result;
        !child && this.navClick(_.head(_.filter(result, 'check')));
      });
    },
    navClick(nav) {
      if (nav && nav.type === 'dom') {
        this.childClick(nav);
        return;
      }
      if (nav && (!nav.check || this.childArray.title.displayName === nav.displayName)) {
        // 点选变更操作
        this.$axios.post('/sys-role/create-role-operation', {
          roleId: this.role.id,
          id: nav.id,
          type: nav.type
        }).then(result => {
          if (nav.check) {
            nav.check = !nav.check;
            this.childArray.title = '';
          } else {
            // 之前未选中，刚选中
            nav.check = true;
            this.dataList(nav);
          }
        });
      } else {
        this.dataList(nav);
      }
    },
    dataList(nav) {
      // 展示子菜单
      this.childArray.title = nav;
      this.childArray.editArray = [];
      if (nav && nav.check) {
        this.$axios.get('/sys-router-operation/dom-list', {
          params: {
            roleId: this.role.id,
            pid: nav.id
          }
        }).then(result => {
          this.childArray.editArray = result;
        });
      }
    },
    childClick(item, btn) {
      let type;
      if (btn) {
        type = btn;
      } else {
        type = item.check ? undefined : 1;
      }
      this.$axios.post('/sys-role/create-role-operation', {
        roleId: this.role.id,
        id: item.id,
        type: item.type,
        operationType: type
      }).then(result => {
        if (!btn) {
          item.check = !item.check;
          item.operationType = 1;
        }
      });
    },
    childMenu(item) {
      this.$router.push({ name: 'role-set', query: { title: item.displayName, id: this.role.id, child: item.id } });
    }
  },
  watch: {
    '$route'(to, from) {
      if (to.name === 'role-set') {
        this.role.title = to.query.title;
        this.navArray = [];
        this.childArray = { title: {}, editArray: [] };
        this.pageInit(to.query.child);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
