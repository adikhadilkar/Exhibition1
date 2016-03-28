function getprofile()
{
	//alert("getprofile");
	var request = createCORSRequest( "post", "http://exhibition.tekticks.co.in" );
	if(request)
	{
		var visitorId = localStorage.getItem("visitorId");
		var data = {"profile":[{"visitorId":visitorId}]};
		
		var getData = function(data)
		{
		//	alert(JSON.stringify(data));
		$.ajax({
		url:"http://exhibition.tekticks.co.in/application/json/retrivalProfile_json.php",
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(data),
		dataType:"json",
		success:function(response)
		{
					//$(".floating-label").hide();
					$("#pName").text(JSON.stringify(response.visitor[0].name).replace(/"/g,""));
					$("#pEmailId").text(JSON.stringify(response.visitor[0].emailId).replace(/"/g,""));
					$("#pMobileNo").text(JSON.stringify(response.visitor[0].mobileNo).replace(/"/g,""));
					//$("#pbirthdate").val(convertDate(JSON.stringify(response.visitor[0].dob).replace(/"/g,"")));
					
					//$("#pcity").val(JSON.stringify(response.visitor[0].city).replace(/"/g,""));
					
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
	var request = createCORSRequest( "post", "http://exhibition.tekticks.co.in" );
	if(request)
	{
		var visitorId = localStorage.getItem("visitorId");
		var data = {"profile":[{"visitorId":visitorId}]};
		
		var getData = function(data)
		{
		//	alert(JSON.stringify(data));
		$.ajax({
		url:"http://exhibition.tekticks.co.in/application/json/update_json.php",
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(data),
		dataType:"json",
		success:function(response)
		{
			
			
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
	var pname = document.getElementById('pname').value;
	var pphone = document.getElementById('pMobile').value;
	var pemail = document.getElementById('pEmail').value;
	var pBirthDate = document.getElementById('pBirthDate').value;
	var pGender = document.getElementById("pGender").value;
	var pEducation = document.getElementById('pEducation').value;
	var pProfession = document.getElementById('pProfession').value;	
	var visitorId = localStorage.getItem("visitorId");
	var request = createCORSRequest( "post", "http://exhibition.tekticks.co.in" );
	//var fileName = upload();
	//alert(fileName);
	if(request)
	{
	
	
		var data = {"profile":[{"visitorId":visitorId,"pname":pname,"pemail":pemail,"pphone":pphone,"pGender":pGender,"pBirthDate":pBirthDate,"pEducation":pEducation,"pProfession":pProfession}]};
		var sendData = function(data)
		{
	$.ajax({
		url:"http://exhibition.tekticks.co.in/application/json/signupProfile_json.php",
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(data),
		dataType:"json",
		success:function(response)
		{
					if(JSON.stringify(response.status)==200)
						{
							myApp.alert('Data Updated','Update');
							var a = document.getElementById('reloadProfile');
							a.setAttribute("href","logo.html");
							document.getElementById('reloadProfile').click();
						}
							
		
		}
	  
		});
		} 
	sendData(data);
	//console.log(data);

	
	}
}


	
	
