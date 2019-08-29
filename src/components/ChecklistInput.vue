<template>
  <div>
    <md-field>
      <md-textarea
      placeholder="Enter new Item"
      v-model="newItem.subject"
      type="text"
      v-on:keyup.enter="addChecklistItem"
      md-autogrow></md-textarea>
      <span @click="addChecklistItem">
        <md-icon class="pointer">add</md-icon>
      </span>
      <span>
        <md-icon class="pointer">more_vert</md-icon>
      </span>
    </md-field>

  </div>
</template>

<script>
console.log('checklistinput')
export default {
  name: 'ChecklistInput',
  data () {
    return {
      newItem: {
        key: this.$store.state.currentChecklist.items ? this.$store.state.currentChecklist.items.length + 1 : 1,
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
textarea {
  flex: 1;
}
</style>
