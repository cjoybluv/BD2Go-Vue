<template>
  <div id="folderInput">
    <input
        placeholder="Create New Folder"
        v-model="folderName" />
    <span v-if="err">{{ err }}</span>
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
      folderName: '',
      err: ''
    }
  },
  methods: {
    addFolder () {
      this.err = ''
      let updatedUser = { ...this.$store.state.user }
      if (updatedUser.folders) {
        const idx = updatedUser.folders.findIndex(folder => {
          return folder.toUpperCase() === this.folderName.toUpperCase()
        })
        if (idx === -1) {
          updatedUser.folders.push(this.folderName)
        } else {
          this.err = 'Duplicate Folder Name'
        }
      } else {
        updatedUser.folders = [this.folderName]
      }
      this.updateUser(updatedUser)
      if (!this.err) this.folderName = ''
    },
    ...mapActions([
      'updateUser'
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
span {
  position: relative;
  top: 35px;
  left: -270px;
  color: red;
  margin-bottom: 30px;
}
</style>
