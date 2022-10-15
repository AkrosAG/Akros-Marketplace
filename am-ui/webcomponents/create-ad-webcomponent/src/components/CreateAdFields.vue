<template>
  <div>
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
          third: field.field_type_definition_id === 3
        }"
      >
        <input
          v-bind:id="'create-add-field-' + field.field_id"
          type="text"
          v-bind:placeholder="t(`categories.${selectedCategory}.${field.key}`)"
          v-model="fieldValues[field.field_id]"
          v-bind:class="{
            error: errors[field.field_id]
          }"
          v-on:change="(event) => checkField(field.field_id, field.key)"
        />
      </div>

      <!-- Textarea(4) -->
      <div class="form-field full" v-if="field.field_type_definition_id === 4">
        <textarea
          v-bind:id="'create-add-field-' + field.field_id"
          type="text"
          v-bind:placeholder="t(`categories.${selectedCategory}.${field.key}`)"
          v-model="fieldValues[field.field_id]"
          v-on:change="(event) => checkField(field.field_id, field.key)"
          v-bind:class="{
            error: errors[field.field_id]
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
          disabled: field.key === 'price_unit'
        }"
      >
        <select
          v-bind:id="'create-add-field-' + field.field_id"
          v-model="fieldValues[field.field_id]"
          v-bind:class="{
            error: errors[field.field_id]
          }"
          v-on:change="(event) => checkField(field.field_id, field.key)"
        >
          <option disabled value="">
            {{ t(`categories.${selectedCategory}.${field.key}.title`) }}
          </option>
          <option v-for="option in field.field_options" v-bind:value="option.key">
            {{ t(`categories.${selectedCategory}.${field.key}.options.${option.key}`) }}
          </option>
        </select>
      </div>

      <!-- Boolean checkbox(8,16) -->
      <div
        class="form-field checkbox half"
        v-if="field.field_type_definition_id === 8 || field.field_type_definition_id === 16"
      >
        <input
          v-bind:id="'create-add-field-' + field.field_id"
          type="checkbox"
          v-bind:placeholder="t(`categories.${selectedCategory}.${field.key}`)"
          v-model="fieldValues[field.field_id]"
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
          v-on:change="(event) => checkField(field.field_id, field.key)"
          v-bind:class="{
            error: errors[field.field_id]
          }"
        />
      </div>

      <!-- Input type lan lon(17) -->
      <input
        v-if="field.field_type_definition_id === 17"
        v-bind:id="'create-add-field-' + field.field_id"
        hidden
        v-model="fieldValues[field.field_id]"
        v-on:change="(event) => checkField(field.field_id, field.key)"
        v-bind:class="{
          error: errors[field.field_id]
        }"
      />

      <!-- Input type phone(10) -->
      <div class="form-field full" v-if="field.field_type_definition_id === 10">
        <input
          v-bind:id="'create-add-field-' + field.field_id"
          type="tel"
          v-bind:placeholder="t(`categories.${selectedCategory}.${field.key}`)"
          v-model="fieldValues[field.field_id]"
          v-on:change="(event) => checkField(field.field_id, field.key)"
          v-bind:class="{
            error: errors[field.field_id]
          }"
        />
      </div>

      <!-- Input type date half/full:(12), third(13) -->
      <div
        class="form-field half"
        v-if="field.field_type_definition_id === 12 || field.field_type_definition_id === 13"
        v-bind:class="{
          third: field.field_type_definition_id === 13
        }"
      >
        <input
          v-bind:id="'create-add-field-' + field.field_id"
          type="date"
          v-bind:placeholder="t(`categories.${selectedCategory}.${field.key}`)"
          v-model="fieldValues[field.field_id]"
          v-on:change="(event) => checkField(field.field_id, field.key)"
          v-bind:class="{
            error: errors[field.field_id]
          }"
          :disabled="!hasSpecificDate"
        />
      </div>

      <!-- Selector counter half(14), full(15) -->
      <div
        class="form-field half"
        v-if="field.field_type_definition_id === 14 || field.field_type_definition_id === 15"
        v-bind:class="{
          third: field.field_type_definition_id === 15
        }"
      >
        <select
          v-bind:id="'create-add-field-' + field.field_id"
          v-model="fieldValues[field.field_id]"
          v-bind:class="{
            error: errors[field.field_id]
          }"
          v-on:change="(event) => checkField(field.field_id, field.key)"
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
  </div>
  <div class="upload-section">
    <UploadImagesThumbnail
      @update-parent="updateParentThumbnail"
      :is-thumbnail-upload="true"
    ></UploadImagesThumbnail>
  </div>
  <div class="upload-section">
    <UploadImagesThumbnail
      @update-parent="updateParent"
      :is-thumbnail-upload="false"
    ></UploadImagesThumbnail>
  </div>
  <p class="submit-row">
    <a
      class="btn"
      v-on:click="preview"
      v-bind:class="{
        disabled: formHasErrors
      }"
      >{{ t('preview') }}</a
    >
    <a
      class="btn"
      v-on:click="emit('back', 0, images, thumbnail)"
      v-bind:class="{
        disabled: formHasErrors
      }"
      >{{ t('back') }}</a
    >
  </p>
