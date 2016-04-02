function signin()
{
	var request = createCORSRequest( "post", "http://radio.tekticks.co.in" );
	if(request)
	{
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
		
		if(mobileNoValidate)
		{
			myApp.showPreloader();
			var data = {"otp":[{"mobileNo":mobileNo}]};
			var sendData = function(data)
			{   
				$.ajax
				({
				url: 'http://radio.tekticks.co.in/radioJson/create_otp_json.php',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(data),
				dataType: 'json',
				success: function(response)
					{
						if(JSON.stringify(response.status)==200)
						{
							$("#loginInfo").fadeIn();
							$("#mobileError").fadeOut();

							var otp = JSON.stringify(response.otp[0]).replace(/"/g,"");
							var doctorId = JSON.stringify(response.otp[1]).replace(/"/g,"");
							
							localStorage.setItem("mobileNo", mobileNo);
							localStorage.setItem("otp", otp);
							localStorage.setItem("doctorId",JSON.stringify(doctorId));
							//redirecting to otp.html
							myApp.hidePreloader();
							var a = document.getElementById('signInNext');
							a.setAttribute("href","otp.html");
							document.getElementById('signInNext').click();
							
							//myApp.alert('Your OTP Is '+otp,'OTP');
							
						}
						else if(JSON.stringify(response.status)==201)
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
	
function verifyotp()
{
	var otp = document.getElementById('otp').value;
	var mobile=localStorage.getItem("mobileNo");
	var request = createCORSRequest( "post", "http://radio.tekticks.co.in" );
	if(request)
	{
		
		if(localStorage.getItem("otp")==otp)
		{
			myApp.showPreloader();
			var data = {"login":[{"mobileNo":mobile}]};
			var sendData = function(data)
			{   
				$.ajax
				({
				url: 'http://radio.tekticks.co.in/radioJson/login_details.php',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(data),
				dataType: 'json',
				success: function(response)
					{
						if(JSON.stringify(response.status)==200)
						{
							myApp.hidePreloader();
							//myApp.alert(JSON.stringify(response.login).replace(/"/g,""),'Login');
							
							//method for table selection
							resend();
							
							//redirecting to otp.html
							var a = document.getElementById('otpNex');
							a.setAttribute("href","title.html");
							document.getElementById('otpNex').click();	
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
		else
			{
				$("#otpError").text("Please enter a valid OTP");
				$("#otpError").fadeIn();
			}
	}
}
	

function accept()
{
	myApp.showPreloader();
	var pa=[];
	var pa=JSON.parse(localStorage.getItem("patientArray"));
	var flag='1';//this is our flag
	var d=JSON.parse(localStorage.getItem("doctorId"));
	var u=localStorage.getItem("uuid");
	var request = createCORSRequest( "post", "http://radio.tekticks.co.in" );
	if(request)
	{
		$.ajax
				({
				url: 'http://radio.tekticks.co.in/radioJson/accept_reject_json.php',
				type:"post",
				data:{type:d},
				cache: false, 
				 success: function(response)
					{
						myApp.hidePreloader();
						//method for updation of data
						updateRecords();
						  myApp.alert('Accepted','Patient Details');
						var a = document.getElementById('acceptNext');
						a.setAttribute("href","login.html");
						document.getElementById('acceptNext').click(); 
					},
					error: function(xhr, textStatus, error)
					{
						console.log(xhr.statusText);
						console.log(textStatus);
						console.log(error);
					}
		
				})						 
	}			
							
}


function reject()
{
	myApp.showPreloader();
	var pa1=[];
	var pa1=JSON.parse(localStorage.getItem("patientArray"));
	 
	var flag='1';//this is our flag
	var d1=JSON.parse(localStorage.getItem("doctorId"));
	var u=localStorage.getItem("uuid");
	var request = createCORSRequest( "post", "http://radio.tekticks.co.in" );
	if(request)
	{
		$.ajax
				({
				url: 'http://radio.tekticks.co.in/radioJson/doctors_reject_json.php',		
				type:"post",
				data:{type1:d1},
				cache: false,
				 success: function(response)
					{
						myApp.hidePreloader();
						rejectRecords();
						myApp.alert('Rejected','Patient Details');
						var a = document.getElementById('rejectNext');
						a.setAttribute("href","login.html");
						document.getElementById('rejectNext').click();
					}
		
				})						 
	}			
}


var database1;
var len;
function resend() 
{
	try
	{
	//database connection
	database= window.openDatabase("csvDetails", "1.0", "csv database", 20000);
	database.transaction(selectData, errorData, successData);
	}
	catch(err)
	{
		myApp.alert(err,'Error In resend');
	}
	
} 


 function selectData(tx)
{
		
	try
	{
		var di=JSON.parse(localStorage.getItem("doctorId"));
		tx.executeSql('select * from csv where status=0 AND did='+di, [], resultSuccess, resultError);
		
	}
	catch(err)
	{
		myApp.alert(err,'Error In SelectData');
	}

}

function errorData(tx,error)
{
	myApp.alert(error.code,'Got an Error In errorData');
}
	
function successData(tx)
{
	//Success Function
} 
	
function resultSuccess(tx,response)
{
		$("#exi").fadeOut();
		$("#acc").fadeOut();
		$("#rej").fadeOut();
		var count;
		var total=0;
		var drname;
		var patientArray=[];
		
		if(response.rows.length!=0)
		{
			$("#exi").fadeOut();
			$("#acc").fadeIn();
			$("#rej").fadeIn();
			for(var i=0;i<response.rows.length;i++)
			{
			count=i+1;
			$('#output').append('<div class="card"><div class="card-content"><div class="card-content-inner"><p><font size="3"><b>'+count+') Patient Name: </b>'+response.rows.item(i).name+'</font></p><p><font size="3"><b>Date: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>'+response.rows.item(i).date+'</font></p><p><font size="3"><b>Investigation: &nbsp;</b>'+response.rows.item(i).cut+'</font></p><p><font size="3"><b>Amount: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>'+response.rows.item(i).investigation+'</font></p></table></div></div></div>');
			
			total+=response.rows.item(i).investigation;
			drname=response.rows.item(i).dname;
			patientArray[i]=response.rows.item(i).pt_transaction;
			
		}
		
		$('#output').append('<div class="card"><div class="card-content"><div class="card-content-inner" ><p style="text-align:right"><font size="3"><b>Grand Total: </b>'+total+'</font></p></div></div></div>');
		$('#dr').text(drname);
		
		localStorage.setItem("patientArray",JSON.stringify(patientArray));
			
		}
		else
		{
			$("#nodata").text("No Data!");
			$("#acc").fadeOut();
			$("#rej").fadeOut();
			$("#exi").fadeIn();
		}
	
	
}
	
function resultError(tx,error)
{
	myApp.alert(error,'Error In resultError');
}

//SQLITE Coding For Accept
 var database2;
 function updateRecords()
{
	try
	{
	database2= window.openDatabase("csvDetails", "1.0", "csv database", 20000);
	database2.transaction(updateData, errorCb, successCb);
	}
	catch(err)
	{
		myApp.alert(err,'DB Connection Error in Accept');
	}	
}	


 function updateData(tx)
{
	try
	{
	var ka=[];
	ka=JSON.parse(localStorage.getItem("patientArray"));

	var a;
	for(a=0;a<ka.length;a++)
	{
	 tx.executeSql('UPDATE csv SET status=1 where pt_transaction ='+ka[a], [],  successUpdate, errorUpdate);
	}

	}
	catch(err)
	{
		myApp.alert(err,'Error In updateData');
	}
}


function errorCb(tx,error)
{
	myApp.alert(error.code,'Error In errorCb');
} 
 
 
 function successCb(tx)
{
	//success function	
}

function successUpdate(tx,result){
    //alert("success in updatation");
}
 
function errorUpdate(error){
    myApp.alert(error.code,'Error Processing SQL In errorUpdate');
} 



//SQLITE Coding For Reject
 var database3;
 function rejectRecords()
{
	
	
	try
	{
	database3= window.openDatabase("csvDetails", "1.0", "csv database", 20000);
	database3.transaction(rejectData, rejectCb, rejectSuccessCb);
	}
	catch(err)
	{
		myApp.alert(err,'DB Connection Error in Reject');
	}
	
}

function rejectData(tx)
{
	
	try
	{
	//getting array of pt_transaction items
	var ka=[];
	ka=JSON.parse(localStorage.getItem("patientArray"));

	var a;
	for(a=0;a<ka.length;a++)
	{
	 tx.executeSql('UPDATE csv SET status=2 where pt_transaction ='+ka[a], [],  rejectUpdate, rejectErrorUpdate);
	}

	}
	catch(err)
	{
		myApp.alert(err,'Error In rejectData');
	}
}

function rejectCb(tx,error)
{
	myApp.alert(error.code,'Error In rejectCb');
} 
 
 
 function rejectSuccessCb(tx)
{
	//alert("Successful");	
}

function rejectUpdate(tx,result){
    //alert("success in updatation");
}
 
function rejectErrorUpdate(error){
    myApp.alert(error.code,'Error In rejectErrorUpdate');
} 

function exit()
{
	
	myApp.confirm('Do you really want to exit?','Exit', function () {
		window.location="login.html";
		
		/* var a = document.getElementById('exitNext');
		a.setAttribute("href","login.html");
		document.getElementById('exitNext').click(); */
			});

}	