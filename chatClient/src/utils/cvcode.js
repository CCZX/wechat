// 生成验证码
export function createCanvas(value, dom, imgUrl) {
  let tempArr = value.split('')
  let canvasStr = tempArr.join(' ')
  let canvas = dom
  let ctx = canvas.getContext('2d')
  let x = canvas.width / 2
  let oImg = new Image()
  oImg.src = imgUrl
  oImg.width = 120
  oImg.width = 40
  oImg.onload = function () {
    var pattern = ctx.createPattern(oImg,'repeat');//在指定的方向内重复指定的元素
    ctx.fillStyle = pattern;//填充绘画的颜色
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.textAlign = 'center';
    ctx.fillStyle = '	#DC143C';
    ctx.font = '26px Roboto Slab';
    ctx.setTransform (1, -0.12, 0.2, 1, 0, 0);
    ctx.fillText(canvasStr, x, 40);
  }
}
