<template>
  <ul id="folderDisplay">
    <li class="rootItem"
        v-for="rootItem in displayData"
        :key="rootItem.key">
      <font-awesome-icon icon="caret-down" />
      <span>{{ rootItem.itemName }}</span>
      <ul class="children"
          v-if="rootItem.children.length">
        <li class="childItem"
            v-for="child in rootItem.children"
            :key="child.key">
          <font-awesome-icon icon="caret-right" />
          <span>{{ child.itemName }}</span>
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
          ] },
        { key: '2',
          itemName: 'SKI',
          children: [
            { key: '2-1', itemName: 'load car', itemId: '293847i' }
          ] },
        { key: '3', itemName: 'TEST', children: [] },
        { key: '4', itemName: 'Honey Doo', children: [], itemId: '0945674' },
        { key: '5', itemName: 'Freddies', children: [], itemId: '23549238' }
      ]
    }
  }
}
</script>

<style scoped>
#folderDisplay {
  padding-inline-start: 0;
}
.rootItem {
  list-style-type: none;
}
.rootItem span {
  margin-left: 5px;
}
.children {
  padding-inline-start: 1em;
}
.childItem {
  list-style-type: none;
}
</style>