// 生成验证码
export function createCanvas(value, dom, imgUrl, loadedCb) {
  const tempArr = value.split('')
  const canvasStr = tempArr.join(' ')
  const canvas = dom
  const ctx = canvas.getContext('2d')
  const x = canvas.width / 2
  const oImg = new Image()
  oImg.src = imgUrl
  oImg.width = 120
  oImg.width = 40
  oImg.onload = function () {
    loadedCb && typeof(loadedCb) === 'function' && loadedCb()
    const pattern = ctx.createPattern(oImg,'repeat');//在指定的方向内重复指定的元素
    ctx.fillStyle = pattern;//填充绘画的颜色
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.textAlign = 'center';
    ctx.fillStyle = '	#DC143C';
    ctx.font = '26px Roboto Slab';
    ctx.setTransform (1, -0.12, 0.2, 1, 0, 0);
    ctx.fillText(canvasStr, x, 40);
  }
}
