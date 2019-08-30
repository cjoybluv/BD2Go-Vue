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

    <checklist-input
      v-if="checklist.title"
      :addChecklistItem="addChecklistItem"></checklist-input>

    <ul>
      <li
        v-for="item in checklist.items"
        :key="item.key">
        {{ item.subject }}
        <checklist-item :item="item"></checklist-item>
      </li>
    </ul>
    <pre> {{ JSON.stringify(checklist) }}</pre>
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
    addChecklistItem (newItem) {
      let subject = newItem.subject
      let cleanSubject
      if (subject.charAt(subject.length - 1) === String.fromCharCode(10)) {
        cleanSubject = subject.substring(0, subject.length - 1)
      } else {
        cleanSubject = subject
      }
      let cleanItem = {...newItem, subject: cleanSubject}
      this.$store.commit('ADD_CHECKLIST_ITEM', cleanItem)
      this.checklist = this.$store.state.currentChecklist
    },
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
      'addChecklist'
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
ul {
  padding-left: 5px;
}
li {
  list-style: none;
}
</style>
