<template>
  <div id="signup">
    <h1>{{ language.title }}</h1>
    <form>
      <fieldset>
        <label>{{ language.username }}</label>
        <input type="text" ref="username" v-model="user.username" required>
        <label>{{ language.email }}</label>
        <input type="email" v-model="user.email" required>
      </fieldset>

      <button v-on:click.prevent="handleSubmit">{{ language.update }}</button>
    </form>
    <contact-form :contact="me" :onSubmit="meUpdated" />
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { mapActions } from 'Vuex'
import contactForm from '../components/ContactForm.vue'

export default {
  name: 'Signup',
  components: {
    'contact-form': contactForm
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
      return this.$store.state.language.profile
    },
    currentUser () {
      return this.$store.state.user
    },
    me () {
      return this.$store.state.me
    }
  },
  methods: {
    handleSubmit () {
      console.log('Profile-handleSubmit')
    },
    meUpdated (me) {
      console.log('Profile-meUpdated', me)
      if (me._id) {
        this.updateContact(me).then(me => {
          this.fetchMe(me.body._id)
        })
      } else {
        this.addContact(me).then(me => {
          console.log('pre-fetch on else', me)
          this.fetchMe(me.body._id).then(me => {
            const updatedUser = {
              ...this.currentUser,
              meContactId: me.body._id
            }
            console.log('pre-updateUser call', updatedUser)
            this.updateUser(updatedUser)
          })
        })
      }
    },
    ...mapActions([
      'addContact',
      'updateContact',
      'fetchMe',
      'updateUser'
    ])
  },
  mounted () {
    this.user = this.currentUser
    this.$refs.username.focus()
  }
}
</script>

<style scoped>
#signup {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}
h1 {
  margin: 20px 0;
}
form {
  display: flex;
  flex-flow: column nowrap;
  width: 300px;
}
fieldset {
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  border: none;
}
label {
  margin-top: 10px;
}
input {
  width: 300px;
}
button {
  margin: 20px 0;
  width: 100px;
  align-self: center;
  min-height: 18px;
}
</style>
