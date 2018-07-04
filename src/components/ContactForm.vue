<template>
  <b-form>
      <b-form-group
        :label="language.nameLabel">
        <b-form-input
          v-model="formContact.name"
          :placeholder="language.namePlaceholder"
          :autofocus="true"
          required/>
      </b-form-group>
      <b-form-group
        :label="language.emailLabel">
        <b-form-input v-model="formContact.email" :placeholder="language.emailPlaceholder"/>
      </b-form-group>

      <b-form-group :label="language.addPhoneLabel">
        <b-input-group>
          <b-form-input v-model="phoneForm.phoneLabel" slot="prepend" :placeholder="language.phoneLabelPlaceholder" size="sm"/>
          <b-form-input v-model="phoneForm.phoneNumber" :placeholder="language.phoneNumberPlaceholder" size="sm"/>
          <b-btn @click="addPhone" slot="append" variant="info">{{language.add}}</b-btn>
        </b-input-group>
        <b-table striped hover :items="formContact.phones"></b-table>
      </b-form-group>

      <b-form-group :label="language.addRelationshipLabel">
        <b-input-group>
          <b-form-input v-model="relationshipForm.relationshipLabel" slot="prepend" :placeholder="language.relationshipLabelPlaceholder" size="sm"/>
          <b-form-input v-model="relationshipForm.relationshipContact" :placeholder="language.relationshipContactPlaceholder" size="sm"/>
          <b-btn @click="addRelationship" slot="append" variant="info">{{language.add}}</b-btn>
        </b-input-group>
        <b-table striped hover :items="formContact.relationships"></b-table>
      </b-form-group>

      <b-btn class="float-right" variant="primary" @click="submitForm">{{language.submit}}</b-btn>
  </b-form>
</template>

<script>
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
    }
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
        relationshipLabel: '',
        relationshipContact: ''
      }
    }
  },
  props: {
    contact: {
      type: Object,
      required: true
    },
    onSubmit: {
      type: Function,
      required: true
    }
  },
  methods: {
    addPhone () {
      if (!this.phoneForm.phoneLabel || !this.phoneForm.phoneNumber) return
      const phone = { ...this.phoneForm }
      this.formContact.phones.push(phone)
      this.phoneForm.phoneLabel = ''
      this.phoneForm.phoneNumber = ''
    },
    addRelationship () {
      if (!this.relationshipForm.relationshipLabel || !this.relationshipForm.relationshipContact) return
      const relationship = { ...this.relationshipForm }
      let relatedContact
      if (relationship.relationshipContact === '@me') {
        relatedContact = { _id: '@me' }
      } else {
        relatedContact = this.contacts.find(contact => {
          contact.name.includes(relationship.relationshipContact)
        })
      }
      if (relatedContact) {
        this.formContact.relationships.push(
          {
            relationshipLabel: relationship.relationshipLabel,
            relatedContactId: relatedContact._id
          }
        )
        this.relationshipForm.relationshipLabel = ''
        this.relationshipForm.relationshipContact = ''
      }
    },
    clearForm () {
      this.formContact = {
        ownerId: '',
        name: '',
        email: '',
        phones: []
      }
      this.phoneForm = {
        phoneLabel: '',
        phoneNumber: ''
      }
      this.relationshipForm = {
        relationshipLabel: '',
        relationshipContact: ''
      }
    },
    submitForm () {
      if (!this.formContact.name) return
      this.formContact.ownerId = this.user._id
      this.onSubmit(this.formContact)
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
