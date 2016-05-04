function getprofile()
{
	myApp.showPreloader();	
	//alert("getprofile");
	var request = createCORSRequest( "post", "http://radio.tekticks.com" );
	if(request)
	{
		var visitorId = localStorage.getItem("visitorId");
		var data = {"profile":[{"visitorId":visitorId}]};
		
		var getData = function(data)
		{
		//	alert(JSON.stringify(data));
		$.ajax({
		url:"http://radio.tekticks.com/exhibition/retrivalProfile_json.php",
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(data),
		dataType:"json",
		success:function(response)
		{
			myApp.hidePreloader();	
			var Pic= JSON.stringify(response.visitor[0].image).replace(/"/g,"");
					//$(".floating-label").hide();
					$("#pName").text(JSON.stringify(response.visitor[0].name).replace(/"/g,""));
					$("#pEmailId").text(JSON.stringify(response.visitor[0].emailId).replace(/"/g,""));
					$("#pMobileNo").text(JSON.stringify(response.visitor[0].mobileNo).replace(/"/g,""));
					//$("#pbirthdate").val(convertDate(JSON.stringify(response.visitor[0].dob).replace(/"/g,"")));
					
					
					document.getElementById("prof1").style.backgroundImage='linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.8)),url("data:image/(png|jpg);base64,'+Pic+'")';
					//$("#pcity").val(JSON.stringify(response.visitor[0].city).replace(/"/g,""));
					//$("#profilePic").attr("src",'data:image/(png|jpg);base64,'+JSON.stringify(response.visitor[0].image).replace(/"/g,"")+'');
					//$("#pgender").val(JSON.stringify(response.visitor[0].gender).replace(/"/g,""));
					//alert(JSON.stringify(response.visitor[0].photoLink));
					
					//$("#profilePic").attr("src",JSON.stringify(response.visitor[0].profilePic).replace(/"/g,""));
					
					//var show = document.getElementById('profileShow');
					//show.style.visibility = 'visible';
					
		}
		});
		}
			getData(data);
	}
	
}


function sendProfile()
{
	myApp.showPreloader();	
	var request = createCORSRequest( "post", "http://radio.tekticks.com" );
	if(request)
	{
		var visitorId = localStorage.getItem("visitorId");
		var data = {"profile":[{"visitorId":visitorId}]};
		
		var getData = function(data)
		{
		//	alert(JSON.stringify(data));
		$.ajax({
		url:"http://radio.tekticks.com/exhibition/update_json.php",
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(data),
		dataType:"json",
		success:function(response)
		{
				myApp.hidePreloader();	
			
					$(".floating-label").hide();
					
					document.getElementById("pname").value = JSON.stringify(response.visitor[0].name).replace(/"/g,"");
					
					document.getElementById("pMobile").value = JSON.stringify(response.visitor[0].mobileNo).replace(/"/g,"");
					
					document.getElementById("pEmail").value = JSON.stringify(response.visitor[0].emailId).replace(/"/g,"");
					
					document.getElementById("pBirthDate").value = JSON.stringify(response.visitor[0].dateOfBirth).replace(/"/g,"");
					
					document.getElementById("pGender").value = JSON.stringify(response.visitor[0].gender).replace(/"/g,"");
					
					document.getElementById("pEducation").value = JSON.stringify(response.visitor[0].education).replace(/"/g,"");
					
					document.getElementById("pProfession").value = JSON.stringify(response.visitor[0].profession).replace(/"/g,"");
				
					//$("#pname").val(JSON.stringify(response.visitor[0].name).replace(/"/g,""));
					//$("#pMobile").text(JSON.stringify(response.visitor[0].mobileNo).replace(/"/g,""));
					//$("#pEmail").text(JSON.stringify(response.visitor[0].emailId).replace(/"/g,""));
					
					//$("#pbirthdate").val(convertDate(JSON.stringify(response.visitor[0].dob).replace(/"/g,"")));
					
					//$("#pcity").val(JSON.stringify(response.visitor[0].city).replace(/"/g,""));
					
					//$("#pgender").val(JSON.stringify(response.visitor[0].gender).replace(/"/g,""));
					//alert(JSON.stringify(response.visitor[0].photoLink));
					//$("#profilePic").attr("src",JSON.stringify(response.visitor[0].photoLink).replace(/"/g,""));
					
					//var show = document.getElementById('profileShow');
					//show.style.visibility = 'visible';
					
					//var show = document.getElementById('profileShow');
					//show.style.visibility = 'visible';
					
		}
		});
		}
			getData(data);
	}
	
}


     

 //function convertDate(dateString){
//var p = dateString.split(/\D/g)
//return [p[2],p[1],p[0] ].join("-")
//}

 function profile()
{ 
	myApp.showPreloader();	
	var show = document.getElementById('profileShow');
    show.style.visibility = 'visible';
	var profilePic = document.getElementById('profilePic').src;
	//alert(profilePic);
	var profilePicture = getBase64Image(document.getElementById('profilePic'));
	//alert(profilePicture);

	var pname = document.getElementById('pname').value;
	var pphone = document.getElementById('pMobile').value;
	var pemail = document.getElementById('pEmail').value;
	var pBirthDate = document.getElementById('pBirthDate').value;
	var pGender = document.getElementById("pGender").value;
	var pEducation = document.getElementById('pEducation').value;
	var pProfession = document.getElementById('pProfession').value;	
	var visitorId = localStorage.getItem("visitorId");
	var request = createCORSRequest( "post", "http://radio.tekticks.com" );
	var fileName = upload();
	//alert(fileName);
	if(request)
	{
		var data = {"profile":[{"visitorId":visitorId,"pname":pname,"pemail":pemail,"profilePicture":profilePicture,"pphone":pphone,"pGender":pGender,"pBirthDate":pBirthDate,"pEducation":pEducation,"pProfession":pProfession}]};
		var sendData = function(data)
		{
	$.ajax({
		url:"http://radio.tekticks.com/exhibition/signupProfile_json.php",
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(data),
		dataType:"json",
		success:function(response)
		{
					if(JSON.stringify(response.status)==200)
						{
							myApp.hidePreloader();	
							profileReload();
							myApp.alert('Data Updated','Update');
							mainView.router.loadPage("logo.html");
							/* var a = document.getElementById('reloadProfile');
							a.setAttribute("href","logo.html");
							document.getElementById('reloadProfile').click(); */
						}
							
		
		}
	  
		});
		} 
	sendData(data);
	//console.log(data);

	
	}
}

function getBase64Image(img) {
	alert("get base called");
  var canvas = document.createElement("canvas");
  canvas.width = img.width;    //img.width
  canvas.height = img.height;   //img.height
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
	
	
