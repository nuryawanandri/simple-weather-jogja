var contentElem = document.getElementById('content')
var appsId = '00b4386580d5c7afcb7b37f31a2cbad8'
var cityId = '1621177'
var cityElem = document.getElementById('city')
var iconElem = document.getElementById('icon')
var tempElem = document.getElementById('temp')
var weatherPagi = document.getElementById('weather-pagi')
var contentElem = document.getElementById('content')
// var containerElem = document.getElementById('container')
var uRl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${appsId}&units=metric`
var uRlForecast = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${appsId}&units=metric`
var currentDate = new Date()
var daysName = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
var hoursName = ['Pagi', 'Siang', 'Sore', 'Malam']
var unixTimeDiff = 1000
var weather = []
var weatherByDay = []

getDataWeather()
getDataForecast()

function getDataWeather () {
  fetch(uRl)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log('data response : ', data)
      render(data)
    })
    .catch((data) => {
      console.log('data error : ', data)
    })
}

function getDataForecast () {
  fetch(uRlForecast)
    .then((response) => {
      return response.json()
    })
    .then((dataForecast) => {
      console.log('data forecast : ', dataForecast)
      console.log('date : ', new Date(dataForecast.list[0].dt*unixTimeDiff))
      // renderDetail(dataForecast)
      storeData(dataForecast)
    }) 
}

function render(data) {
  cityElem.textContent = data.name
  iconElem.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
  tempElem.textContent = `${data.main.temp}${String.fromCharCode(176)}C`
  document.getElementById('desc').textContent = data.weather[0].description
  document.getElementById('humidity').textContent = `${data.main.humidity}%`
}

function storeData(dataForecast) {
  // console.log('weather : ', weather)
  dataForecast.list.map((data, index) => {
    var dt = new Date(data.dt*1000)
    var dayNumber = dt.getDay()
    var date = dt.getDate()
    if (date < 10) {
      date = `0${date}`
    }
    var month = dt.getMonth()
    if (month < 10) {
      month = `0${month}`
    }
    var year = dt.getFullYear()
    var fullDate = `${date}-${month}-${year}`
    // var filteredWeather = weatherByDay.filter((dataWeather) => {
    //   // console.log('dataWeather: ', dataWeather.date_txt,`${year}-${month}-${date}` )
    //   return dataWeather.date_txt.match(`-${date}`)
    // })
    var fileredWeather = weatherByDay.findIndex((dataWeather) => {
      return dataWeather.date_txt == fullDate
    })
    if (weatherByDay[fileredWeather] == undefined) {
      weatherByDay.push({ 
        date_txt: fullDate,
        date: dt,
        day: dayNumber,
        link: []
       })
    } else {
      if (dt.getHours() < 10 && weatherByDay[fileredWeather].link[0] == undefined) {
        weatherByDay[fileredWeather].link.push({
          date: data.dt,
          temp: data.main.temp,
          humidity: data.main.humidity,
          weatherMain: data.weather[0].description  
        })
      } else if (dt.getHours() < 15 && weatherByDay[fileredWeather].link[1] == undefined) {
        weatherByDay[fileredWeather].link.push({
          date: data.dt,
          temp: data.main.temp,
          humidity: data.main.humidity,
          weatherMain: data.weather[0].description  
        })
      } else if (dt.getHours() < 19 && weatherByDay[fileredWeather].link[2] == undefined) {
        weatherByDay[fileredWeather].link.push({
          date: data.dt,
          temp: data.main.temp,
          humidity: data.main.humidity,
          weatherMain: data.weather[0].description  
        })
      } else if (dt.getHours() < 23 && weatherByDay[fileredWeather].link[3] == undefined) {
        weatherByDay[fileredWeather].link.push({
          date: data.dt,
          temp: data.main.temp,
          humidity: data.main.humidity,
          weatherMain: data.weather[0].description  
        })
      }
    }

    weather.push({
      date: data.dt,
      date_txt: data.dt_txt,
      temp: data.main.temp,
      humidity: data.main.humidity,
      weatherMain: data.weather[0].main
    })
  })
  console.log('weatherByDay : ', weatherByDay)
  // var filteredWeather = weather.filter((weather) => weather.date == 1537498800 )
  // weather.map((weather, index) => {
  //   renderDetail(weather)
  // })
  weatherByDay.map((weather, index) => {
    renderDetail(weather)
  })
}

function renderDetail(weather) {
  var dateDays = new Date(weather.date * unixTimeDiff)
  var sectionDays = document.createElement('section')
  sectionDays.setAttribute('class', 'container')
  sectionDays.id = 'container'
  var h2title = document.createElement('h2')
  h2title.textContent = `Hari ${daysName[weather.day]} tanggal : ${weather.date_txt}`
  weather.link.map((data) => {
    var dateData = new Date(data.date*unixTimeDiff)

    var dayTemp = document.createElement('div')
    dayTemp.setAttribute('class', 'days-temp')
    
    var weather = document.createElement('div')
    weather.setAttribute('class', 'weather forecast')

    // var h3 = document.createElement('h3')

    var detailWeather = document.createElement('div')
    detailWeather.setAttribute('class', 'detailWeather')
    var img = document.createElement('img')
    img.setAttribute('src', 'https://openweathermap.org/img/w/02d.png')
    var spanTemp = document.createElement('span')
    spanTemp.setAttribute('class', 'temp')
    spanTemp.textContent = `${data.temp}${String.fromCharCode(176)}C`
    detailWeather.appendChild(img)
    detailWeather.appendChild(spanTemp)
    
    var desc = document.createElement('div')
    desc.setAttribute('class', 'desc')
    desc.textContent = `Descripsi :`
    var spanDesc = document.createElement('span')
    spanDesc.textContent = `${data.weatherMain}`
    desc.appendChild(spanDesc)
    var humidity = document.createElement('div')
    humidity.setAttribute('class', 'desc')
    humidity.textContent = 'Humidity : '
    var spanHumid = document.createElement('span')
    spanHumid.textContent = `${data.humidity}%`
    humidity.appendChild(spanHumid) 
    var hours = document.createElement('span')
    hours.setAttribute('class', 'desc')
    hours.textContent = 'Waktu : '
    var spanHours = document.createElement('span')
    if (dateData.getHours() < 10) {
      spanHours.textContent = `0${dateData.getHours()} : 00`
    } else {
      spanHours.textContent = `${dateData.getHours()} : 00`
    }
    
    hours.appendChild(spanHours)

    // weather.appendChild(h3)
    weather.appendChild(detailWeather)
    weather.appendChild(desc)
    weather.appendChild(humidity)
    weather.appendChild(hours)

    dayTemp.appendChild(weather)

    sectionDays.appendChild(dayTemp)
  })
  contentElem.appendChild(h2title)
  contentElem.appendChild(sectionDays)
}