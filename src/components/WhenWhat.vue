<template>
  <div id="when-what">
    <h2>When & What</h2>
    <ul>
      <li v-for="item in contactItems" :key="JSON.stringify(item)">
        <h4>
          <span class="soft-text">{{ item.type | allCaps }}</span>
          &nbsp;
          <span>{{ item.dateTime | moment("MM-DD-YYYY") }}</span>
        </h4>
        <h5>{{ item.contactName }}</h5>
        <p>{{ item.subject }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'Vuex'

export default {
  name: 'WhenWhat',
  computed: {
    ...mapGetters([
      'contactItems'
    ])
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
