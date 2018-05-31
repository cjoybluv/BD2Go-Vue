<template>
  <div class = "viewer-content">
    <h4>
      <span class="soft-text">{{ selectedContactItem.type | allCaps }}</span>
      &nbsp;
      <span>{{ selectedContactItem.dateTime | moment("MM-DD-YYYY HH:mm") }}</span>
    </h4>
    <h4>{{ selectedContactItem.contactName }} </h4>
    <h5>{{ selectedContactItem.subject }}</h5>
    <p class="content-100">{{ selectedContactItem.content }}</p>
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
