<template>
  <div id="item">
    <div id="checkbox">
      <input
        type="checkbox"
        v-model="item.completed">
    </div>
    <div id="subject"
      @mouseover="hover = true"
      @mouseleave="hover = false">
      <span v-if="!hover">{{ item.subject }}</span>
      <md-textarea
        v-if="hover"
        v-model="item.subject"></md-textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChecklistItem',
  data () {
    return {
      hover: false
    }
  },
  props: ['item']
}
</script>

<style scoped>
#item {
  display: flex;
  border-bottom: 1px solid lightgray;
  cursor: auto;
}
#subject {
  margin: 0 10px;
  flex: 1;
}
.md-textarea {
  width: 100%;
}
</style>
