<template>
  <div id="folderInput">
    <input
        placeholder="Create New Folder"
        v-model="folderName" />
    <font-awesome-icon
        icon="plus"
        class="fa-lg"
        @click="addFolder" />
  </div>
</template>

<script>
import { mapActions } from 'Vuex'

export default {
  name: 'FolderInput',
  data () {
    return {
      folderName: ''
    }
  },
  methods: {
    addFolder () {
      this.createFolder(this.folderName)
      this.folderName = ''
    },
    ...mapActions([
      'createFolder'
    ])
  }
}
</script>

<style scoped>
#folderInput {
  display: flex;
}
input {
  flex: 1;
}
svg {
  cursor: pointer;
  margin: 8px 5px;
}
</style>
