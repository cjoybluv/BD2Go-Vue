<template>
  <div class = "viewer-content">
    <h4>
      <span class="soft-text">{{ selectedContactItem.type | allCaps }}</span>
      &nbsp;
      <span>{{ selectedContactItem.dateTime | moment("MM-DD-YYYY") }}</span>
    </h4>
    <h4>{{ selectedContactItem.contactName }} </h4>
    <h5>{{ selectedContactItem.subject }}</h5>
    <p class="content-100">{{ selectedContactItem.content }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'Vuex'

export default {
  name: 'contactItem',
  computed: {
    ...mapGetters([
      'selectedContactItem'
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
