const IMG_URL = process.env.IMG_URL
export default {
  bgImage(el, binding) {
    el.style.backgroundImage = `url(${IMG_URL}${binding.value})`
    el.style.backgroundRepeat = 'no-repeat'
    el.style.backgroundSize = 'cover'
    el.style.backgroundPosition = 'center'
  }
}
