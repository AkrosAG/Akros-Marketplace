import {getCurrentInstance} from 'vue';
import {I18nInjectionKey} from 'vue-i18n';

export function deepInject(key) {
  let inst = getCurrentInstance();
  if (inst === null) {
    throw new Error('getCurrentInstance returned null');
  }
  inst = inst.parent;
  if (inst === null) {
    return;
  }
  while (inst !== null) {
    if (key in inst.provides) {
      return inst.provides[key];
    }
    inst = inst.parent;
  }
}

// eslint-disable-next-line
export function useI18n(options) {
  const instance = deepInject(I18nInjectionKey);
  if (instance === undefined) {
    throw new Error('i18n not found in context');
  }
  const {global} = instance;

  // merge locale messages
  const messages = options ?? {};
  const locales = Object.keys(messages);
  if (locales.length > 0) {
    locales.forEach(locale => {
      global.mergeLocaleMessage(locale, messages[locale]);
    });
  }
  return global;
}
