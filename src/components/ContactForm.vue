<template>
  <b-form>
    <b-form-group
      label="Name">
      <b-form-input v-model="contact.name" placeholder="Enter the contact's name" :autofocus="true" />
    </b-form-group>
    <b-form-group
      label="Email">
      <b-form-input v-model="contact.email" placeholder="Enter the contact's email"/>
    </b-form-group>
    <b-btn @click="submitForm">Submit</b-btn>
  </b-form>
</template>

<script>
export default {
  data () {
    return {
      contact: {
        name: '',
        email: ''
      }
    }
  },
  props: {
    onSubmit: {
      type: Function,
      required: true
    }
  },
  methods: {
    submitForm () {
      console.log('submitForm', this)
      this.onSubmit(this.contact.name + ' added to your contact list')
    }
  }
}
</script>

<style>
form {
  margin: 0 10px;
}
</style>