/**
 * 目标1：完成省市区下拉列表切换
 *  1.1 设置省份下拉菜单数据
 *  1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
 *  1.3 切换城市，设置地区下拉菜单数据
 */
// 1.1 设置省份下拉菜单数据
axios({
    url:'http://hmajax.itheima.net/api/province'
}).then(result=>{
    console.log(result);
    const provinces = result.data.list
    const province_str = provinces.map(item=>{
        //value中绑定省份的名字，给下面的使用
        return `<option value="${item}">${item}</option>`
    }).join('')
    document.querySelector('.province').innerHTML = '<option value="">省份</option>'+province_str
})

//  1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
document.querySelector('.province').addEventListener('change',(e)=>{
    console.log(e.target.value);
    pname = e.target.value
    axios({
        url:'http://hmajax.itheima.net/api/city',
        params:{
            pname:e.target.value
        }
    }).then(result=>{
        console.log(result);
        const citys = result.data.list
        const city_str = citys.map(item=>{
            //value中绑定省份的名字，给下面的使用
            return `<option value="${item}">${item}</option>`
        }).join('')
        document.querySelector('.city').innerHTML = '<option value="">城市</option>'+city_str
    })
    //清空地区数据
    document.querySelector('.area').innerHTML = '<option value="">地区</option>'
})

// 1.3 切换城市，设置地区下拉菜单数据
document.querySelector('.city').addEventListener('change',(e)=>{
    console.log(e.target.value);
    axios({
        url:'http://hmajax.itheima.net/api/area',
        params:{
            // 小技巧：可以不用全局变量
            pname:document.querySelector('.province').value,
            cname:e.target.value
        }
    }).then(result=>{
        console.log(result);
        const areas = result.data.list
        const area_str = areas.map(item=>{
            //value中绑定省份的名字，给下面的使用
            return `<option value="${item}">${item}</option>`
        }).join('')
        document.querySelector('.area').innerHTML = area_str
    })
})

/**
 * 目标2：收集学习反馈数据，提交保存
 *  2.1 监听提交按钮的点击事件
 *  2.2 依靠插件收集表单数据
 *  2.3 基于axios提交保存，显示结果
 */
// 2.1 监听提交按钮的点击事件
// 这里使用async await代替axios后面的then
document.querySelector('.submit').addEventListener('click',async ()=>{
    //2.2 依靠插件收集表单数据
    const form = document.querySelector('.info-form')
    const data = serialize(form,{hash:true,empty:true})
    console.log(data);
    //2.3 基于axios提交保存，显示结果
    try{
        const result = await axios({
            url:'http://hmajax.itheima.net/api/feedback',
            method:'POST',
            data:data
        })
        console.log(result);
        alert(result.data.message)
    }catch(error){
        console.dir(error)
        alert(error.response.data.message)
    }
})