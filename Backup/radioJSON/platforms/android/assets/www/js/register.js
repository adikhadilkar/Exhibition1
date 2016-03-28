function signup()
{
	document.getElementById('preload').click();
	localStorage.clear(); 
	var request = createCORSRequest( "post", "" );
	if(request)
	{
		var name = document.getElementById('name').value;
		var mobileNo = document.getElementById('mobileno').value;
		var mobileNoValidate = validatePhone(mobileNo);
		if(mobileNoValidate)
		{
			$("#mobileError").hide();
		}
		else
		{
			$("#mobileError").fadeIn();
		}
		var emailId = document.getElementById('emailid').value;
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
			var data = {"otp":[{"mobileNo":mobileNo,"emailId":emailId}]};
			var sendData = function(data)
			{   
				$.ajax
				({
				url: 'http://socialworker.tekticks.co.in/json/otpCreation.php',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(data),
				dataType: 'json',
				success: function(response)
					{
						if(JSON.stringify(response.status)==200)
						{
							$("#mobileError").hide();
							$("#emailError").hide();
							var otp = JSON.stringify(response.otp).replace(/"/g,"");
							localStorage.setItem("mobileNo", mobileNo);
							localStorage.setItem("emailId", emailId);
							localStorage.setItem("password", password);
							localStorage.setItem("name", name);
							localStorage.setItem("otp", otp);
							var a = document.getElementById('next');
							a.setAttribute("href","sw_verifyotp.html");
							document.getElementById('next').click();
							
						}
						else if(JSON.stringify(response.status)==202)
						{
							$("#mobileError").text(JSON.stringify(response.statusMessage).replace(/"/g,""));
							$("#mobileError").fadeIn();
						}
						else if(JSON.stringify(response.status)==203)
						{
							$("#emailError").text(JSON.stringify(response.statusMessage).replace(/"/g,""));
							$("#emailError").fadeIn();
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