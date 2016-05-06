function validateEmail(mail)   
{  
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
	if(mail == ""){   //checking if the form is empty
		$("#emailError").text("Please enter an Email Id");
		return false;
		//displaying a message if the form is empty
    }
	else if(mail.match(mailformat))  
		{  
			return true;
		}  
		else  
		{  
			$("#emailError").text("Please enter a valid Email Id");
			return false;  
		}  
}

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

function validatePassword(password)  
{  
	if(password == "")
	{
		$("#passwordError").text("Please enter a Password");
        return false;
	}
	else if (password.length < 6)
		{
			$("#passwordError").text("Password should be greater than 6 characters");
			return false;
		}
   else  
     {  
       return true;  
     }  
 }
 
 function validateName(name)   
{  //checking if name is empty
	var letters = /^[A-Za-z]+$/; 
	
	if(name == "")
	{
		$("#nameError").text("Please enter a name");
        return false;
	}
	else if(name.match(letters))  
	{  
		return true;  
	}  	
   else  
    {  
       $("#nameError").text("Please enter a valid name");
       return false;  
    }  
}
 