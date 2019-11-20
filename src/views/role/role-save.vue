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
                    :label="$t('roleCode')"
                    v-model="role.code"
                    :rules="$rules({dis:'roleCode'})"
                  ></v-text-field>
                </v-flex>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-text-field
                    :label="$t('roleName')"
                    v-model="role.roleName"
                    :rules="$rules({dis:'roleName'})"
                  ></v-text-field>
                </v-flex>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-text-field :label="$t('remark')" v-model="role.remark"></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-actions>
              <v-layout row wrap>
                <v-btn
                  text
                  color="#1976d2"
                  @click="create()"
                  v-show="domType.add"
                  :disabled="domType._add"
                  data-cy="add"
                >
                  <v-icon>save</v-icon>
                  {{$t('confirm')}}
                </v-btn>
                <v-btn text color="#1976d2" @click="cancel()">
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
    role: {
      roleCode: undefined,
      roleName: undefined,
      remark: undefined
    }
  }),
  created() {
    this.$route.query.id && this.pageInit(this.$route.query.id);
  },
  methods: {
    pageInit(id) {
      this.$axios.get(`/sys-role/${id}`).then(result => {
        this.role = result;
      });
    },
    create() {
      if (!this.$refs.form.validate()) {
        return;
      }
      if (this.role && this.role.id) {
        this.$axios.post(`/sys-role/update-role`, this.role)
          .then(result => {
            result
              ? this.$router.push({ name: 'role' })
              : this.$toast.fail(`${this.$t('error')}!`);
          }).catch((err) => {
            this.$toast.fail(`${this.$t('error')}!${err}`);
          });
      } else {
        this.$axios.post(`/sys-role/create-role`, this.role)
          .then(result => {
            result
              ? this.$router.push({ name: 'role' })
              : this.$toast.fail(`${this.$t('error')}!`);
          }).catch((err) => {
            this.$toast.fail(`${this.$t('error')}!${err}`);
          });
      }
    },
    cancel() {
      this.$router.push({ name: 'role' });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
