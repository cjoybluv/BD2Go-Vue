<template>
  <div id="signup">
    <h1>{{ language.title }}</h1>
    <form>
      <fieldset>
        <label>{{ language.username }}</label>
        <input type="text" ref="username" v-model="user.username" required>
        <label>{{ language.email }}</label>
        <input type="email" v-model="user.email" required>
        <label>{{ language.password }}</label>
        <input type="text" v-model="user.password" required>
        <label>{{ language.confirmPassword }}</label>
        <input type="text" v-model="user.confirmPassword" required>
      </fieldset>
      <button v-on:click.prevent="handleSubmit">{{ language.signup }}</button>
    </form>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { mapActions } from 'Vuex'

export default {
  name: 'Signup',
  data () {
    return {
      error: '',
      user: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      submitted: false
    }
  },
  computed: {
    language () {
      return this.$store.state.language.signup
    },
    currentUser () {
      return this.$store.state.user
    }
  },
  methods: {
    ...mapActions([
      'signup'
    ]),
    handleSubmit: function () {
      if (this.user.password === this.user.confirmPassword) {
        this.$store.dispatch('signup', this.user).then(() => {
          this.$router.push('/login')
        }).catch(err => this.error = err.body.error)
      } else {
        this.error = 'Passwords do not match'
      }
    }
  },
  mounted () {
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
