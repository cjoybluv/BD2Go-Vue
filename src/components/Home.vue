<template>
  <section id="home">
    <section id="main">
      <panel>
          <contact-item-display></contact-item-display>
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
        <contact-item v-if="selectedContactItem"></contact-item>
        <contact v-if="selectedContact"></contact>
      </viewer>
    </section>
  </section>
</template>

<script>
import { mapGetters } from 'Vuex'

import panel from './Panel.vue'
import contactItemDisplay from './ContactItemDisplay.vue'
import contactDisplay from './ContactDisplay.vue'
import locationDisplay from './LocationDisplay.vue'
import viewer from './Viewer.vue'
import contactItem from './ContactItem.vue'
import contact from './Contact.vue'

export default {
  name: 'Home',
  components: {
    'panel': panel,
    'contact-item-display': contactItemDisplay,
    'contact-display': contactDisplay,
    'location-display': locationDisplay,
    'viewer': viewer,
    'contact-item': contactItem,
    'contact': contact
  },
  computed: {
    ...mapGetters([
      'selectedContactItem',
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
