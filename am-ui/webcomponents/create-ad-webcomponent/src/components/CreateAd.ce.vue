<script setup>
import ApiClient from '../api/src/ApiClient';
import CategoriesApi from '../api/src/api/CategoriesApi';
import {onMounted, ref, computed, h} from 'vue';
import CreateAdFields from './CreateAdFields.vue';

const apiClient = new ApiClient('/');
const categoriesApi = new CategoriesApi(apiClient);
const categories = ref([]);
const selectedCategoryKey = ref('');
const requestOrOffer = ref('offer');
const fieldsToShow = ref([]);
const showAdFields = ref(false);

onMounted(() => {
  categoriesApi.categoriesCreateGet(true, getCategories);
});

function getCategories(error, data, response) {
  // Filter fields that are not for creation'
  data.categories.forEach(category => {
    category.fields = category.fields.filter(field => field.creation);
  });
  categories.value = data.categories;
  updateFields();
}
function updateFields() {
  const selectedCategory = categories.value.find(
    category => category.key === selectedCategoryKey.value
  );
  if (selectedCategory && selectedCategory.fields.length > 0) {
    fieldsToShow.value = selectedCategory.fields;
    showAdFields.value = true;
  } else {
    showAdFields.value = false;
  }
}
const element = computed(e => {
  console.log(e);
  return 'ul';
});
</script>

<template>
  <div class="form-wrap">
    <form
      method="post"
      action="#"
      enctype="multipart/form-data"
      name="create-ad-form"
      id="create-ad-form"
      class="simple-form"
    >
      <p>
        <select
          name="ad-category"
          id="ad-category"
          class="simple-field full-width uppercase"
          v-model="selectedCategoryKey"
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
      <p>
        <span class="simple-field half"
          ><input
            type="radio"
            id="ad-offer"
            name="type-ad"
            value="offer"
            checked="checked"
            v-model="requestOrOffer"
            @change="updateFields"
          /><label for="ad-offer" class="radio-label no-wrap uppercase"
            >I Offer</label
          ></span
        >
        <span class="simple-field half text-right"
          ><input
            type="radio"
            id="ad-search"
            name="type-ad"
            value="search"
            v-model="requestOrOffer"
            @change="updateFields"
          /><label for="ad-search" class="radio-label no-wrap uppercase"
            >I'm Looking for</label
          ></span
        >
      </p>
      <CreateAdFields
        v-if="showAdFields"
        :fieldsToShow="fieldsToShow"
      ></CreateAdFields>
      <!-- <p v-if="hasSubcategory">
        <select
          name="ad-sub-category"
          id="ad-sub-category"
          class="simple-field full-width uppercase"
          v-model="selectedSubCategory"
        >
          <option disabled selected="">Type</option>
          <<option value="room">Room</option>
          <option value="studio">Studio</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="chalet">Chalet</option>
        </select>
      </p> -->
      <!--<p>
        <input
          type="text"
          name="ad-title"
          id="ad-title"
          class="simple-field full-width"
          value="Ad Title"
          onfocus="if (this.value == 'Ad Title') this.value='';"
          onblur="if (this.value == '') this.value='Ad Title';"
          title="Ad Title"
        />
      </p>
      <p>
        <input
          type="text"
          name="ad-town"
          id="ad-town"
          class="simple-field half"
          value="Тown / Village"
          onfocus="if (this.value == 'Тown / Village') this.value='';"
          onblur="if (this.value == '') this.value='Тown / Village';"
          title="Тown / Village"
        />
        <input
          type="text"
          name="ad-post-code"
          id="ad-post-code"
          class="simple-field half"
          value="Post Code"
          onfocus="if (this.value == 'Post Code') this.value='';"
          onblur="if (this.value == '') this.value='Post Code';"
          title="Post Code"
        />
      </p>
      <p>
        <input
          type="text"
          name="ad-address"
          id="ad-address"
          class="simple-field full-width"
          value="Exact Address"
          onfocus="if (this.value == 'Exact Address') this.value='';"
          onblur="if (this.value == '') this.value='Exact Address';"
          title="Exact Address"
        />
      </p>
      <p>
        <input
          type="text"
          name="rooms-number"
          id="rooms-number"
          class="simple-field third"
          value="Nº of Rooms"
          onfocus="if (this.value == 'Nº of Rooms') this.value='';"
          onblur="if (this.value == '') this.value='Nº of Rooms';"
          title="Nº of Rooms"
        />
        <input
          type="text"
          name="total-area"
          id="total-area"
          class="simple-field third"
          value="Area (m²)"
          onfocus="if (this.value == 'Area (m²)') this.value='';"
          onblur="if (this.value == '') this.value='Area (m²)';"
          title="Area (m²)"
        />
        <input
          type="text"
          name="lodging-floor"
          id="lodging-floor"
          class="simple-field third"
          value="Floor"
          onfocus="if (this.value == 'Floor') this.value='';"
          onblur="if (this.value == '') this.value='Floor';"
          title="Floor"
        />
      </p>
      <p>
        <input
          type="text"
          name="lodging-furnishing"
          id="lodging-furnishing"
          class="simple-field full-width"
          value="Furnishing"
          onfocus="if (this.value == 'Furnishing') this.value='';"
          onblur="if (this.value == '') this.value='Furnishing';"
          title="Furnishing"
        />
      </p>
      <p>
        <input
          type="text"
          name="min-time"
          id="min-time"
          class="simple-field third"
          value="Min Time"
          onfocus="if (this.value == 'Min Time') this.value='';"
          onblur="if (this.value == '') this.value='Min Time';"
          title="Min Time"
        />
        <input
          type="text"
          name="max-time"
          id="max-time"
          class="simple-field third"
          value="Max Time"
          onfocus="if (this.value == 'Max Time') this.value='';"
          onblur="if (this.value == '') this.value='Max Time';"
          title="Max Time"
        />
        <input
          type="text"
          name="starting-date"
          id="starting-date"
          class="simple-field third"
          value="Starting Date"
          onfocus="if (this.value == 'Starting Date') this.value='';"
          onblur="if (this.value == '') this.value='Starting Date';"
          title="Starting Date"
        />
      </p>
      <p>
        <input
          type="text"
          name="rental-price"
          id="rental-price"
          class="simple-field half text-right"
          value="Price (€)"
          onfocus="if (this.value == 'Price (€)') this.value='';"
          onblur="if (this.value == '') this.value='Price (€)';"
          title="Price (€)"
        />
        <select
          name="price-per-time"
          id="price-per-time"
          class="simple-field half"
        >
          <option value="per-month" selected="">per Month</option>
          <option value="per-week">per Week</option>
          <option value="per-day">per Day</option>
        </select>
      </p>
      <p>
        <textarea
          name="lodging-description"
          id="lodging-description"
          class="simple-field full-width"
          cols="60"
          rows="5"
          onfocus="if (this.value == 'Description, location, surroundings, infrastructure') this.value='';"
          onblur="if (this.value == '') this.value='Description, location, surroundings, infrastructure';"
        >
