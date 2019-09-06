<template>
  <section id="checklist">
    <md-field id="titleLine">
      <md-input
        id="checklistTitle"
        placeholder="Enter New Checklist Title"
        md-inline
        v-model="checklist.title"
        @change="updateTitle">
      </md-input>
      <span @click="saveChecklist" :class="{pointer: checklist.title, notAllowed: !checklist.title}">
        <md-icon>save</md-icon>
      </span>
      <span>
        <b-dropdown size="large" right variant="link" no-caret :disabled="!checklist.title">
          <template slot="button-content"><md-icon :class="{pointer: checklist.title, notAllowed: !checklist.title}">more_vert</md-icon></template>
          <b-dropdown-item v-if="!moveEnabled" @click="moveItems">Move Items</b-dropdown-item>
          <b-dropdown-item v-if="moveEnabled" @click="moveItems">Stop Moving Items</b-dropdown-item>
          <b-dropdown-item @click="clearCurrentChecklist">Clear Current Checklist</b-dropdown-item>
          <b-dropdown-item href="#">Add an Attachment</b-dropdown-item>
        </b-dropdown>
      </span>
    </md-field>

    <md-field v-if="checklist.title && !checklist.sourceMasterId">
      <input
        id="masterChecklist"
        type="checkbox"
        v-model="checklist.masterChecklist">
        Master Checklist
    </md-field>

    <md-field v-if="checklist.title">
      <md-input
        placeholder="Enter Foldername (optional)"
        v-model="checklist.folder">
      </md-input>
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
      if (this.checklist.title) {
        if (!this.checklist._id) {
          this.checklist.ownerId = this.$store.state.user._id
          this.addChecklist(this.checklist)
        } else {
          this.updateChecklist(this.checklist)
        }
      }
    },
    moveItems () {
      this.$store.commit('RESET_CHECKLIST_MOVE')
    },
    clearCurrentChecklist () {
      this.$store.commit('CLEAR_CURRENT_CHECKLIST')
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
#checklistTitle {
  font-size: 1.25em;
  font-weight: bold;
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
