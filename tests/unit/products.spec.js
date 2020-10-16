import { shallowMount, mount } from '@vue/test-utils'
import flushPromises from "flush-promises";
import Products from '@/components/Products.vue'
import axios from 'axios';
import data from '../mocks/response.json';
 
jest.mock('axios');

describe('Products.vue', () => {
  let wrapper;
  beforeEach(async() => {
    axios.get.mockImplementation(() => Promise.resolve({
      data: data
    }));
    wrapper = shallowMount(Products);
    await flushPromises();
  })
  it('renders products', () => {
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.products.length).toBe(10);
    });
  });
  describe('openModal', () => {
    it('should set value for images', () => {
      expect(wrapper.vm.showModal).toBe(false);
      wrapper.vm.openModal(data.groups[0]);
      expect(wrapper.vm.images.length).toBe(1);
      expect(wrapper.vm.showModal).toBe(true);
    });

    it('should set value for images', () => {
      expect(wrapper.vm.showModal).toBe(false);
      wrapper.vm.openModal(data.groups[0]);
      expect(wrapper.vm.images.length).toBe(1);
      expect(wrapper.vm.showModal).toBe(true);
    });
  });
})
