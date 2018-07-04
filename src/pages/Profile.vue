<template>
  <div id="profile">
    <h1>{{ language.title }}</h1>
    <b-form>
      <b-form-group :label="language.username">
        <b-form-input type="text" ref="username" v-model="user.username" required />
      </b-form-group>
      <b-form-group :label="language.email">
        <b-form-input type="email" v-model="user.email" required />
      </b-form-group>

      <b-btn v-on:click.prevent="handleSubmit">{{ language.update }}</b-btn>
    </b-form>
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
      this.$router.push('/')
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
    console.log('Profile-mounted')
    this.user = this.currentUser
    this.$refs.username.focus()
  }
}
</script>

<style scoped>
#profile {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}
.profile-form {
  width: 100%;
  /* display: flex;
  justify-content: center; */
}
h1 {
  margin: 20px 0;
}
form {
  display: flex;
  flex-flow: column nowrap;
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
  width: 600px;
}
button {
  margin: 20px 0;
  width: 100px;
  align-self: center;
  min-height: 18px;
}
</style>
