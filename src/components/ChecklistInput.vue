<template>
  <div>
    <input
      autofocus
      placeholder="Enter new Item"
      v-model="newItem.subject"
      type="text"
      v-on:keyup.enter="addChecklistItem">
    <font-awesome-icon icon="plus" @click="addChecklistItem" class="pointer"/>
  </div>
</template>

<script>
export default {
  name: 'ChecklistInput',
  data () {
    return {
      newItem: {
        key: this.$store.state.currentChecklist.items.length + 1 || 1,
        subject: ''
      }
    }
  },
  methods: {
    addChecklistItem () {
      this.$store.commit('ADD_CHECKLIST_ITEM', this.newItem)
      this.newItem = {}
      this.newItem.key = this.$store.state.currentChecklist.items.length + 1
    }
  }
}
</script>

<style scoped>
div {
  display: flex;
}
input {
  flex: 1;
}
</style>
