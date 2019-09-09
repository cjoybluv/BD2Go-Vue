import { shallowMount } from '@vue/test-utils'
import ContactDisplay from '../ContactDisplay.vue'
import Contact from '../Contact.vue'
import ItemDisplay from '../ItemDisplay.vue'
import Item from '../Item.vue'

describe('ContactDisplay.vue', () => {
  xtest('renders an Contact for each item in computed contacts', () => {
    window.items = [{}, {}, {}]
    const wrapper = shallowMount(ContactDisplay)
    expect(wrapper.findAll(Contact).length).toEqual(window.items.length)
  })

  xtest('passes an item object to each Item component', () => {
    window.items = [{}, {}, {}]
    const wrapper = shallowMount(ItemDisplay)
    const itemsArray = wrapper.findAll(Item)
    itemsArray.wrappers.forEach((wrapper, i) => {
      expect(wrapper.props().item).toBe(window.items[i])
    })
  })
})
