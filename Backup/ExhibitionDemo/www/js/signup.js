function signup()
{
	
	//document.getElementById('preload').click();
	localStorage.clear(); 
	var request = createCORSRequest( "post", "http://exhibition.tekticks.co.in" );
	if(request)
	{
		var name = document.getElementById('name').value;
		var nameValidate = validateName(name);
		if(nameValidate)
		{
			$("#nameError").hide();
		}
		else
		{
			$("#nameError").fadeIn();
		}
		var mobileNo = document.getElementById('mobileNo').value;
		var mobileNoValidate = validatePhone(mobileNo);
		if(mobileNoValidate)
		{
			$("#mobileError").hide();
		}
		else
		{
			$("#mobileError").fadeIn();
		}
		var emailId = document.getElementById('emailId').value;
		var emailIdValidate = validateEmail(emailId);
		if(emailIdValidate)
		{
			$("#emailError").hide();
		}
		else
		{
			$("#emailError").fadeIn();
		}
		var password = document.getElementById('password').value;
		var passwordValidate = validatePassword(password);
		if(passwordValidate)
		{
			$("#passwordError").hide();
		}
		else
		{
			$("#passwordError").fadeIn();
		}
		
		if(mobileNoValidate && emailIdValidate && passwordValidate)
		{
			//sending otp
			var data = {"otp":[{"mobileNo":mobileNo,"emailId":emailId}]};
			var sendData = function(data)
			{   
				$.ajax
				({
				url: 'http://exhibition.tekticks.co.in/application/json/otpCreation.php',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(data),
				dataType: 'json',
				success: function(response)
					{
						if(JSON.stringify(response.status)==200)
						{
							$("#displayInfo").text("Valid Credentials");
							$("#displayInfo").fadeIn();
							$("#mobileError").fadeOut();
							$("#emailError").fadeOut();
							$("#nameError").fadeOut();
							$("#passwordError").fadeOut();
							//accessing response object
							var otp = JSON.stringify(response.otp).replace(/"/g,"");
							localStorage.setItem("mobileNo", mobileNo);
							localStorage.setItem("emailId", emailId);
							localStorage.setItem("password", password);
							localStorage.setItem("name", name);
							localStorage.setItem("otp", otp);
							//redirecting to otp.html
							var a = document.getElementById('signupNext');
							a.setAttribute("href","otp.html");
							document.getElementById('signupNext').click();
							
						}
						else if(JSON.stringify(response.status)==202)
						{
							$("#displayInfo").text(JSON.stringify(response.statusMessage).replace(/"/g,""));
							$("#displayInfo").fadeIn();
						}
						else if(JSON.stringify(response.status)==203)
						{
							$("#displayInfo").text(JSON.stringify(response.statusMessage).replace(/"/g,""));
							$("#displayInfo").fadeIn();
						}
					},
					error: function(xhr, textStatus, error)
					{
						console.log(xhr.statusText);
						console.log(textStatus);
						console.log(error);
					}
				});
			};
			sendData(data);
		}
	}
}
function verifyotp()
{
	var otp = document.getElementById('otp').value;
	if(localStorage.getItem("otp")==otp)
	{
		$("#otpConfirm").text("OTP Verified");
		var request = createCORSRequest( "post", "http://exhibition.tekticks.co.in" );
		if(request)
		{
			var mobileNo = localStorage.getItem("mobileNo");
			var emailId = localStorage.getItem("emailId");
			var password = localStorage.getItem("password");
			var name = localStorage.getItem("name");
			var data = {"signUp":[{"name":name,"password":password,"mobileNo":mobileNo,"emailId":emailId}]};
			var sendData = function(data)
				{   
					$.ajax
					({
					url: 'http://exhibition.tekticks.co.in/application/json/signUpJson.php',
					type: 'POST',
					contentType: 'application/json',
					data: JSON.stringify(data),
					dataType: 'json',
					success: function(response)
						{
							if(JSON.stringify(response.status)==200)
							{
								localStorage.clear();
								
								var visitorId = JSON.stringify(response.visitor[0].id).replace(/"/g,"");
								var Name = JSON.stringify(response.visitor[0].name).replace(/"/g,"");
								localStorage.setItem("visitorId",visitorId);
								//$("#displayName").text(JSON.stringify("Welcome "+response.visitor[0].name).replace(/"/g,""));
								//var Name = JSON.stringify(response.signUp).replace(/"/g,"");
								myApp.alert('Welcome '+Name,'SignUp');
								
								$("#signup").fadeOut();
								$("#signin").fadeOut();
								$("#profile").fadeIn();
								
								//var obj=JSON.parse(object);
								//document.getElementById("displayName").innerHTML = signUp[0];
								
								//$("#displayName").text("Welcome "+Name);
								
								
								//$("#displayName").text("Welcome "+obj.signUp[]['name']);
								
								//$("#displayName").text("Welcome "+localStorage.getItem("name"));
								
								//document.getElementById("#proName").innerHTML = Name;
								
								//window.location="logo.html";
								
								profileReload();
								
								var b = document.getElementById('otpNext');
								b.setAttribute("href","logo.html");
								document.getElementById('otpNext').click();
								
								
							}
							else
							{
								alert(JSON.stringify(response.statusMessage).replace(/"/g,""));
							}
						},
						error: function(xhr, textStatus, error)
						{
							console.log(xhr.statusText);
							console.log(textStatus);
							console.log(error);
						}
					});
				};
			sendData(data);
		}
	}
	else
	{
		$("#otpError").text("Please enter a valid OTP");
		$("#otpError").fadeIn();
	}
}

