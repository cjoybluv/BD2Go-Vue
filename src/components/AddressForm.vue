<template>
  <b-form v-if="editLocation" id="contact-form">

    <b-input-group>
      <b-form-input
        v-model="editLocation.street"
        :placeholder="language.streetPlaceholder"
        required/>
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

    <b-btn class="float-right" variant="primary" @click="submitForm">{{language.submit}}</b-btn>
  </b-form>
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
    onSubmit: {
      type: Function,
      required: true
    }
  },
  methods: {
    clearForm () {
      console.log('clearForm')
    },
    submitForm () {
      if (!this.editLocation.street) return
      this.editLocation.ownerId = this.user._id
      console.log('submitForm', this.editLocation)
      this.onSubmit(this.editLocation)
      this.clearForm()
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
