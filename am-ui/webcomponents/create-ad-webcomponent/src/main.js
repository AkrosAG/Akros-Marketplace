import I18nHost from './components/I18nHost.ce.vue';
import CreateAdWebComponent from './components/CreateAd.ce.vue';
import {createApp, defineCustomElement} from 'vue';

const I18nHostElement = defineCustomElement(I18nHost);
const CreateAdWebComponentElement = defineCustomElement(CreateAdWebComponent);
// const CreateAdFieldsElement = defineCustomElement(CreateAdFields);
customElements.define('i18n-host', I18nHostElement);
customElements.define('create-ad-webcomponent', CreateAdWebComponentElement);
