import CreateAdFields from '@/components/CreateAdFields.vue';
import {shallowMount} from '@vue/test-utils';

jest.mock('./../../src/components/useI18n', () => ({
  useI18n: () => ({t: key => key}),
}));

describe('CreateAdFields.vue', () => {
  it('Check field <title / address> has error with no value', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{field_id: 0, key: 'title'}],
      },
    });
    wrapper.vm.fieldValues[0] = '';
    wrapper.vm.checkField(0, 'title');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('Check field <title / address> has error with value length greater than 50', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{field_id: 0, key: 'address'}],
      },
    });
    wrapper.vm.fieldValues[0] =
      'test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test ';
    wrapper.vm.checkField(0, 'address');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('Check field <title / address> has no error with allowed value', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{field_id: 0, key: 'title'}],
      },
    });
    wrapper.vm.fieldValues[0] = 'test';
    wrapper.vm.checkField(0, 'title');
    expect(wrapper.vm.formHasErrors).toBeFalsy();
  });

  it('Check field <region> has error with numeric value', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{field_id: 0, key: 'region'}],
      },
    });
    wrapper.vm.fieldValues[0] =
      't2';
    wrapper.vm.checkField(0, 'region');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('Check field <region> has error with value length greater than 50', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{field_id: 0, key: 'region'}],
      },
    });
    wrapper.vm.fieldValues[0] =
      'test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test ';
    wrapper.vm.checkField(0, 'region');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('Check field <region> has no error with allowed value', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{field_id: 0, key: 'region'}],
      },
    });
    wrapper.vm.fieldValues[0] = 'test';
    wrapper.vm.checkField(0, 'region');
    expect(wrapper.vm.formHasErrors).toBeFalsy();
  });

  it('Check field <expectations / description / about> has error with no value', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{field_id: 0, key: 'expectations'}],
      },
    });
    wrapper.vm.fieldValues[0] = '';
    wrapper.vm.checkField(0, 'expectations');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('Check field <expectations / description / about> has no error with allowed value', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{field_id: 0, key: 'description'}],
      },
    });
    wrapper.vm.fieldValues[0] = 'test';
    wrapper.vm.checkField(0, 'description');
    expect(wrapper.vm.formHasErrors).toBeFalsy();
  });

  it('Check field <email> has error with no value', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{field_id: 0, key: 'email'}],
      },
    });
    wrapper.vm.fieldValues[0] = '';
    wrapper.vm.checkField(0, 'email');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('Check field <email> has error with incorrect value', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{field_id: 0, key: 'email'}],
      },
    });
    wrapper.vm.fieldValues[0] = 'test';
    wrapper.vm.checkField(0, 'email');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('Check field <email> has no error with allowed value', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{field_id: 0, key: 'email'}],
      },
    });
    wrapper.vm.fieldValues[0] = 'test@email.com';
    wrapper.vm.checkField(0, 'email');
    expect(wrapper.vm.formHasErrors).toBeFalsy();
  });

  it('Check field <rooms / type> has error with no value', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{field_id: 0, key: 'rooms'}],
      },
    });
    wrapper.vm.fieldValues[0] = null;
    wrapper.vm.checkField(0, 'rooms');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('Check field <rooms / type> has no error with allowed value', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{field_id: 0, key: 'type'}],
      },
    });
    wrapper.vm.fieldValues[0] = 'test';
    wrapper.vm.checkField(0, 'type');
    expect(wrapper.vm.formHasErrors).toBeFalsy();
  });

  it('Check field <phone> has error with no value', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{field_id: 0, key: 'phone'}],
      },
    });
    wrapper.vm.fieldValues[0] = null;
    wrapper.vm.checkField(0, 'phone');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('Check field <phone> has error with incorrect value', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{field_id: 0, key: 'phone'}],
      },
    });
    wrapper.vm.fieldValues[0] = 'test';
    wrapper.vm.checkField(0, 'phone');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('Check field <phone> has no error with allowed value', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{field_id: 0, key: 'phone'}],
      },
    });
    wrapper.vm.fieldValues[0] = '123456789';
    wrapper.vm.checkField(0, 'phone');
    expect(wrapper.vm.formHasErrors).toBeFalsy();
  });

  it('Check field <postalCode> has error with no value', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{field_id: 0, key: 'postalCode'}],
      },
    });
    wrapper.vm.fieldValues[0] = null;
    wrapper.vm.checkField(0, 'postalCode');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('Check field <postalCode> has error with incorrect value', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{field_id: 0, key: 'postalCode'}],
      },
    });
    wrapper.vm.fieldValues[0] = 'test';
    wrapper.vm.checkField(0, 'postalCode');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('Check field <postalCode> has no error with allowed value', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{field_id: 0, key: 'postalCode'}],
      },
    });
    wrapper.vm.fieldValues[0] = '1234';
    wrapper.vm.checkField(0, 'postalCode');
    expect(wrapper.vm.formHasErrors).toBeFalsy();
  });
});
