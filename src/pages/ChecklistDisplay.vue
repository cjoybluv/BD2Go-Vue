<template>
  <div id="checklists">
    <h1>{{ language.title }}</h1>

    <section id="main">
      <panel>
        <folder-input />
        <folder-display
            v-if="this.$store.state.user.folders && folderDisplayItems"
            :folders="this.$store.state.user.folders"
            :items="folderDisplayItems"
            :openItem="openItem" />
      </panel>
      <panel>
          <checklist></checklist>
      </panel>
      <panel>

      </panel>
    </section>

    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { mapActions } from 'Vuex'
import checklist from '../components/Checklist'
import folderInput from '../components/FolderInput'
import folderDisplay from '../components/FolderDisplay'
import panel from '../components/Panel'

export default {
  name: 'ChecklistDisplay',
  components: {
    checklist,
    folderInput,
    folderDisplay,
    panel
  },
  data () {
    return {
      error: '',
      user: {
        username: '',
        email: ''
      },
      newFolderName: '',
      submitted: false
    }
  },
  computed: {
    language () {
      return this.$store.state.language.checklists
    },
    checklists () {
      return this.$store.state.checklists
    },
    currentUser () {
      return this.$store.state.user
    },
    folderDisplayItems () {
      return this.checklists.map(checklist => {
        return { _id: checklist._id, name: checklist.title, folderName: checklist.folderName }
      })
    },
    me () {
      return this.$store.state.me
    }
  },
  methods: {
    createFolder () {
      if (this.newFolderName) {
        this.createChecklistFolder(this.newFolderName)
      }
    },
    openItem (folderItem) {
      if (!folderItem.folder) {
        this.$store.commit('EDIT_CHECKLIST', this.$store.state.checklists.find(checklist => {
          return checklist._id === folderItem.itemId
        }))
      }
    },
    ...mapActions([
      'createChecklistFolder',
      'fetchUser'
    ])
  }
}
</script>

<style>
#main {
  display: flex;
  flex-wrap: wrap;
}
.panel {
  min-width: 400px;
  padding: 5px;
}
#checklists h1 {
  border-top: 1px solid black;
}
#createFolderLine {
  display: flex;
}
.md-field {
  min-height: 0;
  margin: 0;
  padding: 0;
}
.md-list-item-content {
  min-height: 0;
  padding: 4px;
}
.md-list-item-text {
  cursor: pointer;
}
.md-list-item-expand {
  margin-left: 5px;
}
.md-list-item-default {
  margin-left: 15px;
}
</style>
