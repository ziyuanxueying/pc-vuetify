<template>
  <v-form ref="form" v-model="valid">
    <v-container grid-list-md text-xs-center>
      <v-layout>
        <v-flex xs12 sm6>
          <v-card>
            <v-card-title>
              <v-layout row wrap>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-text-field
                    :label="$t('noticeTitle')"
                    v-model="notice.title"
                    :rules="$rules({dis:'noticeTitle'})"
                    data-cy="title"
                  ></v-text-field>
                </v-flex>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-textarea
                    :label="$t('noticeContent')"
                    v-model="notice.content"
                    :rules="$rules({dis:'noticeContent'})"
                    data-cy="content"
                  ></v-textarea>
                </v-flex>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-select
                    v-model="notice.roleIds"
                    :items="roles"
                    :label="$t('selectRole')"
                    multiple
                    chips
                    :hint="$t('selectRoleDes')"
                    clearable
                    open-on-clear
                    persistent-hint
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-actions>
              <v-layout row wrap>
                <v-btn
                  text
                  color="#1976d2"
                  @click="create()"
                  v-show="domType.confirm"
                  :disabled="domType._confirm"
                  data-cy="confirm"
                >
                  <v-icon>save</v-icon>
                  {{$t('confirm')}}
                </v-btn>
                <v-btn text color="#1976d2" @click="cancel()" data-cy="cancel">
                  <v-icon>keyboard_backspace</v-icon>
                  {{$t('cancel')}}
                </v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import viewBase from '../../base/view-base';
export default {
  extends: viewBase,
  data: () => ({
    valid: true,
    roles: [],
    notice: {
      title: undefined,
      content: undefined,
      roleIds: []
    }
  }),
  created() {
    this.init();
    this.notice = this.$route.params ? this.$route.params : this.notice;
  },
  methods: {
    init() {
      this.$axios.get(`/sys-role/find-list`, {
        params: {
          offset: 0,
          limit: 1000
        }
      }).then(result => {
        this.roles = result.rows.map(item => {
          return {
            text: item.roleName,
            value: item.id
          };
        });
      });
    },
    create() {
      if (!this.$refs.form.validate()) {
        return;
      }
      if (this.notice && this.notice.id) {
        this.$axios.post(`/notice/update`, this.notice)
          .then(result => {
            result
              ? this.$router.push({ name: 'notice' })
              : this.$toast.fail(`${this.$t('error')}!`);
          }).catch((err) => {
            this.$toast.fail(`${this.$t('error')}!${err}`);
          });
      } else {
        this.$axios.post(`/notice/create`, this.notice)
          .then(result => {
            result
              ? this.$router.push({ name: 'notice' })
              : this.$toast.fail(`${this.$t('error')}!`);
          }).catch((err) => {
            this.$toast.fail(`${this.$t('error')}!${err}`);
          });
      }
    },
    cancel() {
      this.$router.push({ name: 'notice' });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
