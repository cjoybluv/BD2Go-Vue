<template>
  <div class = "viewer-content">
    <h4>{{ selectedContact.name }}</h4>
    <h5>{{ selectedContact.email }}</h5>
    <h5>{{ language.phones }} </h5>
    <b-table
      :items="selectedContact.phones"
      :thead-class="'hidden'"
      :fields="phoneTableFields">
    </b-table>
    <b-table striped hover :items="selectedContact.locations"></b-table>
    <b-table striped hover :items="selectedContact.relationships"></b-table>
    <b-table striped hover :items="selectedContact.social"></b-table>
  </div>
</template>

<script>
import { mapGetters } from 'Vuex'

export default {
  name: 'contact',
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
  }
}
</script>

<style>
.viewer-content {
  margin: 5px;
  background: white;
}
.hidden {
  display: none;
}
</style>
