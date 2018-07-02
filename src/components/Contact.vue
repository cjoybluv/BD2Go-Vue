<template>
  <div class="viewer-content">
    <div class="tools float-right">
      <font-awesome-icon icon="pencil-alt" v-b-modal.editContactForm class="pointer"/>
    </div>
    <h4>{{ selectedContact.name }}</h4>
    <h5>{{ selectedContact.email }}</h5>
    <h5>{{ language.phones }} </h5>
    <b-table
      :items="selectedContact.phones"
      :thead-class="'hidden'"
      :fields="phoneTableFields">
    </b-table>
    <b-table :items="selectedContact.locations"></b-table>
    <b-table :items="selectedContact.relationships"></b-table>
    <b-table :items="selectedContact.social"></b-table>
    <b-modal
      id="editContactForm"
      size="lg"
      hide-footer
      ref="editContactForm"
      title="Edit Contact">
      <contact-form :contact="selectedContact" :onSubmit="contactUpdated" />
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'Vuex'
import contactForm from './ContactForm.vue'

export default {
  name: 'contact',
  components: {
    'contact-form': contactForm
  },
  computed: {
    language () {
      return this.$store.state.language.contact
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
      ]
    }
  },
  methods: {
    contactUpdated (contact) {
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
