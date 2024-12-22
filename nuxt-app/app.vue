<script setup>
import TaskList from '~/components/TaskList.vue'

const taskLists = ref([
  {
    id: 'test',
    title: 'Default Task List'
  }
])

const tasks = ref({
  test: [
    {
      id: 'test-task',
      name: 'Test Task'
    }
  ]
})
</script>

<template>
  <TaskList v-for="taskList in taskLists" :taskList="taskList" :tasks="tasks[taskList.id]" :key="taskList.id" />
</template>

<script>
(async () => {
  const taskListsResponse = await chrome.runtime.sendMessage({
    type: "getTaskLists"
  })
  if (!taskListsResponse.ok) {
    console.error("Failed to get task lists")
    return
  }
  taskLists.value = await taskListsResponse.json()
  console.log(taskLists.value)
})()
</script>
