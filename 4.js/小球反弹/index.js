// @ts-nocheck
let ball = document.querySelector('.ball')
let disX = 1
let disY = 1
// 获取当前可视窗口的宽高
let w = document.documentElement.clientWidth
let h = document.documentElement.clientHeight
// 获取小球的宽高
let ballw = ball.offsetWidth
let ballh = ball.offsetHeight
// 最大左移距离，最大下移距离
let MaxLeft = w-ballw
let MaxTop = h-ballh

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min))+min
}

// 每次碰撞随机改变背景颜色
function changeBg() {
    const r = getRandom(0,255)
    const g = getRandom(0,255)
    const b = getRandom(0,255)
    ball.style.backgroundColor = `rgb(${r},${g},${b})`
}
setInterval(()=>{
    let rect = ball?.getBoundingClientRect()
    let OriginalX = rect?.left
    let OriginalY = rect?.top
    // 要移动到哪
    let moveToX = OriginalX + disX 
    let moveToY = OriginalY + disY
    if(moveToX>=MaxLeft){
        moveToX=MaxLeft
        disX = -disX
        changeBg()
    }
    if(moveToX<0){
        moveToX = 0
        disX = -disX
        changeBg()
    }
    if(moveToY>=MaxTop){
        moveToY=MaxTop
        disY = -disY
        changeBg()
    }
    if(moveToY<0){
        moveToY=0
        disY = -disY
        changeBg()
    }
    ball.style.left = moveToX + 'px'
    ball.style.top = moveToY + 'px'
},5)