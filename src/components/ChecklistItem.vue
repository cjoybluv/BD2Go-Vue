<template>
  <div id="checklistItem">
    <div id="completed">
      <b-form-checkbox
        v-model="item.completed">
      </b-form-checkbox>
    </div>
    <div id="subject"
      @mouseover="hover = true"
      @mouseleave="hover = false">

      <span v-if="!hover || moveEnabled">{{ item.subject }}</span>

      <b-form-textarea
        v-if="hover && !moveEnabled"
        v-model="item.subject">
      </b-form-textarea>
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
  props: ['item']
}
</script>

<style scoped>
#checklistItem {
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid lightgray;
}
#subject {
  display: flex;
  margin: 0 5px;
  flex: 1;
}
.custom-control-inline {
  margin-right: 0;
}
.btn {
  padding: 0 !important;
}
.moving {
  border: 1px solid black;
  background-color: white;
}
</style>
