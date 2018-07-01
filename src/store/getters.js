export default {
  contactItems: state => {
    return state.contactItems
  },
  selectedContactItem: state => {
    return state.contactItems.find(item => item.id === state.contentControls.selectedItemId)
  },
  selectedContact: state => {
    return state.contacts.find(contact => contact._id === state.contentControls.selectedContactId)
  }
}
