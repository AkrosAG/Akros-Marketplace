<script setup>
import ApiClient from '../api/src/ApiClient';
import CategoriesApi from '../api/src/api/CategoriesApi';
import TopicsApi from '../api/src/api/TopicsApi';
import TopicSaveRequestDTO from '../api/src/model/TopicSaveRequestDTO';
import {onMounted, ref, computed, watchEffect} from 'vue';
import CreateAdFields from './CreateAdFields.vue';
import {useI18n} from 'vue-i18n';

const apiClient = new ApiClient('/');
const categoriesApi = new CategoriesApi(apiClient);
const topicsApi = new TopicsApi(apiClient);
const categories = ref([]);
const selectedCategoryKey = ref('');
const requestOrOffer = ref('offer');
const fieldsToShow = ref([]);
const showAdFields = ref(false);
let currentCategoryId = 0;
const props = defineProps({
  appLanguage: {
    default: 'de',
    type: String,
  },
});
const {t} = useI18n({useScope: 'global'});

// ignore
onMounted(() => {
  categoriesApi.categoriesCreateGet(true, getCategories);
});

// TODO test as well?
function getCategories(_error, data, _response) {
  categories.value = data.categories;
  updateFields();
}

function updateFields() {
  const selectedCategory = categories.value.find(
    (category) => category.key === selectedCategoryKey.value,
  );
    console.log(categories.value);
    console.log(selectedCategoryKey.value);
  if (selectedCategory && selectedCategory.fields.length > 0) {
    fieldsToShow.value = selectedCategory.fields;
    showAdFields.value = true;
    currentCategoryId = selectedCategory.category_id;
  } else {
    showAdFields.value = false;
  }
}
// ignore
function submit(data) {
  const dto = new TopicSaveRequestDTO(
      0,
      currentCategoryId,
      requestOrOffer.value.toUpperCase(),
      data,
  );
  topicsApi.topicsPost(dto);
}
</script>

<template>
  <!-- eslint-disable -->
  <div class="form-wrap">
    <form
      id="create-ad-form"
      method="post"
      action="#"
      enctype="multipart/form-data"
      name="create-ad-form"
      class="simple-form"
    >
      <p>
        <select
          id="ad-category"
          v-model="selectedCategoryKey"
          name="ad-category"
          class="simple-field full-width uppercase"
          @change="updateFields"
        >
          <option disabled value="">{{ t(`categoriesPlaceholder`) }}</option>
          <option
            v-for="category in categories"
            :key="category.category_id"
            :value="category.key"
          >
            {{ t(`categories.${category.key}.typeTitle`) }}
          </option>
        </select>
      </p>
      <div class="form-field half">
        <input
          v-model="requestOrOffer"
          type="radio"
          name="type-ad"
          value="offer"
          checked="checked"
          @change="updateFields"
        /><label for="ad-offer" class="radio-label">
          {{ t('request') }}
        </label>
      </div>
      <div class="form-field half">
        <input
          id="ad-search"
          v-model="requestOrOffer"
          type="radio"
          name="type-ad"
          value="search"
          @change="updateFields"
        />
        <label for="ad-search" class="radio-label">{{ t('offer') }}</label>
      </div>
      <CreateAdFields
        v-if="showAdFields"
        :selected-category="selectedCategoryKey"
        :fields-to-show="fieldsToShow"
        @submit="submit"
      />
    </form>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
@import '../styles/colors.scss';
@import '../styles/reset.scss';

a {
  font-weight: 500;
  text-decoration: none;
  color: $dark-red;
  -moz-transition: all 0.3s ease-in 0s;
  -webkit-transition: all 0.3s ease-in 0s;
  transition: all 0.3s ease-in 0s;
}
a:hover {
  color: $akros-red;
}
input[type='text'],
input[type='email'],
input[type='password'],
input[type='date'],
input[type='file'],
input[type='tel'],
input[type='number'],
select,
textarea {
  box-sizing: border-box;
  padding: 0.25em 0.8em 0.2em;
  font: 400 1em/1.4 Inter, Helvetica, sans-serif;
  color: #5c5c5c;
  border: 1px solid transparent;
  border-radius: 1.1em;
  background-color: #f6f6f6;
  box-shadow: 0 1px 0 0 #fff;
  -webkit-appearance: none;
  width: 100%;
  margin-bottom: 1em;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 4px 40px #f6f6f6 inset, 0 1px 0 0 #fff !important;
  -webkit-background-clip: text;
  border: 1px solid #f6f6f6;
}
input:-webkit-autofill {
  -webkit-text-fill-color: #5c5c5c !important;
}
input:focus,
select:focus,
textarea:focus {
  background-color: #fff;
  outline: none;
}
input[type='radio'],
input[type='checkbox'] {
  display: inline-block;
  width: 1.33em;
  height: 1.33em;
  margin: -2px 5px 2px 0;
  vertical-align: middle;
}
select {
  cursor: pointer;
}
::selection {
  background-color: #938c83;
  color: #fff;
}
::-moz-selection {
  background-color: #938c83;
  color: #fff;
}

.btn {
  display: block;
  flex: auto;
  margin: 0.6em auto 0;
  font-size: 11.5pt;
  text-align: center;
  color: #e9d3d6;
  color: rgba(255, 255, 255, 0.8);
  background-color: $dark-red;
  border-radius: 1.2em;
  cursor: pointer;
  padding: 6px 24px;

  &.disabled {
    pointer-events: none;
    opacity: 0.65;
  }
}

.btn:hover {
  color: #fff;
  background-color: $akros-red;
}

.form-wrap {
  margin: 20px auto;
  max-width: 420px;
  min-height: 70vh;
  font: 400 11pt/1.5 Inter, Helvetica, sans-serif;
}

.radio-label {
  text-transform: capitalize;
}

.form-field {
  border-radius: 1.5rem;
  padding: 0.25em 0.8em 0.2em;
  height: 30px;
  margin-bottom: 1em;
  display: inline-block;
  &.full {
    width: 100%;
  }
  &.half {
    width: 48%;
    width: calc(50% - 2px);
    float: left;
  }
  &.third {
    width: 31%;
    width: calc(33.33% - 2px);
    float: left;
  }
  &.two-thirds {
    width: 64%;
    width: calc(66.67% - 2px);
    float: left;
  }
  &.file-upload {
    width: 86%;
    width: calc(100% - 42px);
    float: left;
  }
  &.checkbox {
    position: relative;
    top: 6px;
    left: 8px;
  }
  &.disabled {
    pointer-events: none;
    opacity: 0.65;
  }
  textarea {
    max-width: 100%;
    min-width: 100%;
  }
  .nocap {
    text-transform: none;
  }
  .error {
    border-color: $dark-red;
    color: $akros-red;
    background-color: $akros-red-bg;
    border-width: 0.1rem;
  }
}

/*                           MEDIA QUERIES
***********************************************************************/

/*                               600px
--------------------------------------------------------------------- */
@media screen and (min-width: 600px) {
}

/*                               900px
--------------------------------------------------------------------- */
@media screen and (min-width: 900px) {
}

/*                              1200px
--------------------------------------------------------------------- */
@media screen and (min-width: 1200px) {
  body {
    font-size: 12pt;
  }
}

/*                              1536px
--------------------------------------------------------------------- */
@media screen and (min-width: 1536px) {
}
</style>
