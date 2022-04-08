<template>
  <!-- eslint-disable -->
  <div v-for="field in fieldsToShow">
    <!-- Inputs Text input fields: full(1), half(2), third(3) -->
    <div
      class="form-field full"
      v-if="
        field.field_type_definition_id === 1 ||
        field.field_type_definition_id === 2 ||
        field.field_type_definition_id === 3
      "
      v-bind:class="{
        half: field.field_type_definition_id === 2,
        third: field.field_type_definition_id === 3,
      }"
    >
      <input
        v-bind:id="'create-add-field-' + field.field_id"
        type="text"
        v-bind:placeholder="t(`categories.${selectedCategory}.${field.key}`)"
        v-model="fieldValues[field.field_id]"
        v-bind:class="{
          error: errors[field.field_id],
        }"
        v-on:change="event => checkField(field.field_id)"
      />
    </div>

    <!-- Textarea(4) -->
    <div class="form-field full" v-if="field.field_type_definition_id === 4">
      <textarea
        v-bind:id="'create-add-field-' + field.field_id"
        type="text"
        v-bind:placeholder="t(`categories.${selectedCategory}.${field.key}`)"
        v-model="fieldValues[field.field_id]"
        v-on:change="event => checkField(field.field_id)"
        v-bind:class="{
          error: errors[field.field_id],
        }"
      />
    </div>

    <!-- Selector with received options full(5), half(6), third(7) -->
    <div
      class="form-field full"
      v-if="
        field.field_type_definition_id === 5 ||
        field.field_type_definition_id === 6 ||
        field.field_type_definition_id === 7
      "
      v-bind:class="{
        half: field.field_type_definition_id === 6,
        third: field.field_type_definition_id === 7,
        disabled: field.key === 'price_unit',
      }"
    >
      <select
        v-bind:id="'create-add-field-' + field.field_id"
        v-model="fieldValues[field.field_id]"
        v-bind:class="{
          error: errors[field.field_id],
        }"
        v-on:change="event => checkField(field.field_id)"
      >
        <option disabled value="">
          {{ t(`categories.${selectedCategory}.${field.key}.title`) }}
        </option>
        <option
          v-for="option in field.field_options"
          v-bind:value="option.field_option_id"
        >
          {{
            t(
              `categories.${selectedCategory}.${field.key}.options.${option.key}`
            )
          }}
        </option>
      </select>
    </div>

    <!-- Boolean checkbox(8,16) -->
    <div
      class="form-field checkbox half"
      v-if="
        field.field_type_definition_id === 8 ||
        field.field_type_definition_id === 16
      "
    >
      <input
        v-bind:id="'create-add-field-' + field.field_id"
        type="checkbox"
        v-bind:placeholder="t(`categories.${selectedCategory}.${field.key}`)"
        v-model="fieldValues[field.key]"
      />
      <label>{{ t(`categories.${selectedCategory}.${field.key}`) }}</label>
    </div>

    <!-- Input type email(9) -->
    <div class="form-field full" v-if="field.field_type_definition_id === 9">
      <input
        v-bind:id="'create-add-field-' + field.field_id"
        type="email"
        v-bind:placeholder="t(`categories.${selectedCategory}.${field.key}`)"
        v-model="fieldValues[field.field_id]"
        class="nocap"
        v-on:change="event => checkField(field.field_id)"
        v-bind:class="{
          error: errors[field.field_id],
        }"
      />
    </div>

    <!-- Input type phone(10) -->
    <div class="form-field full" v-if="field.field_type_definition_id === 10">
      <input
        v-bind:id="'create-add-field-' + field.field_id"
        type="tel"
        v-bind:placeholder="t(`categories.${selectedCategory}.${field.key}`)"
        v-model="fieldValues[field.field_id]"
        v-on:change="event => checkField(field.field_id)"
        v-bind:class="{
          error: errors[field.field_id],
        }"
      />
    </div>

    <!-- Input type file(11) -->
    <!-- //TODO app nor post ready for images -->
    <!-- <div class="form-field full" v-if="field.field_type_definition_id === 11">
      <input
        v-bind:id="'create-add-field-' + field.field_id"
        type="file"
        @change="uploadFiles"
        v-model="fieldValues[field.key]"
      />
    </div> -->

    <!-- Input type date half/full:(12), third(13) -->
    <div
      class="form-field half"
      v-if="
        field.field_type_definition_id === 12 ||
        field.field_type_definition_id === 13
      "
      v-bind:class="{
        third: field.field_type_definition_id === 13,
      }"
    >
      <input
        v-bind:id="'create-add-field-' + field.field_id"
        type="date"
        v-bind:placeholder="t(`categories.${selectedCategory}.${field.key}`)"
        v-model="fieldValues[field.field_id]"
        v-on:change="event => checkField(field.field_id)"
        v-bind:class="{
          error: errors[field.field_id],
        }"
      />
    </div>

    <!-- Selector counter half(14), full(15) -->
    <div
      class="form-field half"
      v-if="
        field.field_type_definition_id === 14 ||
        field.field_type_definition_id === 15
      "
      v-bind:class="{
        third: field.field_type_definition_id === 15,
      }"
    >
      <select
        v-bind:id="'create-add-field-' + field.field_id"
        v-model="fieldValues[field.field_id]"
        v-bind:class="{
          error: errors[field.field_id],
        }"
        v-on:change="event => checkField(field.field_id)"
      >
        <option disabled value="">
          {{ t(`categories.${selectedCategory}.${field.key}`) }}
        </option>
        <option v-for="option in counterOptions" v-bind:value="option">
          {{ option }}
        </option>
      </select>
    </div>
  </div>
  <p class="submit-row">
    <a
      class="btn"
      v-on:click="submit"
      v-bind:class="{
        disabled: formHasErrors,
      }"
      >{{ t('publish') }}</a
    >
  </p>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useI18n} from './useI18n';
