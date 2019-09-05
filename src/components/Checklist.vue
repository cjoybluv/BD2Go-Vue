<template>
  <section id="checklist">
    <md-field id="titleLine">
      <md-input
        id="title"
        placeholder="Enter New Checklist Title"
        md-inline
        v-model="checklist.title"
        @change="updateTitle">
      </md-input>
      <span @click="saveChecklist">
        <md-icon class="pointer">save</md-icon>
      </span>
      <span>
        <b-dropdown size="large" right variant="link" no-caret>
          <template slot="button-content"><md-icon class="pointer">more_vert</md-icon></template>
          <b-dropdown-item v-if="!moveEnabled" @click="sortItems">Sort Items</b-dropdown-item>
          <b-dropdown-item v-if="moveEnabled" @click="sortItems">Stop Sorting</b-dropdown-item>
          <b-dropdown-item href="#">Set a Date</b-dropdown-item>
          <b-dropdown-item href="#">Add an Attachment</b-dropdown-item>
        </b-dropdown>
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
      <draggable
        :list="checklist.items"
        :disabled="!moveEnabled"
        ghost-class="ghost"
        @start="dragging = true"
        @end="dragging = false"
      >
        <li
          v-for="item in checklist.items"
          :key="item.key"
          :class="{moveEnabled: moveEnabled}">
          <checklist-item
            :item="item">
          </checklist-item>
        </li>
      </draggable>
    </ul>
  </section>
</template>

<script>
import { mapActions } from 'Vuex'
import draggable from 'vuedraggable'
import ChecklistInput from './ChecklistInput'
import ChecklistItem from './ChecklistItem.vue'

export default {
  name: 'Checklist',
  components: {
    ChecklistInput,
    ChecklistItem,
    draggable
  },
  computed: {
    checklist () {
      return this.$store.state.currentChecklist
    },
    moveEnabled () {
      return this.$store.state.pageControls.checklistDisplay.moveEnabled
    }
  },
  data () {
    return {
      dragging: false
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
    sortItems () {
      this.$store.commit('RESET_CHECKLIST_SORT')
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
#titleLine {
  display: flex;
  align-items: center;
  padding-left: 10px;
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
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.moveEnabled {
  cursor: move;
}
</style>
