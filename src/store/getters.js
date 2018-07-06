export default {
  items: state => {
    return state.items
  },
  selectedItem: state => {
    return state.items.find(item => item._id === state.contentControls.selectedItemId)
  },
  selectedContact: state => {
    return state.contacts.find(contact => contact._id === state.contentControls.selectedContactId)
  },
  editContact: state => {
    return state.contacts.find(contact => contact._id === state.contentControls.editContactId)
  }
}
