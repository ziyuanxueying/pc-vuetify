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
                    :label="$t('versionTitle')"
                    v-model="version.title"
                    :rules="$rules({dis:'versionTitle'})"
                    data-cy="title"
                  ></v-text-field>
                </v-flex>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-text-field
                    :label="$t('versionNumber')"
                    v-model="version.versionNumber"
                    :rules="$rules({dis:'versionNumber'})"
                    data-cy="versionNumber"
                  ></v-text-field>
                </v-flex>
                <v-flex xl12 lg12 md12 sm6 xs12>
                  <v-textarea
                    :label="$t('versionContent')"
                    v-model="version.content"
                    :rules="$rules({dis:'versionContent'})"
                    data-cy="content"
                  ></v-textarea>
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
    version: {
      title: undefined,
      content: undefined,
      versionNumber: undefined
    }
  }),
  created() {
    this.version = this.$route.params ? this.$route.params : this.version;
  },
  methods: {
    create() {
      if (!this.$refs.form.validate()) {
        return;
      }
      if (this.version && this.version.id) {
        this.$axios.post(`/sys-version/update`, this.version)
          .then(result => {
            result
              ? this.$router.push({ name: 'version' })
              : this.$toast.fail(`${this.$t('error')}!`);
          }).catch((err) => {
            this.$toast.fail(`${this.$t('error')}!${err}`);
          });
      } else {
        this.$axios.post(`/sys-version/create`, this.version)
          .then(result => {
            result
              ? this.$router.push({ name: 'version' })
              : this.$toast.fail(`${this.$t('error')}!`);
          }).catch((err) => {
            this.$toast.fail(`${this.$t('error')}!${err}`);
          });
      }
    },
    cancel() {
      this.$router.push({ name: 'version' });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
