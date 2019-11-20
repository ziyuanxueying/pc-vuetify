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
                    :label="$t('apiOperation.api')"
                    v-model="api.api"
                    :rules="$rules({dis:'apiOperation.api'})"
                  ></v-text-field>
                </v-flex>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-text-field
                    :label="$t('apiOperation.router')"
                    v-model="api.router"
                    :rules="$rules({dis:'apiOperation.router'})"
                  ></v-text-field>
                </v-flex>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-text-field
                    :label="$t('apiOperation.controller')"
                    v-model="api.controller"
                    :rules="$rules({dis:'apiOperation.controller'})"
                  ></v-text-field>
                </v-flex>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-text-field
                    :label="$t('apiOperation.action')"
                    v-model="api.action"
                    :rules="$rules({dis:'apiOperation.action'})"
                  ></v-text-field>
                </v-flex>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-text-field :label="$t('apiOperation.path')" v-model="api.path"></v-text-field>
                </v-flex>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-text-field
                    :label="$t('apiOperation.name')"
                    v-model="api.name"
                    :rules="$rules({dis:'apiOperation.name'})"
                  ></v-text-field>
                </v-flex>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-text-field
                    :label="$t('apiOperation.method')"
                    v-model="api.method"
                    :rules="$rules({dis:'apiOperation.method'})"
                  ></v-text-field>
                </v-flex>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-text-field :label="$t('remark')" v-model="api.remark"></v-text-field>
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
                  :disabled="domType._confirme"
                  data-cy="confirm"
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
    api: {}
  }),
  created() {
    this.$route.query.id && this.pageInit(this.$route.query.id);
  },
  methods: {
    pageInit(id) {
      this.$axios.get(`/sys-api-operation/${id}`).then(result => {
        this.api = result;
      });
    },
    create() {
      if (!this.$refs.form.validate()) {
        return;
      }
      if (this.api && this.api.id) {
        this.$axios.post(`/sys-api-operation/update`, this.api)
          .then(result => {
            // result
            //   ? this.$toast.success(this.$t('success'))
            //   : this.$toast.fail(`${this.$t('error')}!`);
            result
              ? this.$router.push({ name: 'api' })
              : this.$toast.fail(`${this.$t('error')}!`);
          }).catch((err) => {
            this.$toast.fail(`${this.$t('error')}!${err}`);
          });
      } else {
        this.$axios.post(`/sys-api-operation/create`, this.api)
          .then(result => {
            result
              ? this.$router.push({ name: 'api' })
              : this.$toast.fail(`${this.$t('error')}!`);
          }).catch((err) => {
            this.$toast.fail(`${this.$t('error')}!${err}`);
          });
      }
    },
    cancel() {
      this.$router.push({ name: 'api' });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
