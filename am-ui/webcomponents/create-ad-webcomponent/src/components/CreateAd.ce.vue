<script setup>
/**
 * @description Main component of the Topics creation module acting as controller. Gets list of categories
 * from API with the category fields corresponding to the creation(categories/true). Enables to show the
 * creation form as long as a category has been selected and contains fields. Creates POST when receiving event
 * from child component and form has been correctly filled.
 * Contains the styles of the module.
 */
import ApiClient from '../api/src/ApiClient';
import CategoriesApi from '../api/src/api/CategoriesApi';
import TopicSaveRequestDTO from '../api/src/model/TopicSaveRequestDTO';
import { onMounted, ref, toRefs } from 'vue';
import CreateAdFields from './CreateAdFields.vue';
import { useI18n } from 'vue-i18n';
import CreateTopic from './CreateTopic';

const apiClient = new ApiClient('/');
const categoriesApi = new CategoriesApi(apiClient);
const createTopic = new CreateTopic(apiClient);
const categories = ref([]);
const subCategories = ref([]);
const selectedCategoryKey = ref('');
const selectedSubCategoryKey = ref('');
const requestOrOffer = ref('OFFER');
const fieldsToShow = ref([]);
const showSubDropdown = ref(false);
const showAdFields = ref(false);
const currentRequestFields = ref([]);
const currentOfferFields = ref([]);
const props = defineProps({
  appLanguage: {
    default: 'de',
    type: String
  },
  bearerToken: String
});

const { t } = useI18n({ useScope: 'global' });
const { bearerToken } = toRefs(props);

onMounted(() => {
  categoriesApi.categoriesCreateGet(true, getCategories);
});

/**
 * Retrieves the categories from the api response and triggers update of the fields.
 * @param {String} _error - contains any errors from the api request
 * @param {[{}]} data - contains response data(if any)
 * @param {String} _response - contains the whole response
 */
function getCategories(_error, data, _response) {
  categories.value = data.categories;
  updateSubCategories();
}

/**
 * Selects which fields to show based on the selected category.
 */
function updateSubCategories() {
  const selectedCategory = categories.value.find(
    (category) => category.key === selectedCategoryKey.value
  );
  showAdFields.value = false;

  if (selectedCategory && selectedCategory.sub_categories.length > 0) {
    showSubDropdown.value = true;
    subCategories.value = selectedCategory.sub_categories;
    selectedSubCategoryKey.value = selectedCategory.sub_categories[0].key;
    updateSubCategoryFields();
  } else {
    showSubDropdown.value = false;
  }
}

/**
 * Updates lists of fields for request and offer based on the selected subcategory.
 */
function updateSubCategoryFields() {
  const selectedSubCategory = subCategories.value.find(
    (subCategory) => subCategory.key === selectedSubCategoryKey.value
  );

  if (selectedSubCategory && selectedSubCategory.fields.length > 0) {
    currentRequestFields.value = selectedSubCategory.fields.filter((field) => field.request);
    currentOfferFields.value = selectedSubCategory.fields.filter((field) => field.offer);

    fieldsToShow.value = currentOfferFields.value;
    requestOrOffer.value = 'OFFER';
    showAdFields.value = true;
  } else {
    showAdFields.value = false;
  }
}

/**
 * Changes fields to show based of request or offer radio buttons.
 */
function updateRequestOfferFields() {
  if (requestOrOffer.value === 'OFFER') {
    fieldsToShow.value = currentOfferFields.value;
  } else {
    fieldsToShow.value = currentRequestFields.value;
  }
}

/**
 * @description Method triggered from submit event in CreadAdFields component, builds the body for the
 * POST call with the filled fields that it receives and sets id (0) and value for request or offer.
 * @param {[{}]} data - Form field values
 * @param {[{}]} images - Images for detail view of an ad
 * @param {[{}]} thumbnail - thumbnail for ad's
 */