Description, location, surroundings, infrastructure</textarea
        >
      </p>
      <p>
        <textarea
          name="about-tenant"
          id="about-tenant"
          class="simple-field full-width"
          cols="60"
          rows="3"
          onfocus="if (this.value == 'My expectations of the tenant') this.value='';"
          onblur="if (this.value == '') this.value='My expectations of the tenant';"
        >
My expectations of the tenant</textarea
        >
      </p>
      <p>
        <textarea
          name="about-me"
          id="about-me"
          class="simple-field full-width"
          cols="60"
          rows="3"
          onfocus="if (this.value == 'Brief description about me') this.value='';"
          onblur="if (this.value == '') this.value='Brief description about me';"
        >
Brief description about me</textarea
        >
      </p>
      <p class="file-upload-wrap">
        <span class="simple-field full-width"
          ><label for="upload-image-1" class="block-label"
            >Upload Image (jpg or png up to 2MB):</label
          ></span
        >
        <span class="file-upload-row" id="file-upload-row-1">
          <input
            type="file"
            name="upload-image-1"
            id="upload-image-1"
            class="simple-field file-upload"
            title="Upload Image"
          />
          <a class="btn add-row-btn" title="Add Another Image">+</a>
        </span>
      </p>
      <p>
        <input
          type="email"
          name="user-email"
          id="user-email"
          class="simple-field full-width"
          value="Your Email"
          onfocus="if (this.value == 'Your Email') this.value='';"
          onblur="if (this.value == '') this.value='Your Email';"
          title="Your Email"
        />
      </p>
      <p>
        <input
          type="tel"
          name="user-phone"
          id="user-phone"
          class="simple-field full-width"
          value="Your Phone"
          onfocus="if (this.value == 'Your Phone') this.value='';"
          onblur="if (this.value == '') this.value='Your Phone';"
          title="Your Phone"
        />
      </p>
      <p class="submit-row">
        <a class="btn auto-flex">Preview and Publish</a>
      </p> -->
    </form>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

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

