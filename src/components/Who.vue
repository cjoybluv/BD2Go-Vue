<template>
  <div id="who">
    <h2>Who</h2>
    <ul>
      <li v-for="contact in contacts" :key="contact.name">
        {{ contact.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Who',
  computed: {
    contacts () {
      return this.$store.state.contacts
    }
  }
}

</script>

<style scoped>
ul {
  margin: 0 5px;
  padding-left: 0;
  min-width: 200px;
}
li {
  background: white;
  text-align: left;
  list-style-type: none;
  margin-bottom: 5px;
}
</style>
