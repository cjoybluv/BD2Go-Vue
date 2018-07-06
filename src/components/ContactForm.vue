<template>
  <b-form v-if="selectedContact">
      <b-form-group
        :label="language.nameLabel">
        <b-form-input
          v-model="selectedContact.name"
          :placeholder="language.namePlaceholder"
          :autofocus="true"
          required/>
      </b-form-group>
      <b-form-group
        :label="language.emailLabel">
        <b-form-input v-model="selectedContact.email" :placeholder="language.emailPlaceholder"/>
      </b-form-group>

      <b-form-group :label="language.addPhoneLabel">
        <b-input-group>
          <b-form-input v-model="phoneForm.phoneLabel" slot="prepend" :placeholder="language.phoneLabelPlaceholder" size="sm"/>
          <b-form-input v-model="phoneForm.phoneNumber" :placeholder="language.phoneNumberPlaceholder" size="sm"/>
          <b-btn @click="addPhone" slot="append" variant="info">{{language.add}}</b-btn>
        </b-input-group>
        <b-table striped hover :items="selectedContact.phones"></b-table>
      </b-form-group>

      <b-form-group :label="language.addRelationshipLabel">
        <b-input-group>
          <b-form-input v-model="relationshipForm.hostLabel" :placeholder="language.hostLabelPlaceholder" size="sm"/>
          <b-form-input v-model="relationshipForm.targetContact" :placeholder="language.targetContactPlaceholder" size="sm"/>
          <b-form-input v-model="relationshipForm.targetLabel" :placeholder="language.targetLabelPlaceholder" size="sm"/>
          <b-btn @click="addRelationship" variant="info">{{language.add}}</b-btn>
        </b-input-group>
        <b-table striped hover :items="selectedContact.relationships"></b-table>
      </b-form-group>

      <b-btn class="float-right" variant="primary" @click="submitForm">{{language.submit}}</b-btn>
  </b-form>
</template>

<script>
import { mapGetters } from 'Vuex'

export default {
  computed: {
    contacts () {
      return this.$store.state.contacts
    },
    user () {
      return this.$store.state.user
    },
    language () {
      return this.$store.state.language.contactForm
    },
    me () {
      return this.$store.state.me
    },
    ...mapGetters([
      'selectedContact'
    ])
  },
  data () {
    return {
      formContact: {
        name: '',
        email: '',
        phones: [],
        relationships: [],
        ...this.contact
      },
      phoneForm: {
        phoneLabel: '',
        phoneNumber: ''
      },
      relationshipForm: {
        hostLabel: '',
        targetContact: '',
        targetLabel: ''
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
      this.selectedContact.phones.push(phone)
      this.phoneForm.phoneLabel = ''
      this.phoneForm.phoneNumber = ''
    },
    addRelationship () {
      if (!this.relationshipForm.hostLabel || !this.relationshipForm.targetContact) return
      const relationship = { ...this.relationshipForm }
      let relatedContact
      if (relationship.targetContact === '@me') {
        relatedContact = this.me
      } else {
        relatedContact = this.contacts.find(contact => {
          return contact.name.includes(relationship.targetContact)
        })
      }
      if (relatedContact) {
        this.selectedContact.relationships.push(
          {
            hostLabel: relationship.hostLabel,
            targetContactId: relatedContact._id,
            targetLabel: relationship.targetLabel
          }
        )
        this.relationshipForm.hostLabel = ''
        this.relationshipForm.targetContact = ''
        this.relationshipForm.targetLabel = ''
      }
    },
    clearForm () {
      this.phoneForm = {
        phoneLabel: '',
        phoneNumber: ''
      }
      this.relationshipForm = {
        hostLabel: '',
        targetContact: null,
        targetLabel: ''
      }
    },
    submitForm () {
      if (!this.selectedContact.name) return
      this.selectedContact.ownerId = this.user._id
      this.onSubmit(this.selectedContact)
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
