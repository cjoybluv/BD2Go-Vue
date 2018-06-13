<template>
  <div id="login">
    <h1>{{ language.title }}</h1>
    <form>
      <fieldset>
        <label>{{ language.email }}</label>
        <input type="email" ref="email" v-model="user.email" required>
        <label>{{ language.password }}</label>
        <input type="password" v-model="user.password" required>
      </fieldset>
      <button v-on:click.prevent="handleSubmit">{{ language.login }}</button>
    </form>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { mapActions } from 'Vuex'

export default {
  name: 'Login',
  data () {
    return {
      error: '',
      user: {
        email: '',
        password: ''
      },
      submitted: false
    }
  },
  computed: {
    language () {
      return this.$store.state.language.login
    },
    currentUser () {
      return this.$store.state.user
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    handleSubmit: function () {
      this.$store.dispatch('login', this.user).then(() => {
        this.$router.push('/')
      }).catch(err => {
        this.error = err.body.error
      })
    }
  },
  mounted () {
    this.$refs.email.focus()
  }
}
</script>

<style scoped>
#login {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 300px;
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
}
</style>