</template>

<script setup>
/**
 * @description Component to render the form for the creation of a new Topic once a category
 * has been selected.
 * TODO
 * Currently only with validation rules for accommodation category
 * @param {Array} fieldsToShow - Array of the fields to be rendered as one input type or another
 * based on the field_type_id and the HTML logic.
 * @param {String} selectedCategory - Key string value of the selected category
 */
import { onMounted, ref } from 'vue';
import { useI18n } from './useI18n';
import i18n from '../locales/i18n';
import UploadImagesThumbnail from './UploadImagesThumbnail.vue';
import { getSafePropertyAccessString } from '@angular/compiler';
const props = defineProps({ fieldsToShow: Array, selectedCategory: String });
const emit = defineEmits(['preview', 'back']);
const fieldValues = ref([]);
const fieldKeys = ref([]);
const errors = ref([]);
const counterOptions = ref([1, 2, 3, 4, 5, 6, 7, 8]);
const { t } = useI18n(i18n.global.messages.value);
const formHasErrors = ref([]);
const hasSpecificDate = ref(false);
const images = [];
const thumbnail = [];
/**
 * @description method that send the selected images from the children to the parent component.
 * @param {Array} variable are the images that has been selected for the ad
 */
function updateParent(variable) {
  images.push(variable);
}
/**
 * @description method that send the selected thumbnail from the children to the parent component.
 * @param {Array} variable are the thumbnail that has been selected for the ad
 */
function updateParentThumbnail(variable) {
  thumbnail.push(variable);
}
/**
 * @description Method to validate the input in the form fields, currently only implemented for accomodation
 * @param {Number} fieldId - Id of the field to find its reference in the array of field values and erros
 * @param {String} fieldKey - Key string value of the edited field
 */
