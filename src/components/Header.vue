<template>
  <div class="header">
    <div class="left">
      <h1>{{ language.appTitle }}</h1>
      <h5>by {{ language.us }}</h5>
    </div>
    <div class="right">
      <router-link to="/profile">
        <font-awesome-icon icon="user"  class="pointer " />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    language () {
      return this.$store.state.language.header
    },
    user () {
      return this.$store.state.user
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
