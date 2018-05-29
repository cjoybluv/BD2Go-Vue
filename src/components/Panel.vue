<template>
  <div class = "panel">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'panel'
}
</script>

<style>
.panel {
  background: #eee;
  flex: 1;
  margin: 5px;
}
.panel h2 {
  margin: .25em;
}
.panel h4 {
  margin: 0;
}
.panel p {
  margin: 0;
}
</style>
