<template>
  <b-form>
      <b-form-group
        label="Name">
        <b-form-input
          v-model="contact.name"
          placeholder="Enter the contact's name"
          :autofocus="true"
          required/>
      </b-form-group>
      <b-form-group
        label="Email">
        <b-form-input v-model="contact.email" placeholder="Enter the contact's email"/>
      </b-form-group>

      <b-form-group label="Add new Phone Number">
        <b-input-group>
          <b-form-input v-model="phoneForm.phoneLabel" slot="prepend" placeholder="Enter label (eg. mobile)" size="sm"/>
          <b-form-input v-model="phoneForm.phoneNumber" placeholder="Enter a phone#" size="sm"/>
          <b-btn @click="addPhone" slot="append" variant="info">Add</b-btn>
        </b-input-group>
        <b-table striped hover :items="contact.phones"></b-table>
      </b-form-group>

      <b-btn class="float-right" variant="primary" @click="submitForm">Submit</b-btn>
  </b-form>
</template>

<script>
import { mapActions } from 'Vuex'

export default {
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  data () {
    return {
      contact: {
        ownerId: '',
        name: '',
        email: '',
        phones: []
      },
      phoneForm: {
        phoneLabel: '',
        phoneNumber: ''
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
    addPhone () {
      if (!this.phoneForm.phoneLabel || !this.phoneForm.phoneNumber) return
      const phone = { ...this.phoneForm }
      this.contact.phones.push(phone)
      this.phoneForm.phoneLabel = ''
      this.phoneForm.phoneNumber = ''
    },
    submitForm () {
      this.contact.ownerId = this.user._id
      console.log('submitForm', this.contact)
      this.addContact(this.contact)
      this.onSubmit(this.contact.name + ' added to your contact list')
    },
    ...mapActions([
      'addContact'
    ])
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
