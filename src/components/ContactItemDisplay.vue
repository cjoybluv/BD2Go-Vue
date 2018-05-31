<template>
  <div id="contact-item-display">
    <h2>When & What</h2>
    <ul>
      <li v-for="item in sortedItems"
        :key="JSON.stringify(item)"
        @click="viewItem(item.id)">
        <h4>
          <span class="soft-text">{{ item.type | allCaps }}</span>
          &nbsp;
          <span>{{ item.dateTime | moment("MM-DD-YYYY HH:mm") }}</span>
        </h4>
        <h5>{{ item.contactName }}</h5>
        <p>{{ item.subject }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'Vuex'

export default {
  name: 'ContactItemDisplay',
  computed: {
    sortedItems () {
      return this.contactItems.slice().sort((a, b) => {
        return a.dateTime >= b.dateTime
      })
    },
    ...mapGetters([
      'contactItems'
    ])
  },
  methods: {
    ...mapActions([
      'viewItem'
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
