<template>
  <div class="header">
    <div class="left">
      <h1>{{ language.appTitle }}</h1>
      <h5>by {{ language.us }}</h5>
    </div>
    <div class="right">
      <h1>User</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    language () {
      return this.$store.state.language.header
    }
  }
}
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
h1, h5 {
  margin: 0;
}
.right {
  margin-right: 10px;
}
</style>
