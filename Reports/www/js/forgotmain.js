function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function validatePhone(phone)  
{  
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	if(phone == "")
	{
		$("#mobileError").text("Please enter a Mobile Number");
        return false;
	}
	else if(phone.match(phoneno))  
     {  
		return true;
     }  
   else  
     {  
       $("#mobileError").text("Please enter a valid Mobile Number");
       return false;  
     }  
 }
 
 function validateOtp(otp)  
{  
  var no = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  var letters = /^[A-Za-z]+$/;
	if(otp == "")
	{
		$("#otpError").text("Please enter OTP");
        return false;
	} 
	else if (otp.length < 4)
	{
		$("#otpError").text("OTP Should Contain 4 Characters");
		return false;
	}
	else if(otp.match(letters))  
     {  
		$("#otpError").text("Please enter a valid OTP");
		return false;
     }  
   else  
     {  
       return true;  
     }  
 }

function validateNewPassword(newPassword)  
{  
	if(newPassword == "")
	{
		$("#newPasswordError").text("Please enter new Password");
        return false;
	}
	else if (newPassword.length < 6)
		{
			$("#newPasswordError").text("Password should be greater than 6 characters");
			return false;
		}
   else  
     {  
       return true;  
     }  
 }
 
 function validateConfirmPassword(confirmPassword)  
{  
	if(confirmPassword == "")
	{
		$("#confirmPasswordError").text("Please enter confirm Password");
        return false;
	}
	else if (confirmPassword.length < 6)
		{
			$("#confirmPasswordError").text("Password should be greater than 6 characters");
			return false;
		}
   else  
     {  
       return true;  
     }  
 }
 
 
 