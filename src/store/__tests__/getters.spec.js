import getters from '../getters'

describe('getters', () => {
  test('items returns state.items', () => {
    const state = {
      items: [
        {id: 1},
        {id: 2}
      ]
    }
    const result = getters.items(state)
    expect(result.length).toEqual(2)
    result.forEach((contact, i) => {
      expect(contact).toEqual(state.items[i])
    })
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
})
