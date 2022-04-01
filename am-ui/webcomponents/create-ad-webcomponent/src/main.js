import CreateAdWebComponent from './components/CreateAd.ce.vue';
import {defineCustomElement} from 'vue';

customElements.define(
  'create-ad-webcomponent',
  defineCustomElement(CreateAdWebComponent)
);