function submit(data, images, thumbnail) {
  if (bearerToken.value) {
    apiClient.authentications['bearerAuth'].accessToken = bearerToken.value;
  } else {
    delete apiClient.authentications['bearerAuth'].accessToken;
  }

  const selectedSubCategory = subCategories.value.find(
    (subcategory) => subcategory.key === selectedSubCategoryKey.value
  );

  let files = ([] = []);
  if (images.length !== 0) {
    files = createTopicImageSaveRequestDTO(images);
  }

  let thumbnailImage = {};
  if (thumbnail.length !== 0) {
    thumbnailImage = createTopicImageSaveRequestDTO(thumbnail)[0];
  }

  const topics = new TopicSaveRequestDTO(
    0,
    selectedSubCategory.subcategory_id,
    requestOrOffer.value.toUpperCase(),
    data
  );

  createTopic.topicsPost(files, topics, thumbnailImage);
}

function createTopicImageSaveRequestDTO(images) {
  const proxy = new Proxy(images, {});
  const files = proxy[0];
  const image = [];
  for (let i = 0; i <= files.length; i++) {
    image.push(files[i]);
  }
  return image;
}

defineExpose({
  updateSubCategoryFields,
  updateRequestOfferFields,
  updateSubCategories
});
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
      <p class="paragraph">
        <select
          id="ad-category"
          v-model="selectedCategoryKey"
          name="ad-category"
          class="simple-field full-width uppercase"
          @change="updateSubCategories"
        >
          <option disabled value="">{{ t(`categoriesPlaceholder`) }}</option>
          <option v-for="category in categories" :key="category.category_id" :value="category.key">
            {{ t(`categories.${category.key}.typeTitle`) }}
          </option>
        </select>
      </p>
      <p class="paragraph" v-if="showSubDropdown">
        <select
          id="ad-sub-category"
          v-model="selectedSubCategoryKey"
          name="ad-category"
          class="simple-field full-width uppercase"
          @change="updateSubCategoryFields"
        >
          <option
            v-for="subCategory in subCategories"
            :key="subCategory.subcategory_id"
            :value="subCategory.key"
            :selected="subCategory.key === selectedSubCategoryKey">
            {{ t(`categories.${selectedCategoryKey}.subCategories.${subCategory.key}`) }}
          </option>
        </select>
      </p>
      <div class="form-field half" v-if="showAdFields">
        <input
          id="ad-search"
          v-model="requestOrOffer"
          type="radio"
          name="type-ad"
          value="OFFER"
          checked="checked"
          @change="updateRequestOfferFields"
        />
        <label for="ad-search" class="radio-label">{{ t('offer') }}</label>
      </div>
      <div class="form-field half" v-if="showAdFields">
        <input
          v-model="requestOrOffer"
          type="radio"
          name="type-ad"
          value="REQUEST"
          @change="updateRequestOfferFields"
        /><label for="ad-offer" class="radio-label">
        {{ t('request') }}
      </label>
      </div>
      <CreateAdFields
        :key="selectedSubCategoryKey-requestOrOffer"
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

.paragraph {
  margin-bottom: 2em;
}

.radio-label {
  text-transform: capitalize;
}

.form-field {
  border-radius: 1.5rem;
  padding: 0.25em 0.8em 0.2em;
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

  .hidden {
    display: none;
  }

  .shown {
    color: $akros-red;
  }
}

// Styles for UploadImagesThumbnail.vue
.upload-section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .container {
    display: flex;
    justify-content: center;
    width: 90%;
    flex-direction: column;

    h3 {
      text-align: left;
      margin: 1em 0;
    }

    .upload-container {
      width: 100%;
      border: 2px dashed grey;
      border-radius: 5px;
      padding: 0.5em;

      .file-upload {
        cursor: pointer;
        width: 100%;
        display: flex;
        justify-content: center;

        .file-upload-input {
          display: none;
        }
      }
    }
  }

  .image-preview-list-container {
    margin: 1em 0;
    width: 90%;

    li {
      padding: 0.5em;
      width: 100%;
      margin-bottom: 0.5em;

      .list-container {
        display: grid;
        grid-template-columns: [first] 60% [line2] 40%;
        align-items: center;

        img {
          height: 100px;
          object-fit: contain;
        }

        .list-button {
          border-radius: 50px;
          background-color: #9c132c;
          color: white;
          border: none;
          padding: 6px 24px;
          cursor: pointer;
          font-size: 11.5pt;
        }

        .list-button:hover {
          color: #fff;
          background-color: $akros-red;
        }
      }
    }
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
