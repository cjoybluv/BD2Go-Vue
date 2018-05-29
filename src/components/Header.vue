<template>
  <div class="header">
    <div class="left">
      <h1>{{ header.appTitle }}</h1>
      <h5>by {{ header.us }}</h5>
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
    header () {
      return this.$store.state.header
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
