import { Message } from 'element-ui'
const IMG_URL = process.env.IMG_URL
export default {
  /**
   * 为元素设置行内CSS样式
   * @param {HTMLDataElement} el 
   * @param {Object} binding binding的value也是是一个对象如：{width: 100px, height: 20px}
   */
  css(el, binding) {
    const { value } = binding
    const valueEntries = Object.entries(value)
    for (const [key, value] of valueEntries) {
      el.style[key] = value
      if (key === 'background-image' || key === 'backgroundImage') {
        el.style.backgroundRepeat = 'no-repeat'
        el.style.backgroundSize = 'cover'
      }
    }
  },
  bgImage(el, binding) {
    el.style.backgroundImage = `url(${IMG_URL}${binding.value})`
    el.style.backgroundRepeat = 'no-repeat'
    el.style.backgroundSize = 'cover'
    el.style.backgroundPosition = 'center'
  },
  copy: {
    bind(el, { value }) {
      el.$value = value
      el.handler = () => {
        if (!el.$value) {
          return
        }
        const textarea = document.createElement('textarea')
        textarea.readOnly = 'readonly'
        textarea.style.position = 'absolute'
        textarea.style.left = '-9999px'
        textarea.value = el.$value
        document.body.appendChild(textarea)
        textarea.select()
        textarea.setSelectionRange(0, textarea.value.length)
        const result = document.execCommand('Copy')
        if (result) {
          Message.success('复制成功！')
        }
        document.body.removeChild(textarea)
      }
      el.addEventListener('click', el.handler)
    },
  }
}
