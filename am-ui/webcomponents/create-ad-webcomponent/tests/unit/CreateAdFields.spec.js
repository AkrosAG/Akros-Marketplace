import CreateAdFields from '@/components/CreateAdFields.vue';
import { shallowMount } from '@vue/test-utils';

jest.mock('./../../src/components/useI18n', () => ({
  useI18n: () => ({ t: (key) => key })
}));

describe('CreateAdFields.vue', () => {
  it('should show an error when <title / address> has no value', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'title' }]
      }
    });
    wrapper.vm.fieldValues[0] = '';
    wrapper.vm.checkField(0, 'title');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('should show an error when <title / address> has a value length greater than 50', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'address' }]
      }
    });
    wrapper.vm.fieldValues[0] =
      'test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test ';
    wrapper.vm.checkField(0, 'address');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('should show no error for <title / address> when the value is valid', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'title' }]
      }
    });
    wrapper.vm.fieldValues[0] = 'test';
    wrapper.vm.checkField(0, 'title');
    expect(wrapper.vm.formHasErrors).toBeFalsy();
  });

  it('should show an error when <region> has error with numeric value', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'region' }]
      }
    });
    wrapper.vm.fieldValues[0] = 't2';
    wrapper.vm.checkField(0, 'region');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('should show an error when <region> has a value length greater than 50', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'region' }]
      }
    });
    wrapper.vm.fieldValues[0] =
      'test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test ';
    wrapper.vm.checkField(0, 'region');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('should show no error for <region> when value is valid', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'region' }]
      }
    });
    wrapper.vm.fieldValues[0] = 'test';
    wrapper.vm.checkField(0, 'region');
    expect(wrapper.vm.formHasErrors).toBeFalsy();
  });

  it('should show an error for <expectations / description / about> when no value is given', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'expectations' }]
      }
    });
    wrapper.vm.fieldValues[0] = '';
    wrapper.vm.checkField(0, 'expectations');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('should show no error for <expectations / description / about> when value is valid', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'description' }]
      }
    });
    wrapper.vm.fieldValues[0] = 'test';
    wrapper.vm.checkField(0, 'description');
    expect(wrapper.vm.formHasErrors).toBeFalsy();
  });

  it('should show an error for <email> when no e-mail adress was given', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'email' }]
      }
    });
    wrapper.vm.fieldValues[0] = '';
    wrapper.vm.checkField(0, 'email');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('should show an error for <email> when given value is not an e-mail', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'email' }]
      }
    });
    wrapper.vm.fieldValues[0] = 'test';
    wrapper.vm.checkField(0, 'email');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('should show no error for <email> when a proper e-mail adress is provided', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'email' }]
      }
    });
    wrapper.vm.fieldValues[0] = 'test@email.com';
    wrapper.vm.checkField(0, 'email');
    expect(wrapper.vm.formHasErrors).toBeFalsy();
  });

  it('should show an error for <rooms / type> when no value was given', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'rooms' }]
      }
    });
    wrapper.vm.fieldValues[0] = null;
    wrapper.vm.checkField(0, 'rooms');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('should show no error for <rooms / type> when value is valid', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'type' }]
      }
    });
    wrapper.vm.fieldValues[0] = 'test';
    wrapper.vm.checkField(0, 'type');
    expect(wrapper.vm.formHasErrors).toBeFalsy();
  });

  it('should show an error for <phone> when no value was given', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'phone' }]
      }
    });
    wrapper.vm.fieldValues[0] = null;
    wrapper.vm.checkField(0, 'phone');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('should show an error for <phone> when letters are put into the field', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'phone' }]
      }
    });
    wrapper.vm.fieldValues[0] = 'test';
    wrapper.vm.checkField(0, 'phone');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('should show no error for <phone> when numeric value is given', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'phone' }]
      }
    });
    wrapper.vm.fieldValues[0] = '123456789';
    wrapper.vm.checkField(0, 'phone');
    expect(wrapper.vm.formHasErrors).toBeFalsy();
  });

  it('should show an error for <postalCode> when no value was given', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'postalCode' }]
      }
    });
    wrapper.vm.fieldValues[0] = null;
    wrapper.vm.checkField(0, 'postalCode');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('show an error for <postalCode> when letters are provided', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'postalCode' }]
      }
    });
    wrapper.vm.fieldValues[0] = 'test';
    wrapper.vm.checkField(0, 'postalCode');
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('show no errors for <postalCode> when value is numeric', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'postalCode' }]
      }
    });
    wrapper.vm.fieldValues[0] = '1234';
    wrapper.vm.checkField(0, 'postalCode');
    expect(wrapper.vm.formHasErrors).toBeFalsy();
  });

  it('should set form as invalid on submit when there is a required field without value', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'title', required: true }]
      }
    });
    wrapper.vm.fieldValues[0] = '';
    wrapper.vm.submit();
    expect(wrapper.vm.formHasErrors).toBeTruthy();
  });

  it('should disable the date field when specific date is not chosen in the dropdown', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [
          { field_id: 0, key: 'availability' },
          { field_id: 1, key: 'date' }
        ]
      }
    });
    wrapper.vm.fieldValues[0] = 'now';
    wrapper.vm.checkField(0, 'availability');
    expect(wrapper.vm.hasSpecificDate).toBe(false);

    wrapper.vm.fieldValues[0] = 'agreement';
    wrapper.vm.checkField(0, 'availability');
    expect(wrapper.vm.hasSpecificDate).toBe(false);
  });

  it('should set the date to current date when option now is chosen in availability', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [
          { field_id: 0, key: 'availability' },
          { field_id: 1, key: 'date' }
        ]
      }
    });
    wrapper.vm.fieldValues[0] = 'now';
    wrapper.vm.checkField(0, 'availability');
    expect(wrapper.vm.fieldValues[1]).not.toBe('');
  });

  it('should enable the date field when specific date is chosen', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [
          { field_id: 0, key: 'availability' },
          { field_id: 1, key: 'date' }
        ]
      }
    });
    wrapper.vm.fieldValues[0] = 'date';
    wrapper.vm.checkField(0, 'availability');
    expect(wrapper.vm.hasSpecificDate).toBe(true);
  });

  it('should emit on submit if no errors are found', () => {
    const wrapper = shallowMount(CreateAdFields, {
      propsData: {
        fieldsToShow: [{ field_id: 0, key: 'title' }]
      }
    });
    wrapper.vm.fieldValues[0] = 'test';
    wrapper.vm.submit();
    expect(wrapper.emitted().submit).toBeTruthy();
  });
});
