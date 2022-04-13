import {mount} from '@vue/test-utils';
import CreateAd from '@/components/CreateAd.ce.vue';
import {createI18n} from 'vue-i18n';
// jest.mock('./../../src/components/useI18n');
// jest.mock('vue-i18n');

describe('CreateAd.vue', () => {
  it('renders correctly', () => {
    const i18n = createI18n({useScope: 'global', legacy: false});
    const wrapper = mount(CreateAd, {
      global: {
        plugins: [i18n],
      },
    });
    expect(wrapper.vm.t).toBeTruthy();
  });

  it('Shows ad fields when category has been selected and it contains fields', () => {
    const i18n = createI18n({useScope: 'global', legacy: false});
    const wrapper = mount(CreateAd, {
      global: {
        plugins: [i18n],
      },
    });
    wrapper.vm.selectedCategoryKey = 'accomodation';
    wrapper.vm.selectedCategory = {
      category_id: '1',
      key: 'accomodation',
      fields: [{field_option_id: 6, key: 'house', sort_number: 3}],
    };
    wrapper.vm.categories = [{
      category_id: '1',
      key: 'accomodation',
      fields: [{field_option_id: 6, key: 'house', sort_number: 3}],
    }];

    wrapper.vm.updateFields();
    expect(wrapper.vm.showAdFields).toBeTruthy();
  });

  it('Does not show ad fields when category has been selected but doesnt contains fields', () => {
    const i18n = createI18n({useScope: 'global', legacy: false});
    const wrapper = mount(CreateAd, {
      global: {
        plugins: [i18n],
      },
    });
    wrapper.vm.selectedCategoryKey = 'accomodation';
    wrapper.vm.selectedCategory = {
      category_id: '1',
      key: 'accomodation'
    };
    wrapper.vm.categories = [{
      category_id: '1',
      key: 'accomodation'
    }];

    wrapper.vm.updateFields();
    expect(wrapper.vm.showAdFields).toBeFalsy();
  });
  it('Does not show ad fields when category has not been selected', () => {
    const i18n = createI18n({useScope: 'global', legacy: false});
    const wrapper = mount(CreateAd, {
      global: {
        plugins: [i18n],
      },
    });
    wrapper.vm.selectedCategoryKey = null;
    wrapper.vm.selectedCategory = null;
    wrapper.vm.categories = [{
      category_id: '1',
      key: 'accomodation'
    }];

    wrapper.vm.updateFields();
    expect(wrapper.vm.showAdFields).toBeFalsy();
  });
});