/*                         GENERAL STYLING
***********************************************************************/
* {
  font: 400 11pt/1.5 Inter, Helvetica, sans-serif;
}
html {
  height: 100%;
  -webkit-text-size-adjust: none;
}
body {
  height: 100%;
  min-height: 100%;
  overflow-x: hidden;
  font: 400 11pt/1.5 Inter, Helvetica, sans-serif;
  color: #464646;
  background-color: #f6f6f6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
h1 {
  margin-bottom: 0.33em;
  font: 500 2em/1.2 Inter, Helvetica, sans-serif;
  text-align: center;
  color: #232323;
}
h2 {
  margin-bottom: 0.33em;
  font: 500 1.8em/1.2 Inter, Helvetica, sans-serif;
  text-align: center;
  color: #232323;
}
h3 {
  margin-bottom: 0.33em;
  font: 500 1.6em/1.2 Inter, Helvetica, sans-serif;
  text-align: center;
  color: #232323;
}
h4 {
  margin-bottom: 0.33em;
  font: 500 1.4em/1.2 Inter, Helvetica, sans-serif;
  text-align: center;
  color: #232323;
}
h5 {
  margin-bottom: 0.33em;
  font: 500 1.2em/1.2 Inter, Helvetica, sans-serif;
  text-align: center;
  color: #232323;
}
h6 {
  margin-bottom: 0.25em;
  font: 500 1.05em/1.2 Inter, Helvetica, sans-serif;
  color: #232323;
}
p {
  margin-bottom: 1.2em;
}
a {
  font-weight: 500;
  text-decoration: none;
  color: #9c132c;
  -moz-transition: all 0.3s ease-in 0s;
  -webkit-transition: all 0.3s ease-in 0s;
  transition: all 0.3s ease-in 0s;
}
a:hover {
  color: #d60929;
}
img {
  max-width: 100%;
  height: auto;
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
}
input[type='submit'] {
  border: none;
  cursor: pointer;
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

/*                             STRUCTURE
***********************************************************************/
#container-wrapper {
  position: relative;
  min-width: 360px;
  min-height: 100%;
  height: auto !important;
  height: 100%;
}
#header {
  background-color: #fff;
}
#content-wrapper {
  padding: 0 0 60px;
}
#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  color: #fff;
  background-color: #938c83;
}
.container-fluid {
  width: auto;
}
.container {
  max-width: 1600px;
  margin: 0 auto;
}
.branding-block {
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.intro-block {
  padding: 20px 0;
}
.intro-block h1 {
  width: 90%;
  margin: 0 auto;
}
.content-block {
  padding: 15px;
}
.text-block {
  max-width: 840px;
  margin: 0 auto;
}

/*                  Utility Styles
****************************************************/
.block {
  display: block;
}
.no-display {
  display: none;
}
.flex {
  display: flex;
}
.auto-flex {
  flex: auto;
}
.left {
  float: left;
}
.right {
  float: right;
}
.center {
  margin: 0 auto;
}
.no-wrap {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.white {
  background-color: #fff;
}
.matte-white {
  background-color: #f6f6f6;
}
.black {
  background-color: #232323;
}
.grey {
  background-color: #868686;
}
.light-grey {
  background-color: #b0b0b0;
}
.akros-beige {
  background-color: #c3bcb3;
}
.light-beige {
  background-color: #ece6df;
}
.akros-red {
  background-color: #d60929;
}
.dark-red {
  background-color: #9c132c;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.text-left {
  text-align: left;
}
.uppercase {
  text-transform: uppercase;
}
.text-white {
  color: #fff;
}
.text-dark {
  color: #232323;
}
.space-after-1 {
  margin-bottom: 1em;
}
.space-after-2 {
  margin-bottom: 2em;
}
.space-after-3 {
  margin-bottom: 3em;
}
.btn {
  display: inline-block;
  padding: 6px 24px;
  vertical-align: middle;
  text-align: center;
  color: #e9d3d6;
  color: rgba(255, 255, 255, 0.8);
  background-color: #9c132c;
  border-radius: 1.2em;
  cursor: pointer;
}
.btn:hover {
  color: #fff;
  background-color: #d60929;
}
.icon-btn {
  display: inline-block;
  width: 18px;
  height: auto;
  margin: -2px 6px 2px;
  vertical-align: middle;
  fill: #e9d3d6;
  fill: rgba(255, 255, 255, 0.8);
  -moz-transition: fill 0.3s ease-in 0s;
  -webkit-transition: fill 0.3s ease-in 0s;
  transition: fill 0.3s ease-in 0s;
}
.btn:hover .icon-btn {
  fill: #fff;
}
.big-btn {
  display: block;
  max-width: 360px;
  margin: 0 auto;
  padding: 8px 24px;
  font-size: 1.1em;
  text-transform: uppercase;
}
.submit-btn {
  display: block;
  flex: auto;
  margin: 0.6em auto 0;
  font-size: 11.5pt;
  cursor: pointer;
}

.cleaner,
.container:after,
.clearfix:after {
  display: block;
  clear: both;
  height: 0;
  content: '';
  visibility: hidden;
}

/*                      Header
****************************************************/
#logo {
  display: block;
  margin: 12px 0;
  width: 105px;
  height: 36px;
}
.logo-wrap {
  flex: auto;
}
.language-nav {
  position: relative;
}
.signin-nav {
  position: relative;
  margin-left: 20px;
  text-align: right;
}
.btn-header {
  display: block;
  padding: 6px 0 6px 8px;
  color: #868686;
  cursor: pointer;
}
.btn-header:hover,
.btn-header.active {
  color: #d60929;
}
.icon-header {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: -2px 2px 2px 0;
  vertical-align: middle;
  fill: #868686;
  -moz-transition: fill 0.3s ease-in 0s;
  -webkit-transition: fill 0.3s ease-in 0s;
  transition: fill 0.3s ease-in 0s;
}
.btn-header:hover .icon-header,
.btn-header.active .icon-header {
  fill: #d60929;
}
.signin-label {
  display: none;
}
.header-menu {
  position: absolute;
  right: 0;
  top: 34px;
  padding: 6px 0;
  text-align: left;
  background-color: #fff;
  border-radius: 0.2em;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  opacity: 0;
  -moz-transform: scale(1, 0);
  -webkit-transform: scale(1, 0);
  transform: scale(1, 0);
  -moz-transform-origin: top center;
  -webkit-transform-origin: top center;
  transform-origin: top center;
  -moz-transition: all 0.3s ease-in 0s;
  -webkit-transition: all 0.3s ease-in 0s;
  transition: all 0.3s ease-in 0s;
  z-index: 99;
}
#lang-menu {
  min-width: 60px;
}
#signin-menu {
  min-width: 160px;
}
.header-menu.active {
  height: auto;
  opacity: 1;
  -moz-transform: scale(1, 1);
  -webkit-transform: scale(1, 1);
  transform: scale(1, 1);
}
.header-menu a {
  display: block;
  padding: 8px 12px 8px 16px;
  font-weight: 400;
  white-space: nowrap;
  color: #464646;
}
.header-menu a:hover {
  color: #232323;
  background-color: #f0f0f0;
}
.header-menu a.active {
  color: #d60929;
}

