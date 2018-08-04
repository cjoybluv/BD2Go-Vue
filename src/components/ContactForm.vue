<template>
  <b-form v-if="editContact" id="contact-form">
    <b-form-group :label="language.nameLabel">
      <b-input-group>
        <b-form-input
          v-model="editContact.name"
          :placeholder="language.namePlaceholder"
          :autofocus="true"
          required/>
        <b-form-select v-model="editContact.pronoun" :options="pronouns">
          <template slot="first">
            <option value="null">Select pronoun</option>
          </template>
        </b-form-select>
      </b-input-group>
    </b-form-group>
    <b-form-group
      :label="language.emailLabel">
      <b-form-input v-model="editContact.email" :placeholder="language.emailPlaceholder"/>
    </b-form-group>

    <b-form-group :label="language.addPhoneLabel">
      <b-input-group>
        <b-form-input v-model="phoneForm.phoneNumber" :placeholder="language.phoneNumberPlaceholder" size="sm"/>
        <b-form-input v-model="phoneForm.phoneLabel" :placeholder="language.phoneLabelPlaceholder" size="sm"/>
        <b-btn @click="addPhone" slot="append" variant="info">{{language.add}}</b-btn>
      </b-input-group>
      <b-table
        v-if="editContact.phones && editContact.phones.length"
        striped hover
        :items="editContact.phones"
        :fields="phoneTableFields">
      </b-table>
    </b-form-group>

    <b-form-group>
      <h5>
        {{ language.addLocationLabel }}
        <font-awesome-icon icon="plus" @click="locationAdded" class="icon-right"/>
      </h5>

      <b-collapse class="mt-2" v-model="editLocation" id="collapse4">
        <b-card>
          <location-form :onSubmit="locationSubmitted" includeLabel />
        </b-card>
      </b-collapse>
      <b-table
        v-if="editContact.locations && editContact.locations.length"
        striped hover
        :items="editContact.locations">
      </b-table>
    </b-form-group>

    <b-form-group id="addRelationship-subForm" :label="language.addRelationshipLabel">
      <b-input-group>
        <b-form-input
          class="contact-name"
          v-model="relationshipForm.targetContact"
          :placeholder="language.targetContactPlaceholder"
          size="sm"/>
        <b-form-input
          v-model="relationshipForm.targetLabel"
          :placeholder="language.targetLabelPlaceholder"
          size="sm"/>
        <b-form-input
          v-model="relationshipForm.hostLabel"
          :placeholder="language.hostLabelPlaceholder"
          size="sm"/>
        <b-btn @click="addRelationship" variant="info">{{language.add}}</b-btn>
      </b-input-group>
      <b-table
        v-if="editContact.relationships && editContact.relationships.length"
        striped hover
        :items="editContact.relationships"
        :fields="relationshipTableFields">
      </b-table>
    </b-form-group>

    <b-btn class="float-right" variant="primary" @click="submitForm">{{language.submit}}</b-btn>
  </b-form>
</template>

<script>
import { mapActions } from 'Vuex'
import locationForm from './LocationForm.vue'
import { NEW_LOCATION_REQUEST } from '../store/mutation-types'

export default {
  components: {
    'location-form': locationForm
  },
  computed: {
    contacts () {
      return this.$store.state.contacts
    },
    user () {
      return this.$store.state.user
    },
    language () {
      return this.$store.state.language.contactForm
    },
    me () {
      return this.$store.state.me
    },
    editContact () {
      return this.$store.state.contentControls.editContact
    }
  },
  data () {
    return {
      editLocation: false,
      phoneForm: {
        phoneLabel: '',
        phoneNumber: ''
      },
      location: {
        name: '',
        label: '',
        street: '',
        city: '',
        st: '',
        zip: ''
      },
      locationForm: {
        locationName: '',
        locationLabel: ''
      },
      relationshipForm: {
        hostLabel: '',
        targetContact: '',
        targetLabel: ''
      },
      pronouns: [
        { value: 'm', text: 'Male' },
        { value: 'f', text: 'Female' },
        { value: 'o', text: 'Other' }
      ],
      phoneTableFields: [
        {
          key: 'phoneLabel',
          label: 'Label'
        },
        {
          key: 'phoneNumber',
          label: 'Number'
        }
      ],
      relationshipTableFields: [
        { key: 'targetContactId', label: 'Contact' },
        { key: 'targetLabel', label: 'is' },
        { key: 'hostLabel', label: 'to this' }
      ]
    }
  },
  props: {
    onSubmit: {
      type: Function,
      required: true
    }
  },
  methods: {
    addPhone () {
      if (!this.phoneForm.phoneLabel || !this.phoneForm.phoneNumber) return
      const phone = { ...this.phoneForm }
      this.editContact.phones.push(phone)
      this.phoneForm.phoneLabel = ''
      this.phoneForm.phoneNumber = ''
    },
    addRelationship () {
      if (!this.relationshipForm.hostLabel || !this.relationshipForm.targetContact) return
      const relationship = { ...this.relationshipForm }
      let relatedContact
      if (relationship.targetContact === '@me') {
        relatedContact = this.me
      } else {
        relatedContact = this.contacts.find(contact => {
          return contact.name.includes(relationship.targetContact)
        })
      }
      if (relatedContact) {
        this.editContact.relationships.push(
          {
            hostLabel: relationship.hostLabel,
            targetContactId: relatedContact._id,
            targetLabel: relationship.targetLabel
          }
        )
        this.relationshipForm.hostLabel = ''
        this.relationshipForm.targetContact = ''
        this.relationshipForm.targetLabel = ''
      }
    },
    clearForm () {
      this.phoneForm = {
        phoneLabel: '',
        phoneNumber: ''
      }
      this.relationshipForm = {
        hostLabel: '',
        targetContact: null,
        targetLabel: ''
      }
    },
    locationAdded () {
      this.editLocation = true
      this.$store.commit(NEW_LOCATION_REQUEST, { ...this.location })
    },
    locationSubmitted (location) {
      const locationLabel = location.label
      delete location.label
      location.ownerId = this.user._id
      this.addLocation(location).then(location => {
        console.log('locationSubmmitted', location)
        this.editContact.locations.push({
          locationId: location.body._id,
          locationLabel
        })
        this.editLocation = false
      })
    },
    submitForm () {
      if (!this.editContact.name) return
      this.editContact.ownerId = this.user._id
      console.log('submitForm', this.editContact)
      this.onSubmit(this.editContact)
      this.clearForm()
      this.editLocation = false
    },
    ...mapActions([
      'addLocation'
    ])
  }
}
</script>

<style>
form {
  margin: 0 10px;
}
legend {
  padding-bottom: 0;
}
input {
  height: 38px;
  align-self: flex-end;
}
#addRelationship-subForm .contact-name {
  width: 40%;
}
#contact-form select {
  max-width: 20%;
}
.icon-right {
  cursor: pointer;
  float: right !important;
  margin: 0 10px 10px 0;
}
</style>
