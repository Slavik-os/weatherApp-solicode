// Declarations -->

let region = null ; 
let header_title = document.getElementById('region-title');
let region_v = document.getElementById('region_v');
let date_response = document.getElementById('date-response');
let front_icon = document.getElementById('front_icon');
let temp_resp = document.getElementById('temp-resp');
let temp_text = document.getElementById('temp-text');
let wind_reps = document.getElementById('wind-resp');
let cloud_resp = document.getElementById('cloud-resp');
let pressure_in = document.getElementById('pressure-in');
let humidity_resp = document.getElementById('humidity-resp');

// Cards --> 

let f_card_header = document.getElementById('f-card-hour');
let f_card_img = document.getElementById('f-card-img');
let f_card_temp = document.getElementById('f-card-temp');


let s_card_header = document.getElementById('s-card-hour');
let s_card_img = document.getElementById('s-card-img');
let s_card_temp = document.getElementById('s-card-temp');

let t_card_header = document.getElementById('t-card-hour');
let t_card_img = document.getElementById('t-card-img');
let t_card_temp = document.getElementById('t-card-temp');

let fr_card_header = document.getElementById('fr-card-hour');
let fr_card_img = document.getElementById('fr-card-img');
let fr_card_temp = document.getElementById('fr-card-temp');


let v_card_header = document.getElementById('v-card-hour');
let v_card_img = document.getElementById('v-card-img');
let v_card_temp = document.getElementById('v-card-temp');



let st_card_header = document.getElementById('st-card-hour');
let st_card_img = document.getElementById('st-card-img');
let st_card_temp = document.getElementById('st-card-temp');


let sn_card_header = document.getElementById('sn-card-hour');
let sn_card_img = document.getElementById('sn-card-img');
let sn_card_temp = document.getElementById('sn-card-temp');

// Cards-end -->

// Drop downs -->

let f_drop_day = document.getElementById('f-date-resp');
let f_date_num = document.getElementById('f-date-num');
let f_date_img = document.getElementById('f-date-img');
let f_low_f = document.getElementById('f-max-f');
let f_max_f = document.getElementById('f-low-f');
let f_wind_resp = document.getElementById('f-wind-resp');
let f_rain_resp = document.getElementById('f-rain-resp');
let f_sunrise   = document.getElementById('f-sunrise');
let f_sunset   = document.getElementById('f-sunset');



let s_drop_day = document.getElementById('s-date-resp');
let s_date_num = document.getElementById('s-date-num');
let s_date_img = document.getElementById('s-date-img');
let s_low_f = document.getElementById('s-max-f');
let s_max_f = document.getElementById('s-low-f');
let s_wind_resp = document.getElementById('s-wind-resp');
let s_rain_resp = document.getElementById('s-rain-resp');
let s_sunrise   = document.getElementById('s-sunrise');
let s_sunset   = document.getElementById('s-sunset');



let tr_drop_day = document.getElementById('tr-date-resp');
let tr_date_num = document.getElementById('tr-date-num');
let tr_date_img = document.getElementById('tr-date-img');
let tr_low_f = document.getElementById('tr-max-f');
let tr_max_f = document.getElementById('tr-low-f');
let tr_wind_resp = document.getElementById('tr-wind-resp');
let tr_rain_resp = document.getElementById('tr-rain-resp');
let tr_sunrise   = document.getElementById('tr-sunrise');
let tr_sunset   = document.getElementById('tr-sunset');


//Drop downs-end -->

// Get croods
function getLocation(v) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,error=>{alert('Enable location services')});
  } else { 
     return  "Geolocation is not supported by this browser.";
  }
}

