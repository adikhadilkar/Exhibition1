function navi()
{
	myApp.showPreloader();
	var request = createCORSRequest( "post", "http://radio.tekticks.co.in" );
	if(request)
	{
		var c=function(pos)
		{
			//myApp.hidePreloader();
		//finding coordinates
		var lat		=pos.coords.latitude;
		var lon		=pos.coords.longitude;
		var coords	=lat+', '+lon;
		//finding universally unique identifier(uuid)	
		var uuid=device.uuid;
		localStorage.setItem("latitude",lat);
		localStorage.setItem("longitude",lon);
		localStorage.setItem("uuid",uuid);
		locationSend();
		}
		navigator.geolocation.getCurrentPosition(c);
		myApp.hidePreloader();
	}
	
}


function locationSend()
{
	myApp.showPreloader();
	var lat=localStorage.getItem("latitude");
	var lon=localStorage.getItem("longitude");
	var uuid=localStorage.getItem("uuid");
	
	var request = createCORSRequest( "post", "http://radio.tekticks.co.in" );
	if(request)
	{
	var data = {"location":[{"uuid":uuid,"latitude":lat,"longitude":lon}]};
	console.log(data);
	var sendData = function(data)
	{
	$.ajax({
		url:"http://radio.tekticks.co.in/radioJson/location_new_json.php",
		dataType:"json",
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		success:function(response)
		{	
		if(JSON.stringify(response.status)==200)
			{ 
				myApp.hidePreloader();
				myApp.alert('Success ','Location Tracking');
				//var dvid = JSON.stringify(response.location).replace(/"/g,"");
				//alert(dvid);
				//localStorage.setItem("dvid",dvid);
				//sendInfo();
			
			}
			if(JSON.stringify(response.status)==203)
			{ 
			
				myApp.hidePreloader();
			
			}
		}
	});
	}
sendData(data);	
//console.log(data);
	}
}

function dev()
{
	var uuid=localStorage.getItem("uuid");
	myApp.alert('Your Device Id Is: '+uuid,'Device Id');
}