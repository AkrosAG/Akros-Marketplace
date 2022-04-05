import I18nHost from './components/I18nHost.ce.vue';
import CreateAdWebComponent from './components/CreateAd.ce.vue';
import CreateAdFields from './components/CreateAdFields.vue';
import {createApp, defineCustomElement} from 'vue';
import {createI18n} from 'vue-i18n';
import App from './App.vue'

// customElements.define(
//   'create-ad-webcomponent',
//   defineCustomElement(CreateAdWebComponent)
// );

const I18nHostElement = defineCustomElement(I18nHost);
const CreateAdWebComponentElement = defineCustomElement(CreateAdWebComponent);
// const CreateAdFieldsElement = defineCustomElement(CreateAdFields);
customElements.define('i18n-host', I18nHostElement);
customElements.define('create-ad-webcomponent', CreateAdWebComponentElement);

const i18n = createI18n<false>({
  legacy: false,
  locale: 'en',
  messages: {}
})

createApp(App).use(i18n).mount('#app');
