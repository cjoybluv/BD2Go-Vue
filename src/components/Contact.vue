<template>
  <div class="viewer-content">
    <div class="tools float-right">
      <font-awesome-icon icon="pencil-alt" @click="openContactForm" class="pointer"/>
    </div>
    <h4>{{ selectedContact.name }}</h4>
    <h5>{{ selectedContact.email }}</h5>
    <h5>{{ language.phones }} </h5>
    <b-table
      :items="selectedContact.phones"
      :fields="phoneTableFields">
    </b-table>
    <b-table :items="selectedContact.locations"></b-table>
    <b-table
      :items="selectedContact.relationships"
      :fields="relationshipTableFields">
    </b-table>
    <b-table :items="selectedContact.social"></b-table>
    <b-modal
      id="editContactForm"
      size="lg"
      hide-footer
      ref="editContactForm"
      title="Edit Contact">
      <contact-form :onSubmit="contactUpdated" />
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'Vuex'
import contactForm from './ContactForm.vue'
import {
  EDIT_CONTACT_REQUEST,
  EDIT_CONTACT_COMPLETE
} from '../store/mutation-types'

export default {
  name: 'contact',
  components: {
    'contact-form': contactForm
  },
  computed: {
    language () {
      return this.$store.state.language.contact
    },
    contacts () {
      return this.$store.state.contacts
    },
    ...mapGetters([
      'selectedContact'
    ])
  },
  data () {
    return {
      phoneTableFields: [
        {
          key: 'phoneLabel',
          label: 'Label'
        },
        {
          key: 'phoneNumber',
          label: 'Number'
        }
      ],
      relationshipTableFields: [
        { key: 'targetContactId', label: 'Contact' },
        { key: 'targetLabel', label: 'is' },
        { key: 'hostLabel', label: 'to this' }
      ]
    }
  },
  methods: {
    openContactForm () {
      this.$store.commit(EDIT_CONTACT_REQUEST, this.selectedContact)
      this.$refs.editContactForm.show()
    },
    contactUpdated (contact) {
      this.$store.commit(EDIT_CONTACT_COMPLETE)
      this.updateContact(contact)
      this.$refs.editContactForm.hide()
    },
    ...mapActions([
      'updateContact'
    ])
  }
}
</script>

<style>
.viewer-content {
  margin: 5px;
  padding: 5px;
  background: white;
}
.hidden {
  display: none;
}
.tools {
  margin: 10px;
}
</style>
