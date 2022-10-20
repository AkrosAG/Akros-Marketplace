<template>
  <div class="detail-container container-fluid simple">
    <span class="title">Preview</span>
    <br />
    <div class="rent-container">
      <table class="table">
        <tbody>
          <tr></tr>
          <tr v-for="field in props.fieldsToPreview">
            <div
              v-if=" field.value !== '' && field.key !== 'lat' && field.key!== 'lon'"
            >
              <th scope="col">{{ getFieldTitle(field, selectedCategory) }}  :  </th>
              <td>{{ getFieldValue(field) }} </td>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="submit-row">
      <a
        class="btn"
        v-on:click="submit"
        >{{ t('publish') }}</a
      >
      <a class="btn"  v-on:click="back">{{ t('back') }}</a>
    </p>
  </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'
    import { useI18n } from './useI18n';
    import i18n from '../locales/i18n';
    import { prop } from 'dom7';

    const props = defineProps({
      fieldsToPreview: Array,
      selectedCategory: String,
      images: Array,
      thumbnail: Array
    });


    const { t } = useI18n(i18n.global.messages.value);
    const emit = defineEmits(['submit', 'back']);
    /**
    * Retrieves the value property from the Field and formats the content according to its type.
    * @param {[{}]} field - contains all the field properties
    */
    function getFieldValue(field) {
      switch(field.key.toLowerCase()) {
          case "price":{
            const options = { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2  };
            let formatter = new Intl.NumberFormat('de-CH', options);
            return formatter.format(field.value);
              break;
          }
          case "priceunit":{
              return t(`categories.accomodation.priceUnit.options.${field.value}`);
              break;
          }
          case "availability":{
              return t(`categories.accomodation.availability.options.${field.value}`);
              break;
          }
          case "date":{
            const splittedDate = field.value.split("-");
            return (`${splittedDate[2]}.${splittedDate[1]}.${splittedDate[0]}`);
            break;
          }
          case "furnished":{
            return field.value? t('affirmative')  : t('negative');
            break;
          }
          case "temporary":{
            return field.value? t('affirmative')  : t('negative');
            break;
          }
          default: {
            return field.value ;
            break;
          }
      }
    }
    /**
     * Retrieves the Title property from the Field.
     * @param {[{}]} field - contains all the field properties
     */
     function getFieldTitle(field, category) {
       switch(field.key.toLowerCase()) {
           case "priceunit":
              return t('categories.accomodation.priceUnit.title');
              break;
           case "availability":
              return t('categories.accomodation.availability.title');
              break;
           default:
              return t(`categories.${category}.${field.key}`);
              break;
       }
     }

     function submit(){
       const fields = [];
       props.fieldsToPreview.forEach((field) => {
            fields.push({
              field_type_id: field.field_id,
              value: field.value
            });
        });
       emit('submit', fields, props.images, props.thumbnail);
     }

     function back(){
       const fields = [];
        props.fieldsToPreview.forEach((field) => {
            fields.push({
              field_id: field.field_id,
              field_type_definition_id: field.field_type_definition_id,
              key: field.key,
              value: field.value,
              field_options: field.field_options
            });
        });
        emit('back', fields);
     }
</script>
