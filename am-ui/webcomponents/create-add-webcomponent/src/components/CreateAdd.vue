<template>
  <div>
    <div id="intro">
      <div class="container intro-block">
        <h1 class="text-white">{{ $t('title') }}</h1>
      </div>
    </div>
    <!-- <form [formGroup]="form" class="form">
      <div class="mb-12 flex">
        <div class="form-check form-check-inline flex-1 pl-4">
          <input
            class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            name="requestOrOffer"
            id="offerRadio"
            [value]="false"
            formControlName="requestOrOffer"
            checked
          />
          <label
            class="form-check-label inline-block text-gray-800 pl-4"
            for="offerRadio"
            >{{ 'searchForm.offers' | translate }}</label
          >
        </div>
        <div class="form-check form-check-inline flex-1 pl-4">
          <input
            class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            [value]="true"
            formControlName="requestOrOffer"
            name="requestOrOffer"
            id="searchRadio"
          />
          <label
            class="form-check-label inline-block text-gray-800 pl-4"
            for="searchRadio"
            >{{ 'searchForm.searches' | translate }}</label
          >
        </div>
      </div>
    </form> -->
  </div>
</template>
<script>
import {createI18n} from 'vue-i18n/index';
import * as Vue from 'vue'; // in Vue 3
import axios from 'axios';
import VueAxios from 'vue-axios';
export default {
  props: ['lng'],
  data() {
    return {
      categories: null,
    };
  },
  mounted() {
    axios.get('/api/categories').then(response => (this.categories = response));
  },
};
</script>

<style>
@import './../styles.css';
@import './form-styles.scss';
#intro {
  background: #938c83 url('./../assets/images/akros-bg.jpg') no-repeat center /
    cover fixed;
}

.intro-block {
  padding: 20px 0;
}

.intro-block h1 {
  width: 90%;
  margin: 0 auto;
}
.form-wrap {
  margin: 1em auto;
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

/*                               600px
--------------------------------------------------------------------- */
@media screen and (min-width: 600px) {
  #create-ad-form .simple-field {
    font-size: 11pt;
  }
}
</style>
