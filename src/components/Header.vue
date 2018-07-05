<template>
  <div class="header">
    <div class="left">
      <router-link to="/">
        <h1>{{ language.appTitle }}</h1>
        <h5>by {{ language.us }}</h5>
      </router-link>
    </div>
    <div class="right user-icon" v-if="isAuthenticated">
      <div>
        <b-dropdown variant="link" size="lg" offset="-100" no-caret>
          <template slot="button-content">
            <font-awesome-icon icon="user"  class="pointer fa-2x right" />
          </template>
          <b-dropdown-item-button><router-link to="/profile">Profile</router-link></b-dropdown-item-button>
          <b-dropdown-item-button @click="signOut">Sign-out</b-dropdown-item-button>
        </b-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    language () {
      return this.$store.state.language.header
    },
    user () {
      return this.$store.state.user
    },
    isAuthenticated () {
      return this.$store.state.isAuthenticated
    }
  },
  methods: {
    signOut () {
      this.$store.commit('SIGN_OUT')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
h1, h5 {
  margin: 0;
}
.right {
  margin-right: 10px;
}
.user-icon a {
  color: black;
  text-decoration: none;
}
</style>
