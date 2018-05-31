<template>
  <div id="location-display">
    <h2>Where</h2>
    <ul>
      <!-- <li v-for="location in locations" :key="location.name">
        {{ location.name }}
      </li> -->
      <li v-for="location in locations"
        :key="JSON.stringify(location)">
        <h4>
          {{ location.name }}
        </h4>
        <p>{{ location.street }}, {{ location.city }} {{ location.st }} {{ location.zip }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LocationDislay',
  computed: {
    locations () {
      return this.$store.state.locations
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
