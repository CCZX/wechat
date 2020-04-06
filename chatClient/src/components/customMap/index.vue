<template>
    <div class="amap-page-container">
      <!-- <el-amap ref="map" vid="amapDemo" :amap-manager="AmapManager" :center="center" :zoom="zoom" :plugin="plugin" :events="events" class="amap-demo">
      </el-amap>

      <div class="toolbar">
        <button @click="getMap()">get map</button>
      </div> -->
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>

  <script>
    // NPM 方式
    import AMap from 'vue-amap'
    import { AMapManager } from 'vue-amap';
    // CDN 方式
    // let AmapManager = new VueAMap.AMapManager();
    export default {
      methods: {
        initWeather(city) {
                let that = this;
                AMap.plugin('AMap.Weather', function() {
                    //创建天气查询实例
                    let weather = new AMap.Weather();
                    //执行实时天气信息查询
                    weather.getLive(city, function(err, data) {
//                        console.log(err, data);
                        that.LiveWeather = data;
                        console.log('11111111111111', data)
                        // that.getWeatherType(data.weather);
                    });
                    // 查询三天天气
//                     weather.getForecast(city, function(err, data) {
// //                        console.log(err, data);
//                         that.WeatherInfo = data.forecasts;
//                     });
                });
            },
      },
      created() {
        this.initWeather()
      },
    };
</script>