<template>
  <div id="item">
    <div id="checkbox">
      <input
        type="checkbox">
    </div>
    <div id="subject">
      <span> {{ item.subject }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChecklistItem',
  props: ['item']

}
</script>

<style scoped>
#item {
  display: flex;
  border-bottom: 1px solid lightgray;
}
#subject {
  margin-left: 10px;
  flex: 1;
}
</style>
