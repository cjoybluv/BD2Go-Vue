<template>
  <ul id="folderDisplay">
    <li class="rootItem"
        :class="{folder: !rootItem.itemId}"
        v-for="rootItem in displayData"
        :key="rootItem.key">
      <div class="lineItem">
        <font-awesome-icon
            icon="caret-up"
            class="fa-lg"
            v-if="!rootItem.childrenToggle && !rootItem.itemId"
            @click="rootItem.childrenToggle = !rootItem.childrenToggle" />
        <font-awesome-icon
            icon="caret-down"
            class="fa-lg"
            v-if="rootItem.childrenToggle && !rootItem.itemId"
            @click="rootItem.childrenToggle = !rootItem.childrenToggle" />
        <font-awesome-icon
            icon="caret-right"
            v-if="rootItem.itemId" />
        <span>{{ rootItem.itemName }}</span>
      </div>
      <ul class="children"
          v-if="rootItem.children.length && rootItem.childrenToggle">
        <li class="childItem"
            v-for="child in rootItem.children"
            :key="child.key">
          <div class="lineItem">
            <font-awesome-icon icon="caret-right" />
            <span>{{ child.itemName }}</span>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'FolderDisplay',
  data () {
    return {
      displayData: []
    }
  },
  props: ['folders', 'items'],
  methods: {
    createArray () {
      let key = 0
      let folderArray = []
     
      this.folders.forEach((folder) => {
        folderArray.push({
          key: key++,
          itemName: folder,
          children: [],
          childrenToggle: false,
          folder: true,
          itemId: null
        })
      })
      this.items.forEach((item) => {
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
      return folderArray
    }
  },
  mounted () {
    this.displayData = this.createArray()
  }
}
</script>

<style scoped>
#folderDisplay {
  padding-inline-start: 0;
  line-height: 2em;
  font-size: 1.12em;
}
.rootItem {
  list-style-type: none;
}
.lineItem:hover {
  background: #e4e4e4;
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
  padding-inline-start: 3em;
}
.childItem {
  list-style-type: none;
}
.childItem span {
  font-weight: normal;
}
</style>
