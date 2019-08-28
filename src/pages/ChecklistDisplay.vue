<template>
  <div id="checklists">
    <h1>{{ language.title }}</h1>

    <section id="main">
      <panel>
          folder display of checklists
      </panel>
      <panel>
          <checklist></checklist>
      </panel>
      <panel>
          detail panel here
      </panel>
    </section>

    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import checklist from '../components/Checklist'
import panel from '../components/Panel.vue'

export default {
  name: 'ChecklistDisplay',
  components: {
    checklist,
    panel
  },
  data () {
    return {
      error: '',
      user: {
        username: '',
        email: ''
      },
      submitted: false
    }
  },
  computed: {
    language () {
      return this.$store.state.language.checklists
    },
    currentUser () {
      return this.$store.state.user
    },
    me () {
      return this.$store.state.me
    }
  },
  methods: {

  },
  mounted () {
    this.user = this.currentUser
    this.$refs.username.focus()
  }
}
</script>

<style>
#main {
  display: flex;
  flex-wrap: wrap;
}
panel {
  min-width: 400px;
}
#checklists h1 {
  border-top: 1px solid black;
}
</style>
