import xss from 'xss'

const myXSS = new xss.FilterXSS({
  whiteList: {}
})

export default function processXSS(text) {
  return myXSS.process(text)
}
