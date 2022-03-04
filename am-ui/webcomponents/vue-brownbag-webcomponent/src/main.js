import VueWebComponent from './components/VueWebComponent.ce.vue';
import {defineCustomElement} from 'vue';

customElements.define(
  'vue-brownbag-webcomponent',
  defineCustomElement(VueWebComponent)
);
