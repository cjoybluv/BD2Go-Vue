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
      displayData: [
        { key: '1',
          itemName: 'KAYAK',
          children: [
            { key: '1-1', itemName: 'Load on Car', itemId: '8237459' },
            { key: '1-2', itemName: 'Unload car', itemId: '1231423' }
          ],
          childrenToggle: false },
        { key: '2',
          itemName: 'SKI',
          children: [
            { key: '2-1', itemName: 'load car', itemId: '293847i' }
          ],
          childrenToggle: false },
        { key: '3', itemName: 'TEST', children: [], childrenToggle: false },
        { key: '4', itemName: 'Honey Doo', children: [], childrenToggle: false, itemId: '0945674' },
        { key: '5', itemName: 'Freddies', children: [], childrenToggle: false, itemId: '23549238' }
      ]
    }
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
