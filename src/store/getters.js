export default {
  displayItems: state => {
    const result = state.items.map(item => {
      return {
        displayDate: item.dates.length && item.dates[0].date,
        ...item
      }
    })
    return result
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
