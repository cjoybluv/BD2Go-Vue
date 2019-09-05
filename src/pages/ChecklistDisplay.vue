<template>
  <div id="checklists">
    <h1>{{ language.title }}</h1>

    <section id="main">
      <panel>
          <!-- <folder-display :displayArray="folderArray" :itemClickHandler="openFolderItem"></folder-display> -->
          <md-list>
            <md-list-item
              v-for="rootItem in folderArray"
              :key="rootItem.key"
              :md-expand.sync="rootItem.folder">
              <span class="md-list-item-text"
                @click="openFolderItem(rootItem)">
                {{ rootItem.title }}
              </span>

              <md-list slot="md-expand">
                <md-list-item
                  v-for="item in rootItem.items"
                  :key="item._id">
                  <span class="md-list-item-text"
                    @click="openFolderItem(item)">
                    {{ item.title }}
                  </span>
                </md-list-item>
              </md-list>
            </md-list-item>
          </md-list>

      </panel>
      <panel>
          <checklist></checklist>
      </panel>
      <panel>
          detail panel here
      </panel>
    </section>

    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import checklist from '../components/Checklist'
import panel from '../components/Panel'

export default {
  name: 'ChecklistDisplay',
  components: {
    checklist,
    panel
  },
  data () {
    return {
      error: '',
      user: {
        username: '',
        email: ''
      },
      submitted: false,
      folderArray: [
        {
          key: '1',
          title: 'KAYAK',
          folder: true,
          items: [
            {
              _id: '5d672266f130b48a9e862103',
              title: 'Load the Car'
            },
            {
              _id: '5d67402f946a6abba5d24f93',
              title: 'Unload the Car',
              items: [
                {
                  key: 1,
                  subject: 'Master of what'
                }
              ]
            },
            {
              _id: '5d698b5d40d938e28738fe64',
              title: 'Launch'
            }
          ]
        },
        {
          key: '2',
          title: 'SKI',
          folder: true,
          items: []
        },
        {
          key: '3',
          title: 'Dave',
          folder: false,
          _rec: {
            _id: '5d69a37240d938e28738fe84',
            title: 'Dave',
            items: [
              {
                key: 1,
                subject: 'Master of nothing'
              }
            ]
          },
          items: []
        }
      ]
    }
  },
  computed: {
    language () {
      return this.$store.state.language.checklists
    },
    checklists () {
      return this.$store.state.checklists
    },
    currentUser () {
      return this.$store.state.user
    },
    me () {
      return this.$store.state.me
    }
  },
  methods: {
    openFolderItem (item) {
      if (item._rec) {
        this.$store.commit('EDIT_CHECKLIST', item._rec)
      } else {
        this.$store.commit('EDIT_CHECKLIST', item)
      }
    }
  }
}
</script>

<style>
#main {
  display: flex;
  flex-wrap: wrap;
}
panel {
  min-width: 400px;
}
#checklists h1 {
  border-top: 1px solid black;
}
.md-field {
  min-height: 0;
  margin: 0;
  padding: 0;
}
</style>
