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
        <b-dropdown size="large" right variant="link" no-caret>
          <template slot="button-content"><md-icon class="pointer">more_vert</md-icon></template>
          <b-dropdown-item href="#">Set a Date</b-dropdown-item>
          <b-dropdown-item href="#">Add an Attachment</b-dropdown-item>
          <b-dropdown-item>Delete</b-dropdown-item>
        </b-dropdown>
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
      let subject = this.newItem.subject
      let cleanSubject
      if (subject.charAt(subject.length - 1) === String.fromCharCode(10)) {
        cleanSubject = subject.substring(0, subject.length - 1)
      } else {
        cleanSubject = subject
      }
      let cleanItem = {...this.newItem, subject: cleanSubject}
      this.$store.commit('ADD_CHECKLIST_ITEM', cleanItem)

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
.md-field {
  display: flex;
  align-items: center;
  padding-left: 10px;
}
</style>
