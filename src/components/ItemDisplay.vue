<template>
  <div id="item-display">
    <h2>{{ language.title }}</h2>
    <ul>
      <li v-for="item in sortedItems"
        :key="JSON.stringify(item)"
        @click="viewItem(item._id)">
        <h4>
          <span class="soft-text">{{ item.type | allCaps }}</span>
          &nbsp;
          <span>{{ item.displayDate | moment("MM-DD-YYYY HH:mm") }}</span>
        </h4>
        <h5>{{ item.subject }}</h5>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'Vuex'

export default {
  name: 'ItemDisplay',
  computed: {
    sortedItems () {
      return this.displayItems.slice().sort((a, b) => {
        return a.displayDate >= b.displayDate
      })
    },
    language () {
      return this.$store.state.language.itemDisplay
    },
    ownerId () {
      return this.$store.state.user && this.$store.state.user._id
    },
    ...mapGetters([
      'displayItems'
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
