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
      />
    </div>

    <!-- Textarea(4) -->
    <div class="form-field full" v-if="field.field_type_definition_id === 4">
      <textarea
        v-bind:id="'create-add-field-' + field.field_id"
        type="text"
        v-bind:placeholder="t(`categories.${selectedCategory}.${field.key}`)"
        v-model="fieldValues[field.field_id]"
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
      >
        <option disabled value="">{{
          t(`categories.${selectedCategory}.${field.key}.title`)
        }}</option>
        <option
          v-for="option in field.field_options"
          v-bind:value="option.field_option_id"
        >
          {{
            t(`categories.${selectedCategory}.${field.key}.types.${option.key}`)
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
      />
    </div>

    <!-- Input type phone(10) -->
    <div class="form-field full" v-if="field.field_type_definition_id === 10">
      <input
        v-bind:id="'create-add-field-' + field.field_id"
        type="tel"
        v-bind:placeholder="t(`categories.${selectedCategory}.${field.key}`)"
        v-model="fieldValues[field.field_id]"
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
      >
        <option disabled value="">{{
          t(`categories.${selectedCategory}.${field.key}`)
        }}</option>
        <option v-for="option in counterOptions" v-bind:value="option">
          {{ option }}
        </option>
      </select>
    </div>
  </div>
  <p class="submit-row">
    <a class="btn" v-on:click="submit">{{
      t('categories.accomodation.publish')
    }}</a>
  </p>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useI18n} from './useI18n'
import i18n from '../locales/i18n'

const props = defineProps({fieldsToShow: Array, selectedCategory: String})
const emit = defineEmits(['submit'])
const fieldValues = ref([])
const counterOptions = ref([1, 2, 3, 4, 5, 6, 7, 8])
const {t} = useI18n(i18n.global.messages.value)

function submit () {
  const fieldsVals = Object.values(this.fieldValues)
  const fieldsKeys = Object.keys(this.fieldValues)
  const fields = fieldsKeys.map((id, i) => {
    return {field_type_id: id, value: fieldsVals[i]}
  })
  emit('submit', fields)
}

onMounted(() => {
  props.fieldsToShow.forEach(field => {
    fieldValues.value[field.field_id] = ''
  })
})
</script>
