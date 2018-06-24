import getters from '../getters'

describe('getters', () => {
  test('contactItems returns state.contactItems', () => {
    const state = {
      contactItems: [
        {id: 1},
        {id: 2}
      ]
    }
    const result = getters.contactItems(state)
    expect(result.length).toEqual(2)
    result.forEach((contact, i) => {
      expect(contact).toEqual(state.contactItems[i])
    })
  })

  test('selectedContactItem returns Item for selectedItemId', () => {
    const state = {
      contactItems: [
        {id: 1},
        {id: 2}
      ],
      contentControls: { selectedItemId: 2 }
    }
    const result = getters.selectedContactItem(state)
    expect(result).toBe(state.contactItems[1])
  })

  test('selectedContact returns Item for selectedItemId', () => {
    const state = {
      contacts: [
        {id: 11},
        {id: 12}
      ],
      contentControls: { selectedContactId: 12 }
    }
    const result = getters.selectedContact(state)
    expect(result).toBe(state.contacts[1])
  })
})
