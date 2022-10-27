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
        half: field.field_type_definition_id === 2 || field.field_type_definition_id === 3
      }"
    >
      <div>
        <input
          v-bind:id="'create-add-field-' + field.field_id"
          type="text"
          v-bind:placeholder="t(`categories.${selectedCategory}.${field.key}`)"
          v-model="fieldValues[field.field_id]"
          v-bind:class="{
            error: errors[field.field_id]?.hasError
          }"
          v-on:change="(event) => checkField(field.field_id, field.key)"
        />
        <label
          v-bind:class="{
              hidden: !errors[field.field_id]?.hasError,
              shown: errors[field.field_id]?.hasError
          }"
        >
          {{ t('errorMessage_' + errors[field.field_id]?.reason) }}
        </label>
      </div>

    </div>

    <!-- Textarea(4) -->
    <div class="form-field full" v-if="field.field_type_definition_id === 4">
      <textarea
        v-bind:id="'create-add-field-' + field.field_id"
        type="text"
        v-bind:placeholder="t(`categories.${selectedCategory}.${field.key}`)"
        v-model="fieldValues[field.field_id]"
        v-on:change="event => checkField(field.field_id, field.key)"
        v-bind:class="{
          error: errors[field.field_id]?.hasError
        }"
      />
      <div v-if="field.key !== 'about'"
        v-bind:class="{
          hidden: !errors[field.field_id]?.hasError,
          shown: errors[field.field_id]?.hasError
        }"
      >{{ t('errorMessage_' + errors[field.field_id]?.reason) }}</div>
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
          error: errors[field.field_id]?.hasError
        }"
        v-on:change="(event) => checkField(field.field_id, field.key)"
      >
        <option disabled value="">
          {{t(`categories.${selectedCategory}.${field.key}.title`)}}
        </option>
        <option v-for="option in field.field_options" v-bind:value="option.key" v-bind:selected="option.key === field.value">
          {{ t(`categories.${selectedCategory}.${field.key}.options.${option.key}`) }}
        </option>
      </select>
      <div
        v-bind:class="{
            hidden: !errors[field.field_id]?.hasError,
            shown: errors[field.field_id]?.hasError
        }"
      >
        {{ t('errorMessage_' + errors[field.field_id]?.reason) }}
      </div>
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
            error: errors[field.field_id]?.hasError
          }"
        />
        <div
          v-bind:class="{
              hidden: !errors[field.field_id]?.hasError,
              shown: errors[field.field_id]?.hasError
          }"
        >
          {{ t('errorMessage_' + errors[field.field_id]?.reason) }}
        </div>
      </div>

      <!-- Input type lan lon(17) -->
      <input
        v-if="field.field_type_definition_id === 17"
        v-bind:id="'create-add-field-' + field.field_id"
        hidden
        v-model="fieldValues[field.field_id]"
        v-on:change="(event) => checkField(field.field_id, field.key)"
        v-bind:class="{
          error: errors[field.field_id]?.hasError
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
          error: errors[field.field_id]?.hasError
        }"
      />
      <div
        v-bind:class="{
            hidden: !errors[field.field_id]?.hasError,
            shown: errors[field.field_id]?.hasError
        }"
      >
        {{ t('errorMessage_' + errors[field.field_id]?.reason) }}
      </div>
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
          error: errors[field.field_id]?.hasError
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
            error: errors[field.field_id]?.hasError
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
      :files="props.thumbnail"
    ></UploadImagesThumbnail>
  </div>
  <div class="upload-section">
    <UploadImagesThumbnail
      @update-parent="updateParent"
      :is-thumbnail-upload="false"
      :files="props.images"
    ></UploadImagesThumbnail>
    <div
      v-bind:class="{
          hidden: !status.hasError,
          shown: status.hasError
      }"
    >
      {{t('errorMessage_' + status.reason)}}
    </div>
  </div>
  <p class="submit-row">
    <a
      class="btn"
      v-on:click="preview"
      v-bind:class="{
        disabled: formHasErrors || status.hasError
      }"
      >{{ t('preview') }}
    </a>
    <a
      class="btn"
      v-on:click="emit('back', 0, images, thumbnail)"
      v-bind:class="{
        disabled: formHasErrors
      }"
      >{{ t('back') }}
    </a>
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
import { onMounted, ref, toRaw } from 'vue';
import { useI18n } from './useI18n';
import i18n from '../locales/i18n';
import UploadImagesThumbnail from './UploadImagesThumbnail.vue';
const props = defineProps({ fieldsToShow: Array, images: Array, thumbnail: Array, selectedCategory: String});
const emit = defineEmits(['preview', 'back']);
const fieldValues = ref([]);
const fieldKeys = ref([]);
const errors = ref([]);
const counterOptions = ref([1, 2, 3, 4, 5, 6, 7, 8]);
const { t } = useI18n(i18n.global.messages.value);
let formHasErrors = ref(true);
const hasSpecificDate = ref(false);
let images = [];
let thumbnail = [];
let status = { hasError: false, reason: null}
/**
 * @description method that send the selected images from the children to the parent component.
 * @param {Array} variable are the images that has been selected for the ad
 */
