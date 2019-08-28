<template>
  <section id="checklist">
    <md-input
      id="title"
      placeholder="Enter Title"
      md-inline
      v-model="checklist.title"
      @change="updateTitle"></md-input>
    <checklist-input></checklist-input>
    <ul>
      <li
        v-for="item in checklist.items"
        :key="item.key">
        <checklist-item :item="item"></checklist-item>
      </li>
    </ul>
  </section>
</template>

<script>
import ChecklistInput from './ChecklistInput'
import ChecklistItem from './ChecklistItem.vue'

export default {
  name: 'Checklist',
  components: {
    ChecklistInput,
    ChecklistItem
  },
  computed: {
    checklist () {
      return this.$store.state.currentChecklist
    }
  },
  methods: {
    updateTitle () {
      this.$store.commit('UPDATE_CHECKLIST_TITLE', this.checklist.title)
    }
  }
}
</script>

<style scoped>
#checklist {
  display: flex;
  flex-direction: column;
}
#title {
  font-size: 1.25em;
  background-color: #eee;
}
ul {
  padding-left: 5px;
}
li {
  list-style: none;
}
</style>
