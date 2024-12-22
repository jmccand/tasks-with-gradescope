<script setup>
defineProps({
  taskList: {
    type: Object,
    required: true
  },
  tasks: {
    type: Array,
    required: true
  }
})
</script>
<style scoped>
div {
  border: 2px solid #000;
  border-radius: 4px;
  padding: 0 20px 20px 20px;
  margin: 4px 0;
  width: 300px;
}
ul {
  margin: none;
}
</style>

<template>
  <div>
    <h2>{{ taskList.title }}</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id">
      {{ task.name }}
      </li>
    </ul>
  </div>
</template>