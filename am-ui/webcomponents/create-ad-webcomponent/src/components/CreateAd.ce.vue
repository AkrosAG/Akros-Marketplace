<script setup>
import ApiClient from '../api/src/ApiClient'
import CategoriesApi from '../api/src/api/CategoriesApi'
import TopicsApi from '../api/src/api/TopicsApi'
import TopicSaveRequestDTO from '../api/src/model/TopicSaveRequestDTO'
import {onMounted, ref, computed} from 'vue'
import CreateAdFields from './CreateAdFields.vue'
import {useI18n} from 'vue-i18n'

const apiClient = new ApiClient('/')
const categoriesApi = new CategoriesApi(apiClient)
const topicsApi = new TopicsApi(apiClient)
const categories = ref([])
const selectedCategoryKey = ref('')
const requestOrOffer = ref('offer')
const fieldsToShow = ref([])
const showAdFields = ref(false)
let currentCategoryId = 0
const props = defineProps({appLanguage: String})
const {t} = useI18n({
  inheritLocale: true,
  useScope: 'local',
})

onMounted(() => {
  categoriesApi.categoriesCreateGet(true, getCategories)
})

function getCategories (_error, data, _response) {
  // Filter fields that are not for creation'
  data.categories.forEach(category => {
    category.fields = category.fields.filter(field => field.creation)
  })
  categories.value = data.categories
  updateFields()
}

function updateFields () {
  const selectedCategory = categories.value.find(
    category => category.key === selectedCategoryKey.value
  )
  if (selectedCategory && selectedCategory.fields.length > 0) {
    fieldsToShow.value = selectedCategory.fields
    showAdFields.value = true
    currentCategoryId = selectedCategory.category_id
  } else {
    showAdFields.value = false
  }
}

function submit (data) {
  const dto = new TopicSaveRequestDTO(
    0,
    currentCategoryId,
    requestOrOffer.value.toUpperCase(),
    data
  )
  topicsApi.topicsPost(dto)
}

const element = computed(e => {
  console.log(e)
  return 'ul'
})
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
          <option disabled value="">Ad Category</option>
          <option
            v-for="category in categories"
            :key="category.category_id"
            :value="category.key"
          >
            {{ category.key }}
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
        /><label for="ad-offer" class="radio-label no-wrap uppercase">
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
        <label for="ad-search" class="radio-label no-wrap uppercase">{{
          t('offer')
        }}</label>
      </div>
      <CreateAdFields
        v-if="showAdFields"
        :fields-to-show="fieldsToShow"
        @submit="submit"
      />
    </form>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
$white: #fff;
$matte-white: #f6f6f6;
$grey: #232323;
$light-grey: #868686;
$akros-beige: #b0b0b0;
$light-beige: #ece6df;
$akros-red: #d60929;
$dark-red: #9c132c;
/*                              RESET
***********************************************************************/
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  border: 0;
  -webkit-tap-highlight-color: transparent;
}
ol,
ul {
  list-style: none;
}
img,
iframe {
  border: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

/*
***********************************************************************/
html {
  height: 100%;
  -webkit-text-size-adjust: none;
}
body {
  height: 100%;
  min-height: 100%;
  overflow-x: hidden;
  color: $grey;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
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
  text-transform: capitalize;
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
}
.btn:hover {
  color: #fff;
  background-color: $akros-red;
}

.form-wrap {
  margin: 0 auto;
  max-width: 420px;
  min-height: 70vh;
  font: 400 11pt/1.5 Inter, Helvetica, sans-serif;
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
  label {
    text-transform: capitalize;
  }
  textarea {
    max-width: 100%;
    min-width: 100%;
  }
  .nocap {
    text-transform: none;
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

<i18n>
{
  "en": {
    "offer": "I offer",
    "request": "I'm looking for",
  },
  "de": {
    "offer": "Ich biete",
    "request": "Ich suche nach",
  }
}
</i18n>
