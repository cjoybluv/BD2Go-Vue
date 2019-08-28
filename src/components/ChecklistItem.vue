<template>
  <div>
    <input
      type="checkbox">
    <span> {{ item.subject }} </span>
  </div>
</template>

<script>
export default {
  name: 'ChecklistItem',
  props: ['item']

}
</script>
