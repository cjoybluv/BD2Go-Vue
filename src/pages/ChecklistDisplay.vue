<template>
  <div id="checklists">
    <h1>{{ language.title }}</h1>

    <section id="main">
      <panel>
          <ul>
            <li
              v-for="checklist in checklists"
              :key="checklist._id"
              @click="editChecklist(checklist)">
              {{ checklist.title }}
            </li>
          </ul>
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
    checklists () {
      return this.$store.state.checklists
    },
    currentUser () {
      return this.$store.state.user
    },
    me () {
      return this.$store.state.me
    }
  },
  methods: {
    editChecklist (checklist) {
      console.log('editChecklist', checklist)
      this.$store.commit('EDIT_CHECKLIST', checklist)
    }
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
#checklists li {
  cursor: pointer;
}
.md-field {
  min-height: 0;
  margin: 0;
  padding: 0;
}
</style>
