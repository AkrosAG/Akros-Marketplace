import CreateAd from '@/components/CreateAd.ce.vue';
import {createI18n} from 'vue-i18n';
import {shallowMount} from '@vue/test-utils';

// jest.mock('./../../src/components/CreateAd.ce.vue', () => ({
//   getCategories: jest.fn()
// }));

describe('CreateAd.vue', () => {
  it('Shows ad fields when category and subcategory has been selected and subcategory contains fields', () => {
    const i18n = createI18n({legacy: false});
    const wrapper = shallowMount(CreateAd, {
      global: {
        plugins: [i18n],
      },
    });
    wrapper.vm.selectedCategoryKey = 'accomodation';
    wrapper.vm.selectedSubCategoryKey = 'room';
    wrapper.vm.categories = [
      {
        category_id: '1',
        key: 'accomodation',
        sub_categories: [
          {
            subcategory_id: 1,
            key: "room",
            fields: [{ field_option_id: 6, key: 'house', sort_number: 3 }]
          }
        ]
      },
    ];
    wrapper.vm.updateSubCategories();
    expect(wrapper.vm.showAdFields).toBeTruthy();
  });

  it('Does not show ad fields when category and subcategory has been selected and subcategory but doesnt contains fields', () => {
    const i18n = createI18n({legacy: false});
    const wrapper = shallowMount(CreateAd, {
      global: {
        plugins: [i18n],
      },
    });
    wrapper.vm.selectedCategoryKey = 'accomodation';
    wrapper.vm.selectedSubCategoryKey = 'room';
    wrapper.vm.categories = [
      {
        category_id: '1',
        key: 'accomodation',
        sub_categories: [
          {
            subcategory_id: 1,
            key: "room",
            fields: [],
          }
        ]
      },
    ];
    wrapper.vm.updateSubCategories();
    expect(wrapper.vm.showAdFields).toBeFalsy();
  });

  it('Does not show ad fields when category has not been selected', () => {
    const i18n = createI18n({legacy: false});
    const wrapper = shallowMount(CreateAd, {
      global: {
        plugins: [i18n],
      },
    });
    wrapper.vm.selectedCategoryKey = '';
    wrapper.vm.categories = [
      {
        category_id: '1',
        key: 'accomodation',
        sub_categories: [
          {
            subcategory_id: 1,
            key: "room",
            fields: [],
          }
        ]
      },
    ];

    wrapper.vm.updateSubCategories();
    expect(wrapper.vm.showAdFields).toBeFalsy();
  });

  // it('Calls method to show ad fields or not after retrieving categories', () => {
  //   const i18n = createI18n({legacy: false});
  //   const wrapper = shallowMount(CreateAd, {
  //     global: {
  //       plugins: [i18n],
  //     },
  //   });

  //   jest.spyOn(wrapper.vm, 'getCategories').mockImplementation(() => []);
  //   const spy = jest.spyOn(wrapper.vm, 'updateFields').mockImplementation(() => {});

  //   wrapper.vm.getCategories();
  //   expect(spy).toHaveBeenCalled();
  // });
});
