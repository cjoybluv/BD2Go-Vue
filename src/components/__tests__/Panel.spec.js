import { shallowMount } from '@vue/test-utils'
import Panel from '@/components/Panel'

describe('Panel', () => {
  const wrapper = shallowMount(Panel)
  test('renders a panel', () => {
    expect(wrapper.html()).toContain('<div class="panel"')
  })

  test('renders slot content', () => {
    const wrapper = shallowMount(Panel, {
      slots: {
        default: '<span />'
      }
    })
    expect(wrapper.find('span').exists()).toBeTruthy()
  })
})
