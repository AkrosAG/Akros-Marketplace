import CreateAdComponent from './components/CreateAd.ce.vue';
import {defineCustomElement} from 'vue';

customElements.define(
  'create-ad-webcomponent',
  defineCustomElement(CreateAdComponent)
);