function checkField(fieldId, fieldKey) {
  const emailPatternRegex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
  const zipCodePatternRegex = new RegExp('[0-9]{4}');
  const numberPatternRegex = new RegExp('^[0-9]*$');
  const alphabeticPatternRegex = new RegExp('^((?![0-9]).)*$$');
  // Static specific validations based on AM categories (currently only accomodation), TODO improve
  switch (fieldKey) {
    // Title, Address: max length 50, min length 1 chars
    case 'title':
    case 'address':
      if (fieldValues.value[fieldId].length > 50 || fieldValues.value[fieldId].length < 1) {
        errors.value[fieldId] = true;
      } else {
        errors.value[fieldId] = false;
      }
      break;
    // Region: max length 50, min length 1 chars and not numbers
    case 'region':
      if (
        fieldValues.value[fieldId].length > 50 ||
        fieldValues.value[fieldId].length < 1 ||
        !alphabeticPatternRegex.test(fieldValues.value[fieldId])
      ) {
        errors.value[fieldId] = true;
      } else {
        errors.value[fieldId] = false;
      }
      break;
    // Description, about and expectations: max length 1000, min length 1 chars
    case 'expectations':
    case 'description':
    case 'about':
      if (fieldValues.value[fieldId].length > 1000 || fieldValues.value[fieldId].length < 1) {
        errors.value[fieldId] = true;
      } else {
        errors.value[fieldId] = false;
      }
      break;
    // Email: Email format regex
    case 'email':
      if (!emailPatternRegex.test(fieldValues.value[fieldId])) {
        errors.value[fieldId] = true;
      } else {
        errors.value[fieldId] = false;
      }
      break;
    // Selectors: Ok if not empty
    case 'rooms':
    case 'priceUnit':
    case 'type':
    case 'fromRooms':
      if (fieldValues.value[fieldId] !== null) {
        errors.value[fieldId] = false;
      } else {
        errors.value[fieldId] = true;
      }
      break;
    // Phone, price, size, floor: Number only regex
    case 'phone':
    case 'price':
    case 'lat':
    case 'lon':
    case 'size':
    case 'floor':
    case 'radius':
    case 'toPrice':
    case 'fromSize':
    case 'propertySize':
      if (!numberPatternRegex.test(fieldValues.value[fieldId])) {
        errors.value[fieldId] = true;
      } else {
        errors.value[fieldId] = false;
      }
      break;
    // Zipcode: Four digit only regex
    case 'postalCode':
      if (!zipCodePatternRegex.test(fieldValues.value[fieldId])) {
        errors.value[fieldId] = true;
      } else {
        errors.value[fieldId] = false;
      }
      break;
    // Date: Selected date not prior to current date
    case 'date':
      const today = new Date();
      const selectedDate = new Date(fieldValues.value[fieldId]);
      if (today.getTime() < selectedDate.getTime()) {
        errors.value[fieldId] = false;
      } else {
        errors.value[fieldId] = true;
      }
      break;
    case 'availability':
      hasSpecificDate.value = fieldValues.value[fieldId] === 'date';
      const dateFieldId = props.fieldsToShow.find((field) => field.key === 'date').field_id;
      if (fieldValues.value[fieldId] === 'now') {
        fieldValues.value[dateFieldId] = new Date().toISOString().substring(0, 10);
        errors.value[dateFieldId] = false;
      } else {
        fieldValues.value[dateFieldId] = '';
      }
      errors.value[fieldId] = false;
      break;
  }
  formHasErrors.value = false;
  errors.value.forEach((err) => {
    if (err) {
      formHasErrors.value = true;
    }
  });
}
/**
 * @description Method to emit the submit event to parent component with the values filled in the fields.
 * Performs a second validation to not allow send POST event if some fields have not been filled.
 * TODO improve this logic, currently only supporting accomodation
 * @param {Number} fieldId - Id of the field to find its reference in the array of field values and erros
 * @param {String} fieldKey - Key string value of the edited field
 */
function preview() {
  let containsErrors = false;
  props.fieldsToShow.forEach((field) => {
    // Temp exception attachments(18) as it is at this point not developed
    if (field.required && field.field_id !== 18) {
      if (
        !fieldValues.value[field.field_id] ||
        fieldValues.value[field.field_id].toString().length < 1
      ) {
        errors.value[field.field_id] = true;
        containsErrors = true;
      }
    }
  });
  if (!containsErrors) {
    const fields = [];
    props.fieldsToShow.forEach((field) => {
      fields.push({
        field_id: field.field_id,
        field_type_definition_id: field.field_type_definition_id,
        key: field.key,
        value: field.value ?? fieldValues.value[field.field_id]
      });
    });
    emit('preview', fields, images, thumbnail);
  } else {
    formHasErrors.value = true;
  }
}

onMounted(() => {
  formHasErrors.value = false;
  props.fieldsToShow.forEach((field) => {
    // checkbox default value shoud be false
    if (field.field_type_definition_id === 8 || field.field_type_definition_id === 16) {
      fieldValues.value[field.field_id] = field.value ?? false;
    } else if (field.field_type_definition_id === 6){
      //selectbox
      //fieldValues.value[field.field_id] = t(`categories.accomodation.${field.key}.options.${field.value}`) ?? "";
      fieldValues.value[field.field_id] = "";
    }else {
      fieldValues.value[field.field_id] = field?.value;
    }
    fieldKeys.value[field.field_id] = field.key;
    errors.value[field.field_id] = false;
  });
});

</script>
