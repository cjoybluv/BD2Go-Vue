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
      <viewer><contact-item></contact-item></viewer>
    </section>
  </section>
</template>

<script>
import panel from './Panel.vue'
import contactItemDisplay from './ContactItemDisplay.vue'
import contactDisplay from './ContactDisplay.vue'
import locationDisplay from './LocationDisplay.vue'
import viewer from './Viewer.vue'
import contactItem from './ContactItem.vue'

export default {
  name: 'Home',
  components: {
    'panel': panel,
    'contact-item-display': contactItemDisplay,
    'contact-display': contactDisplay,
    'location-display': locationDisplay,
    'viewer': viewer,
    'contact-item': contactItem
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
