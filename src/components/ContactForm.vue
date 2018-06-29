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

    <b-btn block v-b-toggle.phones variant="outline-success">Phones</b-btn>
    <b-collapse id="phones" class="mt-2">
      <b-card>
        <b-form-group
          label="Phone#">
          <b-form-input v-model="contact.phones.phoneNumber" placeholder="Enter a phone#"/>
        </b-form-group>
        <b-form-group
          label="Tag">
          <b-form-input v-model="contact.phones.phoneTag" placeholder="Enter the phone's Tag"/>
        </b-form-group>
      </b-card>
    </b-collapse>

    <b-btn class="float-right" @click="submitForm">Submit</b-btn>
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
        phones: [
          {
            phoneNumber: '',
            phoneTag: ''
          }
        ]
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
button {
  margin-top: 10px;
}
</style>