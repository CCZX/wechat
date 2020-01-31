<template>
  <div class="err-page">
    <div class="bubbling">页面走丢了（╯－＿－），访问其他页面试试吧(ง •̀_•́)ง</div>
    <el-button class="back" type="primary" plain @click="$router.go(-1)">返回上一级</el-button>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    bubble() {
      const requestInterval = (fn, delay) => {
        let start = new Date().getTime();
        let handle = { value: 0 };
        let loop = () => {
          handle.value = requestAnimationFrame(loop);
          let current = new Date().getTime();
          let delta = current - start;
          if (delta >= delay) {
            fn();
            start = new Date().getTime();
          }
        };
        handle.value = requestAnimationFrame(loop);
        return handle;
      }
      const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]

      let bubbleSizes = [5, 10, 15, 20]
      let bubbleText = document.querySelector(".bubbling")
      let bubblePositions = Array.from(
        Array(bubbleText.offsetWidth).keys()
      )
      requestInterval(() => {
        let bubbleSize = sample(bubbleSizes)
        let bubblePosition = sample(bubblePositions)
        let bubble = document.createElement("div")
        bubble.className = "bubble"
        bubble.style.width = `${bubbleSize}px`
        bubble.style.height = `${bubbleSize}px`
        bubble.style.left = `${bubblePosition}px`
        bubbleText.append(bubble)
        let bubbleAnimation = bubble.animate(
          [{ bottom: "10px", opacity: 1 }, { bottom: "180%", opacity: 0.6 }],
          {
            fill: "forwards",
            duration: 5000
          }
        )
        bubbleAnimation.onfinish = () => bubble.remove()
      }, 300)
      }
  },
  mounted() {
    this.bubble()
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Bubblegum+Sans&display=swap');
.err-page {
  display: flex;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #3498db;
  .bubbling {
    position: relative;
    z-index: 2;
    display: inline-block;
    color: white;
    font-size: 2.5rem;
    font-family: 'Bubblegum Sans', cursive;
    font-weight: bold;
    text-transform: uppercase;
  }
  .bubble {
    position: absolute;
    background: white;
    border-radius: 100%;
  }
  .back {
    margin-top: 30px;
    &:hover {
      color: #409EFF !important;
      background-color: #ecf5ff !important;
      border-color: #b3d8ff !important;
    }
  }
}
</style>


