import getters from '../getters'

describe('getters', () => {
  test('displayItems: if present, makes dates[0] displayDate', () => {
    const state = {
      items: [
        { subject: 'no dates', dates: [] },
        { subject: 'dates', dates: [ { date: 'today' }, { date: 'yesterday' } ] }
      ]
    }
    const result = getters.displayItems(state)

    expect(result).toEqual([
      { subject: 'no dates', dates: [], displayDate: null },
      { subject: 'dates', dates: [ { date: 'today' }, { date: 'yesterday' } ], displayDate: 'today' }
    ])
  })
  test('editContact: return contact to edit', () => {
    // return state.contacts.find(contact => contact._id === state.contentControls.editContactId)
    const state = {
      contacts: [
        { _id: '123', name: 'Al' },
        { _id: '456', name: 'Bob' },
        { _id: '789', name: 'Carol' }
      ],
      contentControls: {
        editContactId: '456'
      }
    }
    const result = getters.editContact(state)

    expect(result).toEqual({ _id: '456', name: 'Bob' })
  })
  test('selectedContact returns Contact for selectedContactId', () => {
    const state = {
      contacts: [
        {_id: 11},
        {_id: 12}
      ],
      contentControls: { selectedContactId: 12 }
    }
    const result = getters.selectedContact(state)
    expect(result).toBe(state.contacts[1])
  })
  test('selectedItem returns Item for selectedItemId', () => {
    const state = {
      items: [
        {_id: 1},
        {_id: 2}
      ],
      contentControls: { selectedItemId: 2 }
    }
    const result = getters.selectedItem(state)
    expect(result).toBe(state.items[1])
  })
})
