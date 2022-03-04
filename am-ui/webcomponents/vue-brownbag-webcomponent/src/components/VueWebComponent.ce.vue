<template>
  <!-- eslint-disable-next-line -->
  <div class="columns">
    <section class="column">
      <h2 class="subtitle">Form</h2>
      <form @submit.prevent="submitForm">
        <div class="columns">
          <div class="column">
            <div class="field">
              <div class="control">
                <label class="radio" for="angebote">
                  <input
                    v-model="formData.type"
                    type="radio"
                    id="angebote"
                    name="art"
                    value="Angebote"
                    checked
                  />
                  Angebote
                </label>

                <label class="radio" for="anfragen">
                  <input
                    v-model="formData.type"
                    type="radio"
                    id="anfragen"
                    name="art"
                    value="Anfragen"
                  />
                  Anfragen
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <div class="control">
                <div class="select">
                  <select
                    v-model="formData.accomodationType"
                    id="accomodationType"
                  >
                    <option value="room">Room</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="parking">Parking</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="formData.region"
                  placeholder="Region, Stadt oder Kanton"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  v-model="formData.beginDate"
                  type="date"
                  id="beginDate"
                />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  v-model="formData.endDate"
                  type="date"
                  id="endDate"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <div class="control">
                <div class="select">
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
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <div class="control">
                <div class="select">
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
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  id="minimumPrice"
                  v-model="formData.minimumPrice"
                  placeholder="Von Preis"
                />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  id="maximumPrice"
                  v-model="formData.maximumPrice"
                  placeholder="Bis Preis"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  id="minimumSize"
                  v-model="formData.minimumSize"
                  placeholder="Von Grösse"
                />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  id="maximumSize"
                  v-model="formData.maximumSize"
                  placeholder="Bis Grösse"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="field is-pulled-right">
          <div class="control">
            <button class="button is-link" type="submit">
              Suche
            </button>
          </div>
        </div>
      </form>
    </section>
    <section class="column" id="childSection">
      <VueChildComponent
        :childData="childData"
        @resetEventFromChild="resetChildData"
      />
    </section>
  </div>
</template>

<script>
import VueChildComponent from './VueChildComponent.vue'
export default {
  data () {
    return {
      formData: {
        type: '',
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
      this.childData = {...this.formData}
    },
    resetChildData () {
      this.childData = null
    },
  },
  props: [],
  components: {VueChildComponent},
}
</script>

<style lang="scss">
@import 'https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css';
.select {
  width: 100%;
  select {
    width: 100%;
  }
}
fieldset {
  padding-bottom: 0.75rem;
  margin-bottom: calc(1.5rem - 0.75rem);
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
