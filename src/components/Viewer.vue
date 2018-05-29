<template>
  <div class = "viewer panel">
    <h1>Viewer</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'viewer'
}
</script>

<style scoped>
.viewer {
    height: 200px;
}
</style>
