//method for login
function signin()
{
	localStorage.clear(); 
	var request = createCORSRequest( "post", "http://exhibition.tekticks.co.in" );
	if(request)
	{
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
		
		if(emailIdValidate && passwordValidate)
		{
		myApp.showPreloader();
		var data = {"signIn":[{"emailId":emailId,"password":password}]};
			var sendData = function(data)
			{   
				$.ajax
				({
				url: 'http://exhibition.tekticks.co.in/application/json/signInJson.php',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(data),
				dataType: 'json',
				success: function(response)
					{
						if(JSON.stringify(response.status)==200)
						{
							
							$("#emailError").hide();
							$("#passwordError").hide();
							var visitorId = JSON.stringify(response.visitorId).replace(/"/g,"");
							localStorage.setItem("visitorId",visitorId);
							
							//printing msg before redirecting
							//$("#loginInfo").text(JSON.stringify(response.statusMessage).replace(/"/g,""));
							//$("#loginInfo").fadeIn();
							myApp.hidePreloader();
							myApp.alert('Login Successful..!!','Log In');

							$("#signup").fadeOut();
							$("#signin").fadeOut();
							$("#profile").fadeIn();	
							
							
							profileReload();
							
							
							var a = document.getElementById('signInNext');
							a.setAttribute("href","logo.html");
							document.getElementById('signInNext').click();
							
						}
						else if(JSON.stringify(response.status)==203)
						{
							myApp.hidePreloader();
							$("#loginInfo").text(JSON.stringify(response.statusMessage).replace(/"/g,""));
							$("#loginInfo").fadeIn();
						}
						else if(JSON.stringify(response.status)==202)
						{
							myApp.hidePreloader();
							$("#loginInfo").text(JSON.stringify(response.statusMessage).replace(/"/g,""));
							$("#loginInfo").fadeIn();
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
	
 
	







	