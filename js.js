// Get croods
function getLocation() {
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
		   city = JSON.parse(this.responseText)['data'][0].region.split('-')[0];
		   console.log(city);

// ----> Get Forecast weather
		

// ----> Forcast end


	       }
	    };
	    xhttp.open("GET", `http://api.positionstack.com/v1/reverse?access_key=908084ff960984ae1fea7536e8149f9e&query=${latitude},${longitude}`, true);
	    xhttp.send();
	}

getLocation();
