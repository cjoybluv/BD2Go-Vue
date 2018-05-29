<template>
  <section id="home">
    <section id="main">
      <panel>
          <when-what></when-what>
      </panel>
      <panel>
          <who></who>
      </panel>
      <panel>
          <where></where>
      </panel>
    </section>
    <section id="viewer">
      <viewer><contact-item></contact-item></viewer>
    </section>
  </section>
</template>

<script>
import panel from './Panel.vue'
import whenWhat from './WhenWhat.vue'
import who from './Who.vue'
import where from './Where.vue'
import viewer from './Viewer.vue'
import contactItem from './ContactItem.vue'

export default {
  name: 'Home',
  components: {
    'panel': panel,
    'when-what': whenWhat,
    'who': who,
    'where': where,
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
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