import i18n from '../locales/i18n';

const props = defineProps({fieldsToShow: Array, selectedCategory: String});
const emit = defineEmits(['submit']);
const fieldValues = ref([]);
const fieldKeys = ref([]);
const errors = ref([]);
const counterOptions = ref([1, 2, 3, 4, 5, 6, 7, 8]);
const {t} = useI18n(i18n.global.messages.value);
const formHasErrors = ref([]);

function checkField(fieldId) {
  const emailPatternRegex = new RegExp(
    '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
  );
  const zipCodePatternRegex = new RegExp('[0-9]{4}');
  const numberPatternRegex = new RegExp('^[0-9]*$');
  const alphabeticPatternRegex = new RegExp('^((?![0-9]).)*$$');

  // Static specific validations based on AM categories (currently only accomodation), TODO improve
  switch (this.fieldKeys[fieldId]) {
    // Title, Address: max length 50, min length 1 chars
    case 'title':
    case 'address':
      if (
        this.fieldValues[fieldId].length > 50 ||
        this.fieldValues[fieldId].length < 1
      ) {
        this.errors[fieldId] = true;
      } else {
        this.errors[fieldId] = false;
      }
      break;
    // Region: max length 50, min length 1 chars and not numbers
    case 'region':
      if (
        this.fieldValues[fieldId].length > 50 ||
        this.fieldValues[fieldId].length < 1 ||
        !alphabeticPatternRegex.test(this.fieldValues[fieldId])
      ) {
        this.errors[fieldId] = true;
      } else {
        this.errors[fieldId] = false;
      }
      break;
    // Description, about and expectations: max length 1000, min length 1 chars
    case 'expectations':
    case 'description':
    case 'about':
      if (
        this.fieldValues[fieldId].length > 1000 ||
        this.fieldValues[fieldId].length < 1
      ) {
        this.errors[fieldId] = true;
      } else {
        this.errors[fieldId] = false;
      }
      break;
    // Email: Email format regex
    case 'email':
      if (!emailPatternRegex.test(this.fieldValues[fieldId])) {
        this.errors[fieldId] = true;
      } else {
        this.errors[fieldId] = false;
      }
      break;
    // Selectos: Ok if not empty
    case 'rooms':
    case 'type':
      if (this.fieldValues[fieldId] !== null) {
        this.errors[fieldId] = false;
      } else {
        this.errors[fieldId] = true;
      }
      break;
    // Phone number: Number only regex
    case 'phone':
      if (!numberPatternRegex.test(this.fieldValues[fieldId])) {
        this.errors[fieldId] = true;
      } else {
        this.errors[fieldId] = false;
      }
      break;
    // Zipcode: Four digit only regex
    case 'postalCode':
      if (!zipCodePatternRegex.test(this.fieldValues[fieldId])) {
        this.errors[fieldId] = true;
      } else {
        this.errors[fieldId] = false;
      }
      break;
    // Date: Selected date not prior to current date
    case 'date':
      const today = new Date();
      const selectedDate = new Date(this.fieldValues[fieldId]);
      if (today.getTime() < selectedDate.getTime()) {
        this.errors[fieldId] = false;
      } else {
        this.errors[fieldId] = true;
      }
      break;
  }
  this.formHasErrors = false;
  this.errors.forEach(err => {
    if (err) {
      this.formHasErrors = true;
    }
  });
}

function submit() {
  const fieldsVals = Object.values(fieldValues.value);
  const keys = Object.keys(fieldValues.value);

  let containsErrors = false;

  fieldValues.value.forEach((fieldValue, i) => {
    // Temp exception for field price_unit as it is at this point not developed
    if (i !== 7) {
      if (!fieldValue) {
        console.log(i);
        console.log(fieldValue);
        errors.value[i] = true;
        containsErrors = true;
      } else if (fieldValue.toString().length < 1) {
        errors.value[i] = true;
        containsErrors = true;
      }
    }
  });
  console.log(errors.value);
  if (containsErrors) {
    const fields = keys.map((id, i) => {
      return {field_type_id: id, value: fieldsVals[i]};
    });
    emit('submit', fields);
  } else {
    formHasErrors.value = true;
  }
}

onMounted(() => {
  formHasErrors.value = false;
  props.fieldsToShow.forEach(field => {
    fieldValues.value[field.field_id] = '';
    fieldKeys.value[field.field_id] = field.key;
    errors.value[field.field_id] = false;
  });
});
</script>
