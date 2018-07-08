<template>
  <div id="contact-display">
    <div class="header">
      <h2>{{ language.title }}</h2>
      <font-awesome-icon icon="plus" @click="openContactForm" class="pointer"/>
    </div>
    <ul>
      <li
        v-for="contact in contacts"
        :key="contact.name"
        @click="viewContact(contact._id)">
        {{ contact.name }}
      </li>
    </ul>
    <b-modal
      id="addContactForm"
      size="lg"
      hide-footer
      ref="addContactForm"
      title="Create New Contact">
      <contact-form :contact="contact" :onSubmit="contactAdded" />
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'Vuex'
import contactForm from './ContactForm.vue'
import {
  NEW_CONTACT_REQUEST
} from '../store/mutation-types'
export default {
  name: 'ContactDislay',
  components: {
    'contact-form': contactForm
  },
  computed: {
    contacts () {
      return this.$store.state.contacts
    },
    language () {
      return this.$store.state.language.contactDisplay
    },
    ownerId () {
      return this.$store.state.user && this.$store.state.user._id
    }
  },
  data () {
    return {
      contact: {
        ownerId: '',
        name: '',
        email: '',
        phones: [],
        relationships: []
      }
    }
  },
  methods: {
    contactAdded (contact) {
      this.addContact(contact)
      this.$refs.addContactForm.hide()
    },
    openContactForm () {
      this.$store.commit(NEW_CONTACT_REQUEST)
      this.$refs.addContactForm.show()
    },
    ...mapActions([
      'viewContact',
      'addContact'
    ])
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.header svg {
  margin-right: 15px;
}
ul {
  margin: 0 5px;
  padding-left: 0;
  min-width: 200px;
}
li {
  background: white;
  text-align: left;
  list-style-type: none;
  margin-bottom: 5px;
  cursor: pointer;
}
</style>
