/**
 * 目标1：获取文章列表并展示
 *  1.1 准备查询参数对象
 *  1.2 获取文章列表数据
 *  1.3 展示到指定的标签结构中
 */
const queryObj = {
    staus:'',//文章状态(1-待审核，2-审核通过)空字符串-全部
    channel_id:'',//文章频道id,空字符串-全部
    page:1,//当前页码
    per_page:2,//当前页面条数
}
let totalCount = 0//保存文章总条数
async function setArticallist(){
    try{
        //获取文章列表数据
        const res = await axios({
            url:'/v1_0/mp/articles',
            params:queryObj
        })
        console.log(res);
        // console.log(res.data.total_count);
        totalCount = res.data.total_count
        const htmlStr = res.data.results.map(item=>{
            return`<tr>
            <td>
              <img src=${item.cover.type===1?item.cover.images[0]:`"https://img2.baidu.com/it/u=2640406343,1419332367&amp;fm=253&amp;fmt=auto&amp;app=138&amp;f=JPEG?w=708&amp;h=500"`} alt="">
            </td>
            <td>${item.title}</td>
            <td>
              ${item.staus===1?`<span class="badge text-bg-success">审核通过</span>`:`<span class="badge text-bg-primary">待审核</span>`}
            </td>
            <td>
              <span>${item.pubdate}</span>
            </td>
            <td>
              <span>${item.read_count}</span>
            </td>
            <td>
              <span>${item.comment_count}</span>
            </td>
            <td>
              <span>${item.like_count}</span>
            </td>
            <td data-id=${item.id}>
              <i class="bi bi-pencil-square edit"></i>
              <i class="bi bi-trash3 del"></i>
            </td>
          </tr>`
        }).join('')
        // console.log(htmlStr);
        document.querySelector('.art-list').innerHTML = htmlStr
    }
    catch(error){
        console.dir(error);
    }
    // console.log(res);
}
setArticallist()
/**
 * 目标2：筛选文章列表
 *  2.1 设置频道列表数据
 *  2.2 监听筛选条件改变，保存查询信息到查询参数对象
 *  2.3 点击筛选时，传递查询参数对象到服务器
 *  2.4 获取匹配数据，覆盖到页面展示
 */
//2.1 设置频道列表数据
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
//2.2 监听筛选条件改变，保存查询信息到查询参数对象
//筛选状态标记数字->change事件->绑定到查询参数对象上
document.querySelectorAll('.form-check-input').forEach(radio=>{
    radio.addEventListener('change',e=>{
        //console.log(e.target.value);
        // 空值->全部 1->待审核 2->审核通过 
        queryObj.staus = e.target.value
    })
})
//获取频道id->change事件->绑定到查询参数对象上
document.querySelector('.form-select').addEventListener('change',e=>{
    //console.log(e.target.value);
    queryObj.channel_id = e.target.value
})
//2.3 点击筛选时，传递查询参数对象到服务器
document.querySelector('.sel-btn').addEventListener('click',()=>{
    //2.4 获取匹配数据，覆盖到页面展示
    setArticallist()
})
/**
 * 目标3：分页功能
 *  3.1 保存并设置文章总条数
 *  3.2 点击下一页，做临界值判断，并切换页码参数并请求最新数据
 *  3.3 点击上一页，做临界值判断，并切换页码参数并请求最新数据
 */
document.querySelector('.next').addEventListener('click',()=>{
    console.log(totalCount);
    if(queryObj.page<Math.ceil(totalCount/queryObj.per_page)){
        queryObj.page++;
        document.querySelector('.page-now').innerHTML = `第${queryObj.page}页`
        setArticallist();
    }
})
document.querySelector('.last').addEventListener('click',()=>{
    //页码大于1，才能翻到上一页
    if(queryObj.page>1){
        queryObj.page--;
        document.querySelector('.page-now').innerHTML = `第${queryObj.page}页`
        setArticallist();
    }
})
/**
 * 目标4：删除功能
 *  4.1 关联文章 id 到删除图标
 *  4.2 点击删除时，获取文章 id
 *  4.3 调用删除接口，传递文章 id 到服务器
 *  4.4 重新获取文章列表，并覆盖展示
 *  4.5 删除最后一页的最后一条，需要自动向前翻页
 */
//4.1 关联文章 id 到删除图标(上面插入元素时进行绑定)
//4.2 点击删除时，获取文章 id
document.querySelector('.art-list').addEventListener('click',async e=>{
    // 判断点击的是删除元素
    // console.log(e.target.classList);
    if (e.target.classList.contains('del')) {
        // 注意不能写data-id，要写dataset.id
        const delid = e.target.parentNode.dataset.id
        // console.log(delid);
        //4.3 调用删除接口，传递文章 id 到服务器
        const res = await axios({
            url:`/v1_0/mp/articles/${delid}`,
            method:'DELETE'
        })
        // console.log(res);
        //4.5删除最后一页的最后一条，需要自动向前翻页(要不然就不会有文章显示)
        const children = document.querySelector('.art-list').children
        if(children.length===1&&queryObj.page!==1){
            queryObj.page--;
            document.querySelector('.page-now').innerHTML = `第${queryObj.page}页`
        }
        //4.4 重新获取文章列表，并覆盖展示
        setArticallist()
    }
})
// 点击编辑时，获取文章 id，跳转到发布文章页面传递文章 id 过去
document.querySelector('.art-list').addEventListener('click',e=>{
    if(e.target.classList.contains('edit')){
        const id = e.target.parentNode.dataset.id
        console.log(id);
        location.href=`../publish/index.html?id=${id}`
    }
})

