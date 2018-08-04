<template>
  <div id="location-display">
    <div class="header">
      <h2>{{ language.title }}</h2>
      <font-awesome-icon icon="plus" @click="openLocationForm" class="pointer"/>
    </div>
    <ul>
      <li v-for="location in locations"
        :key="JSON.stringify(location)">
        <h4>
          {{ location.name }}
        </h4>
        <p>{{ location.street }}, {{ location.city }} {{ location.st }} {{ location.zip }}</p>
      </li>
    </ul>

     <b-modal
      id="addLocationForm"
      size="lg"
      hide-footer
      ref="addLocationForm"
      title="Create New Location">
      <location-form :onSubmit="locationAdded" />
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import locationForm from './LocationForm.vue'
import {
  NEW_LOCATION_REQUEST
} from '../store/mutation-types'

export default {
  name: 'LocationDislay',
  components: {
    'location-form': locationForm
  },
  computed: {
    locations () {
      return this.$store.state.locations
    },
    language () {
      return this.$store.state.language.locationDisplay
    },
    ownerId () {
      return this.$store.state.user && this.$store.state.user._id
    }
  },
  data () {
    return {
      location: {
        ownerId: this.$store.state.user._id,
        name: '',
        street: '',
        city: '',
        st: '',
        zip: ''
      }
    }
  },
  methods: {
    locationAdded (location) {
      this.addLocation(location)
      this.$refs.addLocationForm.hide()
    },
    openLocationForm () {
      this.$store.commit(NEW_LOCATION_REQUEST, this.location)
      this.$refs.addLocationForm.show()
    },
    ...mapActions([
      'addLocation'
    ])
  }
}

</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.header svg {
  margin-right: 15px;
}
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