/*                      Intro
****************************************************/
#intro {
  background: #938c83 url(img/intro_slide.jpg) no-repeat center / cover fixed;
}
#accordion-block {
  display: flex;
  flex-direction: column;
  width: auto;
  max-width: 360px;
  height: 500px;
  margin: 20px auto;
}
.accordion-btn {
  position: relative;
  margin-top: 2px;
  padding: 8px 18px;
  font-size: 1.1em;
  font-weight: 500;
  color: #f4efe9;
  color: rgba(255, 255, 255, 0.8);
  background-color: #938c83;
  border-radius: 1em;
  cursor: pointer;
  z-index: 1;
}
.accordion-btn:hover,
.accordion-btn.active {
  color: #fff;
  background-color: #635c53;
}
.accordion-btn.active {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.btn-arrow {
  position: absolute;
  top: 13px;
  right: 16px;
  display: block;
  width: 9px;
  height: 16px;
  fill: #f4efe9;
  fill: rgba(255, 255, 255, 0.8);
  -moz-transition: all 0.3s ease-in 0s;
  -webkit-transition: all 0.3s ease-in 0s;
  transition: all 0.3s ease-in 0s;
}
.active .btn-arrow {
  fill: #fff;
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.accordion-form-wrap {
  display: none;
  flex: auto;
  padding: 12px;
  border-bottom-right-radius: 1em;
  border-bottom-left-radius: 1em;
  background-color: #ece6df;
}
.accordion-btn.active + .accordion-form-wrap {
  display: block;
}
#intro .simple-field {
  font-size: 10pt;
}
.accordion-form p {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8em;
}
.simple-field.half {
  width: 48%;
  width: calc(50% - 6px);
}
.simple-field.full-width {
  width: 100%;
}

/*                      Content
****************************************************/
.post-btn-block {
  margin: 2.5em auto;
}
/*** Create An Ad ***/
.form-wrap {
  max-width: 420px;
  min-height: 70vh;
}
#create-ad-form .simple-field {
  font-size: 10pt;
}
.simple-form p {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
}
.simple-form p.file-upload-wrap {
  flex-wrap: wrap;
  margin-bottom: 0.33em;
}
.simple-form p.submit-row {
  margin-top: 1.6em;
}
.simple-field.full-width {
  width: 100%;
}
.simple-field.half {
  width: 48%;
  width: calc(50% - 6px);
}
.simple-field.third {
  width: 31%;
  width: calc(33.33% - 6px);
}
.simple-field.two-thirds {
  width: 64%;
  width: calc(66.67% - 6px);
}
.file-upload-row {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 1em;
}
.simple-field.file-upload {
  width: 86%;
  width: calc(100% - 42px);
}
.add-row-btn {
  padding: 1px 9px;
  font: 700 1.2em/1.45 Inter, Helvetica, sans-serif;
}
.block-label {
  display: block;
  padding: 0 0 0.33em 0.85em;
}

