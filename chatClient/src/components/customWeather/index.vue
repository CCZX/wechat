<template>
  <div class="custom-weather-com">
    <div class="weather-wrapper">
      <!-- <weather-item /> -->
      <weather-item v-for="(item, index) in weatherList.slice(0, 3)" :key="index" :weather="item" :city="userInfo.city.name" />
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
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    getWeather() {
      const city = this.userInfo.city.name
      if (city) {
        this.$http.getWeather(this.userInfo.city.name).then(res => {
          if (res.status < 400) {
            const { data } = res
            const { data: weatherInfo } = data
            this.weatherList = [weatherInfo.yesterday,...weatherInfo.forecast]
          }
        })
      }
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

