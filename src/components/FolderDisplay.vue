<template>
  <div id= "folderDisplay">
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
    <ul id="folderList">
      <li class="rootItem"
          :class="{folder: !rootItem.itemId}"
          v-for="rootItem in displayData"
          :key="rootItem.key">
        <div class="lineItem">
          <font-awesome-icon
              icon="caret-up"
              class="fa-lg"
              v-if="!rootItem.childrenToggle && !rootItem.itemId"
              @click="toggleChildren(rootItem)" />
          <font-awesome-icon
              icon="caret-down"
              class="fa-lg"
              v-if="rootItem.childrenToggle && !rootItem.itemId"
              @click="toggleChildren(rootItem)" />
          <font-awesome-icon
              icon="caret-right"
              v-if="rootItem.itemId" />
          <span @click="openItem(rootItem)">{{ rootItem.itemName }}</span>
        </div>
        <ul class="children"
            v-if="rootItem.children.length && rootItem.childrenToggle">
          <li class="childItem"
              v-for="child in rootItem.children"
              :key="child.key">
            <div class="lineItem">
              <font-awesome-icon icon="caret-right" />
              <span @click="openItem(child)">{{ child.itemName }}</span>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'Vuex'

export default {
  name: 'FolderDisplay',
  data () {
    return {
      displayData: this.createArray(this.folders, this.items),
      newFolderName: '',
      retainToggles: []
    }
  },
  props: ['folders', 'items'],
  methods: {
    createArray (folders, items) {
      let key = 0
      let folderArray = []

      folders.forEach((folder) => {
        folderArray.push({
          key: key++,
          itemName: folder,
          children: [],
          childrenToggle: false,
          folder: true,
          itemId: null
        })
      })
      items.forEach((item) => {
        if (item.folderName) {
          let idx = folderArray.findIndex((folder) => {
            return folder.itemName === item.folderName
          })
          if (idx !== -1) {
            folderArray[idx].children.push({
              key: key++,
              itemName: item.name,
              children: [],
              childrenToggle: false,
              folder: false,
              itemId: item._id })
          } else {
            folderArray.push({
              key: key++,
              itemName: item.name,
              children: [],
              childrenToggle: false,
              folder: false,
              itemId: item._id
            })
          }
        } else {
          folderArray.push({
            key: key++,
            itemName: item.name,
            children: [],
            childrenToggle: false,
            folder: false,
            itemId: item._id
          })
        }
      })
      folderArray.sort((a, b) => {
        if (a.itemName > b.itemName) {
          return 0
        } else {
          return -1
        }
      }).sort((a, b) => {
        if (a.folder > b.folder) {
          return -1
        } else {
          return 0
        }
      })
      folderArray.forEach(folder => {
        return folder.children.sort((a, b) => {
          if (a.itemName > b.itemName) {
            return 0
          } else {
            return -1
          }
        })
      })

      if (this.retainToggles && this.retainToggles.length) {
        this.retainToggles.forEach(toggle => {
          const idx = folderArray.findIndex(rootItem => {
            return rootItem.itemName === toggle.itemName
          })
          folderArray[idx].childrenToggle = toggle.childrenToggle
        })
      }

      return folderArray
    },
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
    toggleChildren (rootItem) {
      rootItem.childrenToggle = !rootItem.childrenToggle
      const idx = this.retainToggles.findIndex(toggle => {
        return toggle.itemName === rootItem.itemName
      })
      if (idx !== -1) {
        this.retainToggles[idx].childrenToggle = rootItem.childrenToggle
      } else {
        this.retainToggles.push({ itemName: rootItem.itemName, childrenToggle: rootItem.childrenToggle })
      }
    },
    ...mapActions([
      'createChecklistFolder'
    ])
  },
  watch: {
    folders (newVal, oldVal) {
      this.displayData = this.createArray(this.folders, this.items)
    },
    items (newVal, oldVal) {
      this.displayData = this.createArray(this.folders, this.items)
    }
  }
}
</script>

<style scoped>
#folderList {
  padding-inline-start: 0;
  line-height: 2em;
  font-size: 1.12em;
}
.rootItem {
  list-style-type: none;
}
.rootItem:not(.folder) {
  margin-left: 0.4em;
}
.lineItem {
  display: flex;
  align-items: center;
}
.lineItem:hover {
  background: #e4e4e4;
}
.lineItem span {
  flex: 1;
}
.rootItem svg {
  cursor: pointer;
  margin: 0 5px;
}
.folder {
  font-weight: bold;
}
.rootItem span {
  margin-left: 5px;
}
.children {
  padding-inline-start: 2em;
}
.childItem {
  list-style-type: none;
}
.childItem span {
  font-weight: normal;
}
</style>
