/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */
function myweather(citycode){
    //1.1 获取北京市天气数据
    myAxios({
        url:'http://hmajax.itheima.net/api/weather',
        params:{
            city:citycode
        }
    }).then(result=>{
        console.log(result);
        const weatherObj = result.data
        //1.2 数据展示到页面(从上到小，从左到右)
        //阳历和农历日期
        const dateStr=`<span class="dateShort">${weatherObj.dateShort}</span>
        <span class="calendar">农历&nbsp;<span class="dateLunar">${weatherObj.dateLunar}</span>
        </span>`
        document.querySelector('.title').innerHTML = dateStr
        // 城市名字
        document.querySelector('.area').innerHTML = weatherObj.area
        // 当天气温
        const nowWStr = `<div class="tem-box">
        <span class="temp">
          <span class="temperature">${weatherObj.temperature}</span>
          <span>°</span>
        </span>
      </div>
      <div class="climate-box">
        <div class="air">
          <span class="psPm25">${weatherObj.psPm25}</span>
          <span class="psPm25Level">${weatherObj.psPm25Level}</span>
        </div>
        <ul class="weather-list">
          <li>
            <img src=${weatherObj.weatherImg} class="weatherImg" alt="">
            <span class="weather">${weatherObj.weather}</span>
          </li>
          <li class="windDirection">${weatherObj.windDirection}</li>
          <li class="windPower">${weatherObj.windPower}</li>
        </ul>
      </div>`
      document.querySelector('.weather-box').innerHTML = nowWStr
      //当天天气
      const nowWeather = `<div class="range-box">
        <span>今天：</span>
        <span class="range">
          <span class="weather">${weatherObj.todayWeather.weather}</span>
          <span class="temNight">${weatherObj.todayWeather.temNight}</span>
          <span>-</span>
          <span class="temDay">${weatherObj.todayWeather.temDay}</span>
          <span>℃</span>
        </span>
      </div>
      <ul class="sun-list">
        <li>
          <span>紫外线</span>
          <span class="ultraviolet">${weatherObj.todayWeather.ultraviolet}</span>
        </li>
        <li>
          <span>湿度</span>
          <span class="humidity">${weatherObj.todayWeather.humidity}</span>%
        </li>
        <li>
          <span>日出</span>
          <span class="sunriseTime">${weatherObj.todayWeather.sunriseTime}</span>
        </li>
        <li>
          <span>日落</span>
          <span class="sunsetTime">${weatherObj.todayWeather.sunsetTime}</span>
        </li>
      </ul>`
      document.querySelector('.today-weather').innerHTML = nowWeather
      //一周内的天气
      const dayForecast = weatherObj.dayForecast
      const DayForecast = dayForecast.map(item=>{
      return `<li class="item">
        <div class="date-box">
          <span class="dateFormat">${item.dateFormat}</span>
          <span class="date">${item.date}</span>
        </div>
        <img src=${item.weatherImg} alt="" class="weatherImg">
        <span class="weather">${item.weather}</span>
        <div class="temp">
          <span class="temNight">${item.temNight}</span>-
          <span class="temDay">${item.temDay}</span>
          <span>℃</span>
        </div>
        <div class="wind">
          <span class="windDirection">${item.windDirection}</span>
          <span class="windPower">&lt;${item.windPower}</span>
        </div>
      </li>`
      }).join('')
    //   console.log(DayForecast);
      document.querySelector('.week-wrap').innerHTML = DayForecast
    })
}
//默认进入网页-就要获取天气数据(北京城市编码：‘110100’)
myweather('110100')
/**
 * 目标2：根据关键字，展示匹配城市列表
 *  2.1 绑定input事件，获取关键字
 *  2.2 获取展示城市列表数据
 */
document.querySelector('.search-city').addEventListener('input',(e)=>{
    console.log(e.target.value);
    myAxios({
        url:'http://hmajax.itheima.net/api/weather/city',
        params:{
            city:e.target.value
        }
    }).then(result=>{
        console.log(result);
        const citys = result.data
        const Citys = citys.map(item=>{
            return `<li class="city-item" data-code="${item.code}">${item.name}</li>`
        }).join('')
        document.querySelector('.search-list').innerHTML = Citys
    })
})
/**
 * 目标3：切换城市天气
 *  3.1 检测搜索列表点击事件，获取城市code值
 *  3.2 复用获取展示城市天气函数
 *  小li是动态变化的，要给动态变化的东西绑定事件，要用到事件委托，用其静态的父亲进行代替绑定
 *  技巧：利用自定义属性将code放到li上，方便下面进行获取
 */
document.querySelector('.search-list').addEventListener('click',e=>{
    // console.log(e.target);//点击的那个li标签
    if(e.target.classList.contains('city-item')){
        //只有点击城市li才会走到这里
        const citycode = e.target.dataset.code
        console.log(citycode);
        // 3.2 复用获取展示城市天气函数
        myweather(citycode)
    }
})