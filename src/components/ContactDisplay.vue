<template>
  <div id="contact-display">
    <h2>{{ language.title }}</h2>
    <ul>
      <li
        v-for="contact in contacts"
        :key="contact.name"
        @click="viewContact(contact.id)">
        {{ contact.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'Vuex'

export default {
  name: 'ContactDislay',
  computed: {
    contacts () {
      return this.$store.state.contacts
    },
    language () {
      return this.$store.state.language.contactDisplay
    }
  },
  methods: {
    ...mapActions([
      'viewContact'
    ])
  }
}
</script>

<style scoped>
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
