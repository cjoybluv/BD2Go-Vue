<template>
  <div id="item">
    <div id="checkbox">
      <b-form-checkbox
        v-model="item.completed">
      </b-form-checkbox>
    </div>
    <div id="subject"
      @mouseover="hover = true"
      @mouseleave="hover = false">

      <span v-if="!hover || moveEnabled">{{ item.subject }}</span>

      <md-textarea
        v-if="hover && !moveEnabled"
        v-model="item.subject"></md-textarea>
    </div>
    <div id="more">
      <b-dropdown right variant="link" no-caret>
        <template slot="button-content">
          <font-awesome-icon icon="ellipsis-v" class="pointer"/>
        </template>
        <b-dropdown-item>Set a Date</b-dropdown-item>
        <b-dropdown-item>Add an Attachment</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChecklistItem',
  computed: {
    moveEnabled () {
      return this.$store.state.pageControls.checklistDisplay.moveEnabled
    }
  },
  data () {
    return {
      hover: false
    }
  },
  props: ['item'],
  methods: {
    moveItem () {
      this.$store.commit('INIT_CHECKLIST_MOVE_ITEM')
    }
  }
}
</script>

<style scoped>
#item {
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid lightgray;
}
#subject {
  display: flex;
  margin: 0 10px;
  flex: 1;
}
.md-textarea {
  width: 100%;
}
.btn {
  padding: 0 !important;
}
.moving {
  border: 1px solid black;
  background-color: white;
}
</style>
