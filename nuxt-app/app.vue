<script setup>
import TaskList from '~/components/TaskList.vue'

const taskLists = ref([
  [
    { id: 1, name: 'Task 1' },
    { id: 2, name: 'Task 2' }
  ],
  [
    { id: 3, name: 'Task 3' },
    { id: 4, name: 'Task 4' }
  ]
])
</script>

<template>
  <TaskList v-for="tasks in taskLists" :tasks="tasks" :key="tasks[0].id" />
</template>
