import {createApp} from 'vue';
import App from './App.vue';
import i18n from './i18n'

createApp(App).use(i18n).mount('#app');


///////// FOR WEBCOMPONENT REPLACE CODE WITH BELOW /////////////////

// import {defineCustomeElement} from 'vue';
// import CreateAdd from './components/CreateAdd';

// const CustomElement = defineCustomeElement(CreateAdd);

// customElements.define('create-add-webcomponent', CustomElement);
