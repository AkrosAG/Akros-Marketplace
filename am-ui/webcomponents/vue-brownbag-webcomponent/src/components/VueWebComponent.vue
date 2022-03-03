<template>
  <section class="form">
    <form @submit.prevent="submitForm">
      <input
        v-model="formData.type"
        type="radio"
        id="angebote"
        name="art"
        value="Angebote"
        checked
      />
      <label for="angebote">Angebote</label>
      <input
        v-model="formData.type"
        type="radio"
        id="anfragen"
        name="art"
        value="Anfragen"
      />
      <label for="anfragen">Anfragen</label>

      <select v-model="formData.accomodationType" id="accomodationType">
        <option value="room">Room</option>
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
        <option value="parking">Parking</option>
      </select>

      <input
        type="text"
        v-model="formData.region"
        placeholder="Region, Stadt oder Kanton"
      />

      <input v-model="formData.beginDate" type="date" id="beginDate" />
      <input v-model="formData.endDate" type="date" id="endDate" />

      <select v-model="formData.minimumRooms" id="minimumRooms">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>
      <select v-model="formData.maximumRooms" id="maximumRooms">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>

      <input
        type="text"
        id="minimumPrice"
        v-model="formData.minimumPrice"
        placeholder="Von Preis"
      />
      <input
        type="text"
        id="maximumPrice"
        v-model="formData.maximumPrice"
        placeholder="Bis Preis"
      />

      <input
        type="text"
        id="minimumSize"
        v-model="formData.minimumSize"
        placeholder="Von Grösse"
      />
      <input
        type="text"
        id="maximumSize"
        v-model="formData.maximumSize"
        placeholder="Bis Grösse"
      />
      <button class="button is-primary is-large" type="submit">Suche</button>
    </form>
  </section>
  <section id="childSection">
    <VueChildComponent :childData="childData" />
  </section>
</template>

<script>
import VueChildComponent from './VueChildComponent.vue'
export default {
  data () {
    return {
      formData: {
        region: '',
        beginDate: '',
        endDate: '',
        minimumPrice: '',
        maximumPrice: '',
        minimumSize: '',
        maximumSize: '',
      },
      childData: null,
    }
  },
  methods: {
    // submit the form to our backend api
    submitForm () {
      console.log(this.childData)
      this.childData = this.formData
    },
  },
  props: [],
  components: {VueChildComponent},
}
</script>
