<script setup>
defineProps({
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
  padding: none;
  margin: 4px 0;
  width: 300px;
}
ul {
    margin: none;
}
</style>

<template>
    <div>
        <ul>
            <li v-for="task in tasks" :key="task.id">
            {{ task.name }}
            </li>
        </ul>
    </div>
</template>