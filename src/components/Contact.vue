<template>
  <div class = "viewer-content">
    <h4>{{ selectedContact.name }}</h4>
    <h5>{{ selectedContact.contact }}</h5>
    <p>{{ selectedContact.street }}</p>
    <p>{{ selectedContact.city }}, {{ selectedContact.st }} {{ selectedContact.zip }}</p>
    <p>{{ selectedContact.phone }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'Vuex'

export default {
  name: 'contact',
  computed: {
    ...mapGetters([
      'selectedContact'
    ])
  }
}
</script>

<style scoped>
.viewer-content {
  margin: 5px;
  background: white;
}
</style>
