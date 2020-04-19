<template>
  <div class="custom-weather-item-com">
    <div class="weather-item-wrapper">
      <div class="info">
        <div class="icon">
          <i style="font-size: 40px" :class="'icon iconfont'+ ' ' + outCome['iconclass']"></i>
        </div>
        <div class="temperature">
          <p class="type">{{city}}&nbsp;{{outCome.type}}</p>
          <span>{{outCome.low}}-{{outCome.high}}</span>
        </div>
      </div>
      <div class="time">
        <span>{{outCome.date}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils'
import { weatherMap, weekNumZHMap } from '@/const'
const weatherMapKeys = Object.keys(weatherMap)
export default {
  props: {
    weather: {
      type: Object,
      default() {
        return {"date":"8日星期六","high":"高温 11℃","fx":"无持续风向","low":"低温 7℃","fl":"<![CDATA[<3级]]>","type":"小雨"}
      }
    },
    city: {
      type: String
    }
  },
  computed: {
    outCome() {
      let res = {...this.weather}
      weatherMapKeys.forEach(item => {
        if ((item || []).includes(res.type)) {
          res.iconclass = weatherMap[item]
        }
      })
      res.date = formatDate(new Date(), 'YYYY-MM') + '-' +res.date
      res.high = res.high.split(' ')[1]
      res.low = res.low.split(' ')[1]
      return res
    },
    time() {
      const date = new Date().getDay()
      const week = weekNumZHMap[date]
      return formatDate(new Date(), 'YYYY-MM-DD') + ' ' + week
    }
  },
}
</script>

<style lang="scss">
.custom-weather-item-com {
  @import './../../../static/iconfont/iconfont.css';
  background-color: #fff;
  margin-top: 10px;
  border-radius: 5px;
  .weather-item-wrapper {
    padding: 5px;
    .info {
      display: flex;
      align-items: flex-end;
      .temperature {
        margin-left: 5px;
        .type {
          margin: 0;
        }
      }
    }
    .time {
      margin-top: 5px;
    }
  }
}
</style>
