/**
 * 目标1：设置频道下拉菜单
 *  1.1 获取频道列表数据
 *  1.2 展示到下拉菜单中
 */

function setChannleList(){
    axios({
        url:'/v1_0/channels'
    }).then(result=>{
        // console.log(result);
        const htmlStr = 
        '<option value="" selected="">请选择文章频道</option>'+
        result.data.channels.map(item=>{
            return`<option value="${item.id}">${item.name}</option>`
        }).join('')
        // console.log(htmlStr);
        document.querySelector('.form-select').innerHTML = htmlStr
    })
}
setChannleList()
/**
 * 目标2：文章封面设置
 *  2.1 准备标签结构和样式
 *  2.2 选择文件并保存在 FormData
 *  2.3 单独上传图片并得到图片 URL 网址
 *  2.4 回显并切换 img 标签展示（隐藏 + 号上传标签）
 */

document.querySelector('.img-file').addEventListener('change',async e=>{
    // console.log(e.target.files[0]);
    const file = e.target.files[0]
    const fd = new FormData()
    fd.append('image',file)
    const result = await axios({
        url:'/v1_0/upload',
        method:'POST',
        data:fd
    })
    // console.log(result);
    const imgUrl = result.data.url
    // src不是样式属性，不需要加style
    document.querySelector('.rounded').src = imgUrl;
    document.querySelector('.rounded').classList.add('show')
    document.querySelector('.place').classList.add('hide')
})
document.querySelector('.rounded').addEventListener('click',()=>{
    document.querySelector('.img-file').click()
})

/**
 * 目标3：发布文章保存
 *  3.1 基于 form-serialize 插件收集表单数据对象
 *  3.2 基于 axios 提交到服务器保存
 *  3.3 调用 Alert 警告框反馈结果给用户
 *  3.4 重置表单并跳转到列表页
 */
document.querySelector('.send').addEventListener('click',async e=>{
    if(e.target.innerHTML!=='发布') return 
    const form = document.querySelector('.art-form')
    const data = serialize(form,{hash:true,empty:true})
    // console.log(data);
    // 发布文章时，不需要ID属性，所以可以删除,(id为了后续做编辑使用)
    delete data.id
    // 自己收集封面地址并保存到data对象中
    // 对于收集不到的数据自己手动进行设置
    data.cover={
        type:1,//代表封面类型
        images:[document.querySelector('.rounded').src]//封面图片URL网址
    }

    //3.2 基于 axios 提交到服务器保存
    try{
        const res = await axios({
            url:'/v1_0/mp/articles',
            method:'POST',
            data:data
        })
        //3.3 调用 Alert 警告框反馈结果给用户
        myAlert(true,'发布成功')
        //3.4 重置表单并跳转到列表页
        form.reset()
        //封面需要手动重置
        document.querySelector('.rounded').src=''
        document.querySelector('.rounded').classList.remove('show')
        document.querySelector('.place').classList.remove('hide')
        //富文本编辑器重置
        editor.setHtml('')
        setTimeout(()=>{
            location.href = '../content/index.html'
        },1500)
    }
    catch(error){
        console.dir(error)
        myAlert(false,error.response.data.message)
    }
    
})
/**
 * 目标4：编辑-回显文章
 *  4.1 页面跳转传参（URL 查询参数方式）
 *  4.2 发布文章页面接收参数判断（共用同一套表单）
 *  4.3 修改标题和按钮文字
 *  4.4 获取文章详情数据并回显表单
 */
;(function(){
    console.log(location.search);
    const paramsStr = location.search
    const params = new URLSearchParams(paramsStr)
    params.forEach(async (value,key)=>{
        console.log(value,key);
        if(key==='id'){
            //表明是修改文章操作
            document.querySelector('.title span').innerHTML = '修改文章'
            document.querySelector('.send').innerHTML = '修改'
            const res = await axios({
                url:`/v1_0/mp/articles/${value}`
            })
            const dataObj = {
                channel_id:res.data.channel_id,
                content:res.data.content,
                id:res.data.id,
                title:res.data.title,
                rounded:res.data.cover.images[0]
            }
           Object.keys(dataObj).forEach(key=>{
                if(key==='rounded'){
                    //封面设置
                    if(dataObj[key]){
                        //有封面
                        document.querySelector('.rounded').src = dataObj[key]
                        document.querySelector('.rounded').classList.add('show')
                        document.querySelector('.place').classList.add('hide')
                    }
                }
                else if(key==='content'){
                    //富文本设置内容
                    editor.setHtml(dataObj[key])
                }
                //其他可通过value属性直接赋值
                else{
                    document.querySelector(`[name=${key}]`).value = dataObj[key]
                }
           })
        }
    })
})();




/**
 * 目标5：编辑-保存文章
 *  5.1 判断按钮文字，区分业务（因为共用一套表单）（判断是修改还是发布）
 *  5.2 调用编辑文章接口，保存信息到服务器
 *  5.3 基于 Alert 反馈结果消息给用户
 */
document.querySelector('.send').addEventListener('click',async e=>{
    if(e.target.innerHTML!=='修改')return
    //修改文章逻辑
    const form = document.querySelector('.art-form')
    const data = serialize(form,{hash:true,empty:true})
    //console.log(data);
    //5.2 调用编辑文章接口，保存信息到服务器
    try{
        const res = await axios({
            url:`/v1_0/mp/articles/${data.id}`,
            method:'PUT',
            data:{
                ...data,
                cover:{
                    type:document.querySelector('.rounded').src ? 1 : 0,
                    images:[document.querySelector('.rounded').src]
                }
            }
        })
        //5.3 基于 Alert 反馈结果消息给用户
        myAlert(true,res.message)
    }
    catch(error){
        myAlert(false,error.response.data.message)
    }
    // console.log(res.message);
    // myAlert(true,res.message)
})
