<template>
  <div v-if="editLocation">
    <b-form-input
      v-model="editLocation.name"
      :placeholder="language.namePlaceholder"
      :autofocus="true"
      required/>
    <b-form-input
      v-model="editLocation.street"
      :placeholder="language.streetPlaceholder"
      required/>
    <b-input-group>
      <b-form-input
        v-model="editLocation.city"
        :placeholder="language.cityPlaceholder"
        required/>
      <b-form-input
        v-model="editLocation.st"
        :placeholder="language.stPlaceholder"
        required/>
      <b-form-input
        v-model="editLocation.zip"
        :placeholder="language.zipPlaceholder"
        required/>
     </b-input-group>
    <b-form-input
      v-if="includeLabel"
      v-model="editLocation.label"
      :placeholder="language.labelPlaceholder"
      required/>

    <b-btn class="float-right" variant="primary" @click="submitForm">{{language.add}}</b-btn>
  </div>
</template>

<script>
export default {
  computed: {
    contacts () {
      return this.$store.state.locations
    },
    user () {
      return this.$store.state.user
    },
    language () {
      return this.$store.state.language.locationForm
    },
    editLocation () {
      return this.$store.state.contentControls.editLocation
    }
  },
  data () {
    return {

    }
  },
  props: {
    includeLabel: Boolean,
    onSubmit: {
      type: Function,
      required: true
    }
  },
  methods: {
    submitForm () {
      if (!this.editLocation.street) return

      console.log('submitForm', this.editLocation)
      this.onSubmit(this.editLocation)
    }
  }
}
</script>

<style>
form {
  margin: 0 10px;
}
legend {
  padding-bottom: 0;
}
input {
  height: 38px;
  align-self: flex-end;
}
</style>
