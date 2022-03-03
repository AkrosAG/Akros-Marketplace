import {defineCustomElement} from 'vue';
import VueWebComponent from './components/VueWebComponent';

const CustomElement = defineCustomElement(VueWebComponent);

window.customElements.define('vue-brownbag-webcomponent', CustomElement);
