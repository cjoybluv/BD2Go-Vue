<template>
  <div class = "viewer-content">
    <h4>
      <span class="soft-text">{{ selectedItem.type | allCaps }}</span>
      <span>{{ selectedItem.dates[0].date | moment("MM-DD-YYYY HH:mm") }}</span>
      <span>{{ selectedItem.status }}</span>
    </h4>
    <h5>{{ selectedItem.subject }}</h5>
    <p class="content-100">{{ selectedItem.body }}</p>
    <b-table
      :items="selectedItem.statusHistory">
    </b-table>
    <b-table
      :items="selectedItem.contacts">
    </b-table>
    <b-table
      :items="selectedItem.locations">
    </b-table>
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
  padding: 5px;
  background: white;
}
h4 {
  display: flex;
  justify-content: space-between;
}
</style>
