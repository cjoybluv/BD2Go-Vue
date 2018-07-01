<template>
  <b-form>
      <b-form-group
        :label="language.nameLabel">
        <b-form-input
          v-model="contact.name"
          :placeholder="language.namePlaceholder"
          :autofocus="true"
          required/>
      </b-form-group>
      <b-form-group
        :label="language.emailLabel">
        <b-form-input v-model="contact.email" :placeholder="language.emailPlaceholder"/>
      </b-form-group>

      <b-form-group :label="language.addPhoneLabel">
        <b-input-group>
          <b-form-input v-model="phoneForm.phoneLabel" slot="prepend" :placeholder="language.phoneLabelPlaceholder" size="sm"/>
          <b-form-input v-model="phoneForm.phoneNumber" :placeholder="language.phoneNumberPlaceholder" size="sm"/>
          <b-btn @click="addPhone" slot="append" variant="info">{{language.add}}</b-btn>
        </b-input-group>
        <b-table striped hover :items="contact.phones"></b-table>
      </b-form-group>

      <b-btn class="float-right" variant="primary" @click="submitForm">{{language.submit}}</b-btn>
  </b-form>
</template>

<script>
import { mapActions } from 'Vuex'

export default {
  computed: {
    user () {
      return this.$store.state.user
    },
    language () {
      return this.$store.state.language.contactForm
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
    clearForm () {
      this.contact = {
        ownerId: '',
        name: '',
        email: '',
        phones: []
      }
      this.phoneForm = {
        phoneLabel: '',
        phoneNumber: ''
      }
    },
    submitForm () {
      if (!this.contact.name) return
      this.contact.ownerId = this.user._id
      console.log('submitForm', this.contact)
      this.addContact(this.contact)
      this.onSubmit(this.contact.name + ' added to your contact list')
      this.clearForm()
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
