<template>
  <div id="checklists">
    <h1>{{ language.title }}</h1>

    <section id="main">
      <panel>
          <!-- <div id="createFolderLine">
            <b-form-input
              placeholder="Create New Folder Name"
              v-model="newFolderName"
              v-on:keyup.enter="createFolder">
            </b-form-input>
            <span
              @click="createFolder"
              :class="{pointer: newFolderName, notAllowed: !newFolderName}"
              class="self-center">
              <font-awesome-icon icon="plus" />
            </span>
          </div> -->
          <md-list>
            <md-list-item
              v-for="rootItem in folderArray"
              :key="rootItem.key"
              :md-expand.sync="rootItem.folder">
              <span class="md-list-item-text"
                @click="openFolderItem(rootItem)">
                {{ rootItem.title }}
              </span>

              <md-list slot="md-expand">
                <md-list-item
                  v-for="item in rootItem.items"
                  :key="item._id"
                  @click="openFolderItem(item)">
                  <span class="md-list-item-text md-list-item-default">
                    {{ item.title }}
                  </span>
                </md-list-item>
              </md-list>
            </md-list-item>
          </md-list>

      </panel>
      <panel>
          <checklist></checklist>
      </panel>
      <panel>
        <div id="createFolderLine">
          <b-form-input
            placeholder="Create New Folder Name"
            v-model="newFolderName"
            v-on:keyup.enter="createFolder">
          </b-form-input>
          <span
            @click="createFolder"
            :class="{pointer: newFolderName, notAllowed: !newFolderName}"
            class="self-center">
            <font-awesome-icon icon="plus" />
          </span>
        </div>
        <folder-display
            v-if="this.$store.state.appData.checklistFolders && folderDisplayItems"
            :folders="this.$store.state.user.folders"
            :items="folderDisplayItems"
            :openItem="openItem" />
      </panel>
    </section>

    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { mapActions } from 'Vuex'
import checklist from '../components/Checklist'
import folderDisplay from '../components/FolderDisplay'
import panel from '../components/Panel'

export default {
  name: 'ChecklistDisplay',
  components: {
    checklist,
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
    folderArray () {
      return this.$store.state.contentControls.checklistFolderArray
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
    openFolderItem (item) {
      if (!item.folder) {
        if (!item._rec) {
          this.$store.commit('EDIT_CHECKLIST', item)
        } else {
          this.$store.commit('EDIT_CHECKLIST', item._rec)
        }
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
      'createChecklistFolder'
    ])
  },
  mounted () {
    this.user = this.currentUser
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
