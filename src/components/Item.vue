<template>
  <div class = "viewer-content">
    <h4>
      <span class="soft-text">{{ selectedItem.type | allCaps }}</span>
      &nbsp;
      <span>{{ selectedItem.dateTime | moment("MM-DD-YYYY HH:mm") }}</span>
    </h4>
    <h4>{{ selectedItem.contactName }} </h4>
    <h5>{{ selectedItem.subject }}</h5>
    <p class="content-100">{{ selectedItem.content }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'Vuex'

export default {
  name: 'Item',
  computed: {
    ...mapGetters([
      'selectedItem'
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