// Get city name
function showPosition(position) {
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   if (region == null ) {
			   region = JSON.parse(this.responseText)['data'][0].region.split('-')[0];
			}	
			
 
// ----> Get Forecast weather
	async function getData(url=''){
		let req = await fetch(url,{
			methd : 'GET',
			cache : 'no-cache',
			headers : {
				'Content-Type' : 'application/json',
				'key' : '6251f33e57e34473b76144654220601'
			}
			});
			return req.json() ; 

		}
		getData(`http://api.weatherapi.com/v1/forecast.json?q=${region}&days=5`)
		.then(data =>{
		// header section --> 
		header_title.innerHTML = data.location.name+' , '+data.location.country ;
		let current_time = data.location.localtime_epoch ;
	
		// Get Date as timeepoch and parse it to string 
		function getdate(current_t){
		    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			let date = new Date(current_t * 1000);
		    //day_string = 'Date : '+days[date.getDay()]+' '+date.getDate()+' '+toLocaleString('default', { month: 'long' });
		    let day_string = days[date.getDay()];
		    let full_d =  day_string+' '+date.getDate()+' '+date.toLocaleString('default', { month: 'long' }).slice(0,3);
		    let obj = {
			'full_d':full_d,
			'Hours':date.toLocaleString('en-US', { hour: 'numeric', hour12: true }),
			'day_name': days[date.getDay()]
				}
		    return obj;
		}
		 date_response.innerHTML = getdate(current_time).full_d;
		// Header section-end -->

		// Current time front page -->
		front_icon.src = data.current.condition.icon.replace('//','http://');
		temp_resp.innerText= data.current.temp_c+' °';
		temp_text.innerText= data.current.condition.text;
		wind_reps.innerText = data.current.wind_kph+' kmh'
		cloud_resp.innerText = data.current.cloud+' %'
		pressure_in.innerText  = data.current.pressure_in+' in';
		humidity_resp.innerText = data.current.humidity+' %';
		// Current time front page-end -->
		
		// Cards container -->
		
		 d =  data.forecast.forecastday[0].hour[8].time_epoch ;
		 f_card_header.innerText = getdate(d).Hours;
		 f_card_img.src = data.forecast.forecastday[0].hour[8].condition.icon.replace('//','http://');
		 f_card_temp.innerText =  data.forecast.forecastday[0].hour[8].temp_c+' °';



		 d =  data.forecast.forecastday[0].hour[8+4].time_epoch ;
		 s_card_header.innerText = getdate(d).Hours;
		 s_card_img.src = data.forecast.forecastday[0].hour[8+4].condition.icon.replace('//','http://')	;
		 s_card_temp.innerText =  data.forecast.forecastday[0].hour[8+4].temp_c+' °';


		 d =  data.forecast.forecastday[0].hour[8+8].time_epoch ;
		 t_card_header.innerText = getdate(d).Hours;
		 t_card_img.src = data.forecast.forecastday[0].hour[8+8].condition.icon.replace('//','http://')	;
		 t_card_temp.innerText =  data.forecast.forecastday[0].hour[8+8].temp_c+' °';


		 d =  data.forecast.forecastday[0].hour[8+9].time_epoch ;
		 fr_card_header.innerText = getdate(d).Hours;
		 fr_card_img.src = data.forecast.forecastday[0].hour[8+9].condition.icon.replace('//','http://');	
		 fr_card_temp.innerText =  data.forecast.forecastday[0].hour[8+12].temp_c+' °';
		
		 d =  data.forecast.forecastday[0].hour[8+10].time_epoch ;
		 v_card_header.innerText = getdate(d).Hours;
		 v_card_img.src = data.forecast.forecastday[0].hour[8+10].condition.icon.replace('//','http://');	
		 v_card_temp.innerText =  data.forecast.forecastday[0].hour[8+10].temp_c+' °';


		 d =  data.forecast.forecastday[0].hour[8+13].time_epoch ;
		 st_card_header.innerText = getdate(d).Hours;
		 st_card_img.src = data.forecast.forecastday[0].hour[8+11].condition.icon.replace('//','http://');	
		 st_card_temp.innerText =  data.forecast.forecastday[0].hour[8+11].temp_c+' °';


		 d =  data.forecast.forecastday[0].hour[0].time_epoch ;
		 sn_card_header.innerText = getdate(d).Hours;
		 sn_card_img.src = data.forecast.forecastday[0].hour[0].condition.icon.replace('//','http://');	
		 sn_card_temp.innerText =  data.forecast.forecastday[0].hour[0].temp_c+' °';
		// Cards container-end -->
		

		// DropDowns -->
		 d =  data.forecast.forecastday[0].hour[0].time_epoch ;
		 f_drop_day.innerText = getdate(d).day_name; 
		 f_date_num.innerText = data.forecast.forecastday[0].date;	
		 f_date_img.src= data.forecast.forecastday[0].day.condition.icon.replace('//','http://')
		 f_max_f.innerText = data.forecast.forecastday[0].day.mintemp_c+' °';
		 f_low_f.innerText = data.forecast.forecastday[0].day.maxtemp_c+' °';
		 f_wind_resp.innerText = data.forecast.forecastday[0].hour[0].wind_kph+' kmh';
		 f_rain_resp.innerText = data.forecast.forecastday[0].hour[0].chance_of_rain+' %';
		 f_sunrise.innerText = data.forecast.forecastday[0].astro.sunrise;
		 f_sunset.innerText = data.forecast.forecastday[0].astro.sunset;


		 d =  data.forecast.forecastday[1].hour[0].time_epoch ;
		 s_drop_day.innerText = getdate(d).day_name; 
		 s_date_num.innerText = data.forecast.forecastday[1].date;	
		 s_date_img.src= data.forecast.forecastday[1].day.condition.icon.replace('//','http://')
		 s_max_f.innerText = data.forecast.forecastday[1].day.mintemp_c+' °';
		 s_low_f.innerText = data.forecast.forecastday[1].day.maxtemp_c+' °';
		 s_wind_resp.innerText = data.forecast.forecastday[1].hour[0].wind_kph+' kmh';
		 s_rain_resp.innerText = data.forecast.forecastday[1].hour[0].chance_of_rain+' %';
		 s_sunrise.innerText = data.forecast.forecastday[1].astro.sunrise;
		 s_sunset.innerText = data.forecast.forecastday[1].astro.sunset;


		 d =  data.forecast.forecastday[2].hour[0].time_epoch ;
		 tr_drop_day.innerText = getdate(d).day_name; 
		 tr_date_num.innerText = data.forecast.forecastday[2].date;	
		 tr_date_img.src= data.forecast.forecastday[2].day.condition.icon.replace('//','http://')
		 tr_max_f.innerText = data.forecast.forecastday[2].day.mintemp_c+' °';
		 tr_low_f.innerText = data.forecast.forecastday[2].day.maxtemp_c+' °';
		 tr_wind_resp.innerText = data.forecast.forecastday[2].hour[0].wind_kph+' kmh';
		 tr_rain_resp.innerText = data.forecast.forecastday[2].hour[0].chance_of_rain+' %';
		 tr_sunrise.innerText = data.forecast.forecastday[2].astro.sunrise;
		 tr_sunset.innerText = data.forecast.forecastday[2].astro.sunset;

		// DropDowns-end -->
		
		});	
	    };
	}
	    xhttp.open("GET", `http://api.positionstack.com/v1/reverse?access_key=908084ff960984ae1fea7536e8149f9e&query=${latitude},${longitude}`, true);
	    xhttp.send();
	}


getLocation();

// Change the city from the input 
function searchCity(){
	region = region_v.value;
	console.log(region.split()); 
	getLocation();
}
