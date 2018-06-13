import { mount } from '@vue/test-utils'
import Panel from '@/components/Panel'

describe('Panel', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(Panel)

  console.log('panel', wrapper.html())

  it('renders a panel', () => {
    expect(wrapper.html()).toContain('<div class="panel"')
  })
})
