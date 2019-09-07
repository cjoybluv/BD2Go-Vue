<template>
  <section id="checklist">
    <div id="titleLine">

      <b-form-input
        id="checklistTitle"
        placeholder="Enter New Checklist Title"
        v-model="checklist.title"
        @change="updateTitle">
      </b-form-input>
      <span @click="saveChecklist" :class="{pointer: checklist.title, notAllowed: !checklist.title}">
        <font-awesome-icon icon="save" class="pointer fa-lg"/>
      </span>
      <span>
        <b-dropdown size="large" right variant="link" no-caret :disabled="!checklist.title">
          <template slot="button-content">
            <font-awesome-icon icon="ellipsis-v" :class="{pointer: checklist.title, notAllowed: !checklist.title}" />
          </template>
          <b-dropdown-item v-if="!moveEnabled" @click="moveItems">Move Items</b-dropdown-item>
          <b-dropdown-item v-if="moveEnabled" @click="moveItems">Stop Moving Items</b-dropdown-item>
          <b-dropdown-item @click="clearCurrentChecklist">Clear Current Checklist</b-dropdown-item>
          <b-dropdown-item href="#">Add an Attachment</b-dropdown-item>
        </b-dropdown>
      </span>
    </div>

    <div
      id="masterChecklist"
      v-if="checklist.title && !checklist.sourceMasterId">
      <b-form-checkbox
        v-model="checklist.masterChecklist">
        Master Checklist
      </b-form-checkbox>
    </div>

    <div
      id="folderLine"
      v-if="checklist.title">
      <label for="folderSelect">Folder</label>
      <b-form-select
        name="folderSelect"
        v-model="checklist.folder"
        :options="this.$store.state.appData.checklistFolders">
        <template slot="first">
          <option :value="null">&lt;ROOT&gt;</option>
        </template>
      </b-form-select>
    </div>

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
    checklistFolders () {
      return ['no data']
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
  border-bottom: 1px solid darkgray;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
#checklistTitle {
  border: none;
  font-size: 1.25em;
  font-weight: bold;
  background-color: #eee;
}
#masterChecklist {
  margin: 5px 10px;
}
#folderLine {
  display: flex;
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
.md-field label {
  top: 0;
  left: 10px;
}
</style>
