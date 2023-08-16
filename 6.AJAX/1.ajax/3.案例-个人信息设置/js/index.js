/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
const creator = '播仔'
//1.1 获取用户的数据
axios({
    url:'http://hmajax.itheima.net/api/settings',
    params:{
        creator:creator
    }
}).then(result=>{
    console.log(result.data.data);
    const userObj = result.data.data;
    //1.2 回显数据到标签上
    //头像和单选框的属性名与拿到的不一致，因此需要单独处理
    Object.keys(userObj).forEach(key=>{
        if(key==='avatar'){
            //赋予默认头像
            document.querySelector('.prew').src = userObj[key]
        }
        else if(key==='gender'){
            //赋予默认姓名
            //获取性别单选框：[男radio元素，女radio元素]
            const gRadioList = document.querySelectorAll('.gender')
            //获取性别数字，0男1女
            const gnum = userObj[key]
            //通过性别数字，作为下标找到性别单选框，设置选中状态
            gRadioList[gnum].checked = 'true'
        }
        else{
            //赋予默认内容
            document.querySelector(`.${key}`).value= userObj[key]
        }
    })
})

/**
 * 目标2：修改头像
 *  2.1 获取头像文件
 *  2.2 提交服务器并更新头像
 * */
document.querySelector('.upload').addEventListener('change',e=>{
    console.log(e.target.files[0]);
    const fd = new FormData();
    fd.append('avatar',e.target.files[0])
    //更新某一个用户所属的头像，所以需要携带是哪个用户的信息
    fd.append('creator',creator)
    axios({
        url:'http://hmajax.itheima.net/api/avatar',
        method:'PUT',
        data:fd
    }).then(result=>{
        console.log(result);
        const imgurl = result.data.data.avatar
        document.querySelector('.prew').src = imgurl
    })
})

/**
 * 目标3：信息修改
 *  3.1 收集表单
 *  3.2 提交服务器保存
 * */
document.querySelector('.submit').addEventListener('click',()=>{
    // 3.1 收集表单,根据表单中的name属性进行收集的
    const userform = document.querySelector('.user-form')
    const userobj = serialize(userform,{hash:true,empty:true})
    console.log(userobj);
    //3.2 提交服务器保存，性别数字字符串，转成数字类型
    userobj.gender = +userobj.gender
    axios({
        url:'http://hmajax.itheima.net/api/settings',
        method:'PUT',
        data:{
            ...userobj,
            creator
        }
    }).then(result=>{
        /**
         * 目标4：提示框
         * 1.创建toast对象
         * 2.调用show方法显示
         * */
        console.log(result);
        const toastdom = document.querySelector('.my-toast')
        const toast = new bootstrap.Toast(toastdom)
        toast.show()

    })
})

