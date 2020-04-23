import xss from 'xss'

const myXSS = new xss.FilterXSS({
  whiteList: {}
})

export function processXSS(text) {
  return myXSS.process(text)
}
