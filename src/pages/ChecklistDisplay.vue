<template>
  <div id="checklists">
    <h1>{{ language.title }}</h1>

    <section id="main">
      <panel>
          <md-field>
            <md-input
              placeholder="Create New Folder Name"
              md-inline
              v-model="newFolderName"
              v-on:keyup.enter="createFolder">
            </md-input>
            <span
              @click="createFolder"
              :class="{pointer: newFolderName, notAllowed: !newFolderName}"
              class="self-center">
              <font-awesome-icon icon="plus" />
            </span>
          </md-field>
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
                  :key="item._id">
                  <span class="md-list-item-text"
                    @click="openFolderItem(item)">
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
          detail panel here
      </panel>
    </section>

    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { mapActions } from 'Vuex'
import checklist from '../components/Checklist'
import panel from '../components/Panel'

export default {
  name: 'ChecklistDisplay',
  components: {
    checklist,
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
    checklistFolders () {
      return this.$store.state.appData.checklistFolders
    },
    currentUser () {
      return this.$store.state.user
    },
    folderArray () {
      return this.$store.state.contentControls.checklistFolderArray
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
      if (item._rec) {
        this.$store.commit('EDIT_CHECKLIST', item._rec)
      } else {
        if (!item.folder) {
          this.$store.commit('EDIT_CHECKLIST', item)
        }
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
