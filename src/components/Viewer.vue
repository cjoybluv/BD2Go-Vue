<template>
  <div class="viewer panel">
    <h1>{{ language.title }}</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'viewer',
  computed: {
    language () {
      return this.$store.state.language.viewer
    }
  }
}
</script>

<style scoped>
.viewer {
    height: 200px;
}
</style>
