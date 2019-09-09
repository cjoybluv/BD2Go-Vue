<template>
  <div>
    <b-form-textarea
      placeholder="Enter new Item"
      v-model="newItem.subject"
      v-on:keyup.enter="addChecklistItem">
    </b-form-textarea>
    <span @click="addChecklistItem" class="center">
      <font-awesome-icon icon="plus" class="pointer" />
    </span>
    <span>
      <b-dropdown size="large" right variant="link" no-caret>
        <template slot="button-content">
          <font-awesome-icon icon="ellipsis-v" class="pointer" />
        </template>
        <b-dropdown-item href="#">Set a Date</b-dropdown-item>
        <b-dropdown-item href="#">Add an Attachment</b-dropdown-item>
        <b-dropdown-item>Delete</b-dropdown-item>
      </b-dropdown>
    </span>

  </div>
</template>

<script>
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
    addChecklistItem (e) {
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
.center {
  align-self: center;
}
</style>
