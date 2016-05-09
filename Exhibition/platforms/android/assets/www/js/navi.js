function navi()
{
	localStorage.clear();
	var request = createCORSRequest( "post", "http://radio.tekticks.com" );
	if(request)
	{
		
		if(localStorage.getItem("visitorId") === null)
		{
			$("#signup").fadeIn();
			$("#signin").fadeIn();
			$("#profile").fadeOut();
			document.getElementById("list1").style.marginTop = "0px";			
		}
		else
		{
			$("#signup").fadeOut();
			$("#signin").fadeOut();
			$("#profile").fadeIn();	
		
		}
	}
	//profileReload();
}


function profileReload()
{

var request = createCORSRequest( "post", "http://radio.tekticks.com" );
	if(request)
	{
	//myApp.showPreloader();		
var visitorId=localStorage.getItem("visitorId");
var data = {"profile":[{"visitorId":visitorId}]};
	var sendData = function(data)
	{
	$.ajax({
		url:"http://radio.tekticks.com/exhibition/sw_visitor.php",
		dataType:"json",
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		success:function(response)
		{	
		if(JSON.stringify(response.status)==200)
			{ 
				//myApp.hidePreloader();
				var profileName= JSON.stringify(response.visitor.name).replace(/"/g,"");
			   var profilePic= JSON.stringify(response.visitor.image).replace(/"/g,""); 
			   					
			 	if(profilePic=="null")
				{
				document.getElementById("profilePic1").style.backgroundImage='linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.8)),url(img/Profilelogo.png)';
				}
				else
				{
				//$('#profilePic1').css('backgroundImage','url(' + encodeURI(profilePic) +')');
				
				document.getElementById("profilePic1").style.backgroundImage='linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.8)),url("data:image/(png|jpg);base64,'+profilePic+'")';
				}
		 
			$("#profileName").text(profileName);
			//$("#profilePic").attr("src",profilePic);
			localStorage.setItem("profileName", profileName);
			localStorage.setItem("profileImage", profilePic);
			
			}
		}
	});
	}
sendData(data);	
//console.log(data);
	}
}
