<template>
  <div>
    <h1>I am a child</h1>
    <div v-if="childData">
      <ul>
        <!-- eslint-disable-next-line -->
        <li v-for="(value, propertyName) in childData">
          {{ propertyName }}: {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['childData'],
}
</script>