/*                      Footer
****************************************************/
.copyright {
  margin: 0;
  padding: 1.8em 0 1em;
  font-size: 0.85em;
  color: #dcdcdc;
}
.copyright a {
  color: #dcdcdc;
}
.copyright a:hover {
  color: #fff;
}

/*                           MEDIA QUERIES
***********************************************************************/

/*                               600px
--------------------------------------------------------------------- */
@media screen and (min-width: 600px) {
  .intro-block,
  .content-block {
    padding: 20px;
  }
  .intro-block h1 {
    width: auto;
  }
  #logo {
    margin: 11px 0;
    width: 140px;
    height: 48px;
  }
  .btn-signin-wrap {
    margin-left: 60px;
  }
  .signin-label {
    display: inline;
  }
  .header-menu {
    top: 38px;
  }
  #create-ad-form .simple-field {
    font-size: 11pt;
  }
}

/*                               900px
--------------------------------------------------------------------- */
@media screen and (min-width: 900px) {
  .intro-block,
  .content-block {
    padding: 30px;
  }
}

/*                              1200px
--------------------------------------------------------------------- */
@media screen and (min-width: 1200px) {
  body {
    font-size: 12pt;
  }
  h1 {
    font-size: 2.8em;
  }
  h2 {
    font-size: 2.25em;
  }
  h3 {
    font-size: 1.9em;
  }
  h4 {
    font-size: 1.55em;
  }
  h5 {
    font-size: 1.33em;
  }
  h6 {
    font-size: 1.05em;
  }
  .container {
    width: 94%;
  }
  .branding-block {
    padding: 0;
  }
  .intro-block,
  .content-block {
    padding: 40px;
  }
  #logo {
    margin: 15px 0;
    width: 175px;
    height: 60px;
  }
  .header-menu {
    top: 42px;
  }
  .header-menu a {
    font-size: 0.9em;
  }
  #accordion-block {
    margin: 30px auto 20px;
  }
}

/*                              1536px
--------------------------------------------------------------------- */
@media screen and (min-width: 1536px) {
}
</style>
