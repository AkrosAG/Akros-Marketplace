<template>
  <div v-if="childData">
    <h2 class="subtitle">Received Data</h2>
    <form @submit.prevent="resetForm">
      <fieldset class="fieldset" disabled>
        <div class="columns">
          <div class="column">
            <div class="field">
              <div class="control">
                <label class="radio" for="angebote">
                  <input
                    v-model="childData.type"
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
                    v-model="childData.type"
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
                    v-model="childData.accomodationType"
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
                  v-model="childData.region"
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
                  v-model="childData.beginDate"
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
                  v-model="childData.endDate"
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
                  <select v-model="childData.minimumRooms" id="minimumRooms">
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
                  <select v-model="childData.maximumRooms" id="maximumRooms">
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
                  v-model="childData.minimumPrice"
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
                  v-model="childData.maximumPrice"
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
                  v-model="childData.minimumSize"
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
                  v-model="childData.maximumSize"
                  placeholder="Bis Grösse"
                />
              </div>
            </div>
          </div>
        </div>
      </fieldset>
      <div class="field is-pulled-right">
        <div class="control">
          <button class="button is-link" type="submit">
            Reset
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ['childData'],
  methods: {
    resetForm () {
      this.$emit('resetEventFromChild')
    },
  },
}
</script>
