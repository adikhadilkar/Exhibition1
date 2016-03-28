function receive()
{	
var locat="67878";
	//alert("getprofile");
	var request = createCORSRequest( "post", "http://radio.tekticks.co.in" );
	if(request)
	{
		var data = {"loc":[{"locationId":locat}]};
		
		var getData = function(data)
		{
		//	alert(JSON.stringify(data));
		$.ajax({
		url:"http://radio.tekticks.co.in/radioJson/test.php",
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(data),
		dataType:"json",
		success:function(response)
		{
					
							var lId = JSON.stringify(response.location.locationId).replace(/"/g,"");
							var did = JSON.stringify(response.location.deviceId).replace(/"/g,"");
							var lati = JSON.stringify(response.location.latitude).replace(/"/g,"");
							var longi = JSON.stringify(response.location.longitude).replace(/"/g,"");
							alert(lId);
							alert(did);
							alert(lati);
							alert(longi);
		}
		});
		}
			getData(data);
	}
	
}
	







	