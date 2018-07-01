<template>
  <div id="contact-display">
    <div class="header">
      <h2>{{ language.title }}</h2>
      <font-awesome-icon icon="plus" v-b-modal.contactForm/>
    </div>
    <ul>
      <li
        v-for="contact in contacts"
        :key="contact.name"
        @click="viewContact(contact.id)">
        {{ contact.name }}
      </li>
    </ul>
    <b-modal
      id="contactForm"
      size="lg"
      hide-footer
      ref="contactForm"
      title="Create New Contact">
      <contact-form :onSubmit="contactAdded" />
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'Vuex'
import contactForm from './ContactForm.vue'

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
    }
  },
  methods: {
    contactAdded (message) {
      console.log('contactAdded', message)
      this.$refs.contactForm.hide()
    },
    ...mapActions([
      'viewContact'
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
  cursor: pointer;
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
