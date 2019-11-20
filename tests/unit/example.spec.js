import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', async () => {
    // const mockFn = jest.fn();
    const wrapper = shallowMount(HelloWorld, {
      stubs: ['v-container', 'v-layout', 'v-flex', 'v-img']
    });
    wrapper.setData({
      userName: 'admin',
      passWord: '2222'
    });
    wrapper.find('button');
    console.log(wrapper.html());
    // .trigger('click');
    // expect(mockFn).toBeCalled();
    expect(wrapper.html());
  });
});
