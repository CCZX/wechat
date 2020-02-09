<template>
  <div class="custom-weather-com">
    <div class="weather-wrapper">
      <!-- <weather-item /> -->
      <weather-item v-for="(item, index) in weatherList.slice(0, 3)" :key="index" :weather="item" />
    </div>
  </div>
</template>

<script>
import weatherItem from './item'
export default {
  data() {
    return {
      weatherList: []
    }
  },
  methods: {
    getWeather() {
      this.$http.getWeather('成都').then(res => {
        if (res.status < 400) {
          const { data } = res
          const { data: weatherInfo } = data
          this.weatherList = [weatherInfo.yesterday,...weatherInfo.forecast]
        }
      })
    }
  },
  components: {
    weatherItem
  },
  created() {
    this.getWeather()
  },
}
</script>

