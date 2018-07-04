<template>
  <div id="signup">
    <h1>{{ language.title }}</h1>
    <b-form>
      <b-form-group :label="language.username">
        <b-form-input type="text" ref="username" v-model="user.username" required />
      </b-form-group>
      <b-form-group :label="language.email">
        <b-form-input type="email" v-model="user.email" required />
      </b-form-group>
      <b-form-group :label="language.password">
        <b-form-input type="text" v-model="user.password" required />
      </b-form-group>
      <b-form-group :label="language.confirmPassword">
        <b-form-input type="text" v-model="user.confirmPassword" required />
      </b-form-group>
      <b-btn @click.prevent="handleSubmit" variant="primary">{{ language.signup }}</b-btn>
    </b-form>
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
        }).catch(err => {
          this.error = err.body.error
        })
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
  width: 300px;
}
button {
  width: 100%;
}
</style>
