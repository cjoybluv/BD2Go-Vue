<template>
  <section id="checklist">
    <header>
      <h5>{{ checklist.title }}</h5>
    </header>
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
  }
}
</script>

<style scoped>
ul {
  padding-left: 5px;
}
li {
  list-style: none;
}
</style>