function updateParent(variable) {
  images=[];
  Object.keys(variable).forEach(key => images.push(variable[key]));
  checkImages()
  reRenderComponent()
}
/**
 * @description method that send the selected thumbnail from the children to the parent component.
 * @param {Array} variable are the thumbnail that has been selected for the ad
 */
function updateParentThumbnail(variable) {
  thumbnail = variable;
  checkImages()
  reRenderComponent()
}

function reRenderComponent() {
  checkField(1, "title")
}

// This functions updates the error stored in status which is used for the images
function checkImages() {
  const maxFileSize = 500000 // This is 500KB
  const maxSumFileSize = 2000000 // This is 2000KB or 2MB

  let sumOfFileSize = 0
  let singleFileTooBig = false
  let sumOfFilesTooBig = false

  const rawThumb = toRaw(thumbnail) // Convert proxy to raw object
  const isThumbnailMissing = rawThumb.length === 0 || rawThumb[0] === undefined
  const areImagesMissing = images === undefined || images.length === 0
  
  if (!isThumbnailMissing) {
    const rawThumbnailSize = rawThumb[0].size
    if (rawThumbnailSize > maxFileSize) {
      singleFileTooBig = true
    }
    sumOfFileSize += rawThumbnailSize
  }

  if (!areImagesMissing) {
    images.forEach((file) => {
      if (file.size > maxFileSize) {
        singleFileTooBig = true
      }
      sumOfFileSize += file.size
    })
  }

  sumOfFilesTooBig = sumOfFileSize > maxSumFileSize
  
  if (singleFileTooBig) {
    status.hasError = true
    status.reason = "singleFileTooBig"
  } else if (sumOfFilesTooBig) {
    status.hasError = true
    status.reason = "sumOfFilesTooBig"
  } else { // In case we have mandatory images this else needs to be removed otherwise the other errors will just be ignored/overwritten.
    status.hasError = false
    status.reason = null
  }
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

  let _value = fieldValues.value[fieldId]
  // Static specific validations based on AM categories (currently only accomodation), TODO improve
  switch (fieldKey) {
    // Title, Address: max length 50, min length 1 chars
    case 'title':
    case 'address':
      if (_value === undefined || _value.length > 50 || _value.length < 1) {
        errors.value[fieldId] = { hasError: true, reason: fieldKey + "_tooLongOrTooShort" };
      } else {
        errors.value[fieldId] = { hasError: false, reason: null };
      }
      break;
    // Region: max length 50, min length 1 chars and not numbers
    case 'region':
      if (
        _value === undefined || 
        _value.length > 50 ||
        _value.length < 1 ||
        !alphabeticPatternRegex.test(_value)
      ) {
        errors.value[fieldId] = { hasError: true, reason: fieldKey };
      } else {
        errors.value[fieldId] = { hasError: false, reason: null };
      }
      break;
    // Description, about and expectations: max length 1000, min length 1 chars
    case 'expectations':
    case 'description':
    case 'about':
      if (_value === undefined || _value.length > 1000 || _value.length < 1) {
        errors.value[fieldId] = { hasError: true, reason: fieldKey + "_exdeab" };
      } else {
        errors.value[fieldId] = { hasError: false, reason: null };
      }
      break;
    // Email: Email format regex
    case 'email':
      if (!emailPatternRegex.test(_value)) {
        errors.value[fieldId] = { hasError: true, reason: "email" };
      } else {
        errors.value[fieldId] = { hasError: false, reason: null };
      }
      break;
    // Selectors: Ok if not empty
    case 'priceUnit':
      if (_value === '') {
        errors.value[fieldId] = { hasError: true, reason: fieldKey + "_nothingSelected"};
      } else {
        errors.value[fieldId] = { hasError: false, reason: null};
      }
      break;
    case 'rooms':
    case 'type':
    case 'fromRooms':
      if (_value !== null) {
        errors.value[fieldId] = { hasError: false, reason: null };
      } else {
        errors.value[fieldId] = { hasError: true, reason: fieldKey + "_missing" };
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
      if (!numberPatternRegex.test(_value)) {
        errors.value[fieldId] = { hasError: true, reason: fieldKey + "_NaN" };
      } else if (_value.length < 1) {
        errors.value[fieldId] = { hasError: true, reason: fieldKey + "_missing" };
      } else {
        errors.value[fieldId] = { hasError: false, reason: null };
      }
      break;
    // Zipcode: Four digit only regex
    case 'postalCode':
      if (!zipCodePatternRegex.test(_value)) {
        errors.value[fieldId] = { hasError: true, reason: fieldKey };
      } else {
        errors.value[fieldId] = { hasError: false, reason: null };
      }
      break;
    // Date: Selected date not prior to current date
    case 'date':
      const today = new Date();
      const selectedDate = new Date(_value);
      if (today.getTime() < selectedDate.getTime()) {
        errors.value[fieldId] = { hasError: false, reason: null };
      } else {
        errors.value[fieldId] = { hasError: true, reason: fieldKey };
      }
      break;
    case 'availability':
      hasSpecificDate.value = _value === 'date';
      const dateFieldId = props.fieldsToShow.find((field) => field.key === 'date').field_id;

      if (_value === 'now') {
        fieldValues.value[dateFieldId] = new Date().toISOString().substring(0, 10);
      } else {
        fieldValues.value[dateFieldId] = '';
      }

      if (_value === '') {
        errors.value[fieldId] = { hasError: true, reason: fieldKey + "_nothingSelected"};
      } else {
        errors.value[fieldId] = { hasError: false, reason: null};
      }

      break;
  }

  updateFormHasErrors()
}

function updateFormHasErrors() {
  formHasErrors = false;
  errors.value.forEach((err) => {
    if (err.hasError) {
      formHasErrors = true;
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
        checkField(field.field_id, field.key)
        containsErrors = true;
      }
    }
  });

  checkImages()
  if (!containsErrors && !status.hasError) {
    const fields = [];
    props.fieldsToShow.forEach((field) => {
      fields.push({
        field_id: field.field_id,
        field_type_definition_id: field.field_type_definition_id,
        key: field.key,
        value: fieldValues.value[field.field_id],
        field_options: field.field_options
      });
    });
    emit('preview', fields, images, thumbnail);
  } else {
    formHasErrors = true;
  }
  reRenderComponent()
}

onMounted(() => {
  updateFormHasErrors() // Required so the formHasErrors is also updated on back button
  images = props.images;
  thumbnail = props.thumbnail;
  props.fieldsToShow.forEach((field) => {
    // checkbox default value shoud be false
    if (field.field_type_definition_id === 8 || field.field_type_definition_id === 16) {
      fieldValues.value[field.field_id] = field.value ?? false;
    } else if (field.field_type_definition_id === 6){
      //selectbox
      fieldValues.value[field.field_id] = field?.value || "";
    }else {
      fieldValues.value[field.field_id] = field?.value;
    }
    fieldKeys.value[field.field_id] = field.key;
    errors.value[field.field_id] = { hasError: false, reason: null };
  });
});

</script>
