<template>
  <section id="checklist">
    <md-field>
      <md-input
        id="title"
        placeholder="Enter Title"
        md-inline
        v-model="checklist.title"
        @change="updateTitle">
      </md-input>
      <span @click="saveChecklist">
        <md-icon class="pointer">save</md-icon>
      </span>
      <span>
        <md-icon class="pointer">more_vert</md-icon>
      </span>
    </md-field>

    <md-field v-if="checklist.title && !checklist.sourceMasterId">
      <input
        id="masterChecklist"
        type="checkbox"
        v-if="checklist.title"
        v-model="checklist.masterChecklist">
        Master Checklist
    </md-field>

    <checklist-input v-if="checklist.title && !checklist.sourceMasterId"></checklist-input>

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
import { mapActions } from 'Vuex'
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
    },
    saveChecklist () {
      if (!this.checklist._id) {
        this.checklist.ownerId = this.$store.state.user._id
        this.addChecklist(this.checklist)
      } else {
        this.updateChecklist(this.checklist)
      }
    },
    ...mapActions([
      'addChecklist',
      'updateChecklist'
    ])
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
#masterChecklist {
  margin: 0 10px;
}
ul {
  padding-left: 5px;
}
li {
  list-style: none;
}
</style>
