<!-- src/components/LineChart.vue -->
<template>
  <canvas ref="canvas" width="400" height="200"></canvas>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  chartData: Object,
  chartOptions: Object,
})

const canvas = ref(null)
let chartInstance = null

onMounted(() => {
  // Chart is globally available because of CDN script
  chartInstance = new window.Chart(canvas.value.getContext('2d'), {
    type: 'line',
    data: props.chartData,
    options: props.chartOptions,
  })
})

watch(() => props.chartData, (newData) => {
  if (chartInstance) {
    chartInstance.data = newData
    chartInstance.update()
  }
}, { deep: true })
</script>
