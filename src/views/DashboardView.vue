<template>
  <v-app :theme="isDark ? 'dark' : 'light'">
    <v-container fluid>
      <!-- Metric Cards -->
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-card class="dashboard-card" :elevation="6">
            <v-card-title>Chicken Fed</v-card-title>
            <v-card-text class="display-1 font-weight-bold">{{ chickenFedTotal }}</v-card-text>
            <v-card-subtitle>Chickens fed today</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card class="dashboard-card" :elevation="6">
            <v-card-title>Total Feed (g)</v-card-title>
            <v-card-text class="display-1 font-weight-bold">{{ totalGrams }}g</v-card-text>
            <v-card-subtitle>Grams of feed consumed</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card class="dashboard-card" :elevation="6">
            <v-card-title>Mortality Rate</v-card-title>
            <v-card-text class="display-1 font-weight-bold">{{ mortalityRate }}%</v-card-text>
            <v-card-subtitle>Today’s loss rate</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <!-- Line Chart Section -->
      <v-row class="mt-4">
        <v-col cols="12" sm="10" md="8" class="mx-auto">
          <v-card class="pa-4" :elevation="6" style="height: 350px;">
            <canvas id="line-chart" style="width: 100%; height: 100%;"></canvas>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)
const toggleTheme = () => (isDark.value = !isDark.value)

const chickenFedTotal = 120
const totalGrams = 25000
const mortalityRate = 1.8

onMounted(() => {
  const ctx = document.getElementById('line-chart').getContext('2d')
  new window.Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Feed Consumed (g)',
        data: [2500, 2800, 3000, 3200, 3100, 3300, 3400],
        fill: false,
        borderColor: '#8d6e63',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  })
})
</script>

<style scoped>
.theme-btn {
  background: rgba(255, 255, 255, 0.15);
}

.dashboard-card {
  min-height: 180px;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.display-1 {
  font-size: 2.2rem;
}
</style>

<!--
Don't forget to add Chart.js CDN to your public/index.html:

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
-->
