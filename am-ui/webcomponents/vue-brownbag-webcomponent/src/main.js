import {defineCustomeElement} from 'vue';
import VueWebComponent from './components/VueWebComponent';

const CustomElement = defineCustomeElement(VueWebComponent);

customElements.define('vue-brownbag-webcomponent', CustomElement);
