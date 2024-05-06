// @ts-nocheck
// 让便签可被拖动，但不能超出视口

let moveBar = document.querySelector('.move-bar');
let note = document.querySelector('.note')
moveBar?.addEventListener('mousedown',function MouseDown(e) {
    // 鼠标按下后，监听鼠标移动 （最好是在整个屏幕上监听移动）
    // moveBar?.addEventListener('mousemove',()=>{
    //     console.log('鼠标在移动')
    // })

    // 鼠标按下时的位置
    let mouseDownX = e.clientX
    let mouseDownY = e.clientY
    // 便签元素本身存在的位置
    let rect = moveBar.getBoundingClientRect()
    console.log(rect)
    let noteLeft = rect.left
    let noteTop = rect.top
    // 整个视口的宽高,元素的宽高
    let nw = note.offsetWidth
    let nh = note.offsetHeight
    let w = document.documentElement.clientWidth
    let h = document.documentElement.clientHeight
    window.addEventListener('mousemove',MouseMove)
    function MouseMove(e){
        // console.log('鼠标在移动')
        //鼠标移动时的位置
        let mouseMoveX = e.clientX
        let mouseMoveY = e.clientY
        let subX = mouseMoveX-mouseDownX
        let subY = mouseMoveY-mouseDownY
        let x = noteLeft+subX
        let y = noteTop+subY
        if(x<0){
            x=0
        }
        if(x>w-nw)
        {
            x=w-nw
        }
        if(y<0){
            y=0
        }
        if(y>h-nh){
            y=h-nh
        }
        note.style.left = x + 'px'
        note.style.top = y + 'px'
    }
    // 鼠标抬起后，不再监听鼠标移动和抬起
    // moveBar?.addEventListener('mouseup',()=>{
    //     console.log('不再监听移动和抬起')
    // })
    window.addEventListener('mouseup',function MouseUp(){
        // console.log('不再监听移动和抬起')
        window.removeEventListener('mousemove',MouseMove)
        window.removeEventListener('mouseup',MouseUp)
    })
})