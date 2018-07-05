<template>
  <section id="home">
    <section id="main">
      <panel>
          <item-display></item-display>
      </panel>
      <panel>
          <contact-display></contact-display>
      </panel>
      <panel>
          <location-display></location-display>
      </panel>
    </section>
    <section id="viewer">
      <viewer>
        <item v-if="selectedItem"></item>
        <contact v-if="selectedContact"></contact>
      </viewer>
    </section>
  </section>
</template>

<script>
import { mapGetters } from 'Vuex'

import panel from '../components/Panel.vue'
import itemDisplay from '../components/ItemDisplay.vue'
import contactDisplay from '../components/ContactDisplay.vue'
import locationDisplay from '../components/LocationDisplay.vue'
import viewer from '../components/Viewer.vue'
import item from '../components/Item.vue'
import contact from '../components/Contact.vue'

export default {
  name: 'Home',
  components: {
    'panel': panel,
    'item-display': itemDisplay,
    'contact-display': contactDisplay,
    'location-display': locationDisplay,
    'viewer': viewer,
    'item': item,
    'contact': contact
  },
  computed: {
    ...mapGetters([
      'selectedItem',
      'selectedContact'
    ])
  }
}
</script>

<style>
#main {
  display: flex;
  flex-wrap: wrap;
}
.soft-text {
  color: rgba(0, 0, 0, 0.4);
}
.content-100 {
  max-height: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
