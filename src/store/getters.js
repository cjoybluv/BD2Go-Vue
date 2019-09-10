export default {
  displayItems: state => {
    const result = state.items.map(item => {
      return {
        displayDate: item.dates.length ? item.dates[0].date : null,
        ...item
      }
    })
    return result
  },
  editContact: state => {
    return state.contacts.find(contact => contact._id === state.contentControls.editContactId)
  },
  selectedContact: state => {
    return state.contacts.find(contact => contact._id === state.contentControls.selectedContactId)
  },
  selectedItem: state => {
    return state.items.find(item => item._id === state.contentControls.selectedItemId)
  }
}
