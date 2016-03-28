function signin()
{
	myApp.showPreloader();
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
							
							$("#loginInfo").text("Valid Credentials");
							$("#loginInfo").fadeIn();
							$("#mobileError").fadeOut();
							
							
							var otp = JSON.stringify(response.otp[0]).replace(/"/g,"");
							var doctorId = JSON.stringify(response.otp[1]).replace(/"/g,"");
							
							localStorage.setItem("mobileNo", mobileNo);
							localStorage.setItem("otp", otp);
							localStorage.setItem("doctorId",JSON.stringify(doctorId));
							//redirecting to otp.html
							var a = document.getElementById('signInNext');
							a.setAttribute("href","otp.html");
							document.getElementById('signInNext').click();
							myApp.hidePreloader();
							myApp.alert('Your OTP Is '+otp,'OTP');
							
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
	myApp.showPreloader();
	var otp = document.getElementById('otp').value;
	var mobile=localStorage.getItem("mobileNo");
	var request = createCORSRequest( "post", "http://radio.tekticks.co.in" );
	if(request)
	{
		if(localStorage.getItem("otp")==otp)
		{
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
							myApp.alert(JSON.stringify(response.login).replace(/"/g,""),'Login');
							
							send();
							
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
				//data:{type:pa,flag:flag},
				//contentType: 'application/json',
				//data: JSON.stringify(data),
				type:"post",
				data:{type:pa},
				cache: false,
				 //dataType: 'json', 
				 success: function(response)
					{
						myApp.hidePreloader();
						myApp.alert('Accepted','Patient Details');
						var a = document.getElementById('acceptNext');
						a.setAttribute("href","login.html");
						document.getElementById('acceptNext').click();
						//alert("res ok");
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
	var d=JSON.parse(localStorage.getItem("doctorId"));
	var u=localStorage.getItem("uuid");
	var request = createCORSRequest( "post", "http://radio.tekticks.co.in" );
	if(request)
	{
		$.ajax
				({
				url: 'http://radio.tekticks.co.in/radioJson/doctors_reject_json.php',		
				type:"post",
				data:{type1:pa1},
				cache: false,
				 success: function(response)
					{
						myApp.hidePreloader();
						myApp.alert('Rejected','Patient Details');
						var a = document.getElementById('rejectNext');
						a.setAttribute("href","login.html");
						document.getElementById('rejectNext').click();
						//alert("res ok");
					}
		
				})						 
	}			
}


 var database;
var len;
function send() 
{
	try
	{
	alert("send called");
	database= window.openDatabase("csvDetails", "1.0", "csv database", 20000);
	database.transaction(selectDb, errorDb, successDb);
	}
	catch(err)
	{
		alert("error : "+err);
	}
	
} 


 function selectDb(tx)
{
		
	try
	{
		alert("selectDb Called");
		var arrlen=JSON.parse(localStorage.getItem("fileLength"));
		var fileArray=JSON.parse(localStorage.getItem("fileArray"));
		alert("arrlen"+arrlen);
		alert("array "+fileArray);
		var di=JSON.parse(localStorage.getItem("doctorId"));
		alert(di);
		
		tx.executeSql('DROP TABLE IF EXISTS csv');
		tx.executeSql('CREATE TABLE IF NOT EXISTS csv(date TEXT,name TEXT, pid INTEGER,did INTEGER, dname TEXT, cut INTEGER,investigation INTEGER,deviceId TEXT,user TEXT,status INTEGER)');
		alert("table created");
		
		var i,j,k,l,m,n,o,p,q,r;
		for(i=0;i<fileArray.length;i+=10)
		{
			j=i+1;
			k=i+2;
			l=i+3;
			m=i+4;
			n=i+5;
			o=i+6;
			p=i+7;
			q=i+8;
			r=i+9;
	
			tx.executeSql('INSERT INTO csv (date,name,pid,did,dname,cut,investigation,deviceId,user,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [fileArray[i], fileArray[j], fileArray[k], fileArray[l], fileArray[m], fileArray[n], fileArray[o], fileArray[p], fileArray[q], fileArray[r]]);
		}
		alert("data inserted");
		
		tx.executeSql('select * from csv where did='+di,[],resultSuccess, resultError);
		alert("data selected");
		
	}
	catch(err)
	{
		alert("erroraegfsgsf : "+err);
	}

}

function errorDb(tx,error)
{
	alert("Got an Error "+error.code);
}
	
function successDb(tx)
{
	//alert("Successful");
	//tx.executeSql('SELECT * FROM csv',[],renderList, errorDb);
		
}
	
function resultSuccess(tx,response)
{
		alert("result success called");
		//var div=document.getElementById("output");
		alert(response);
		alert(response.rows);
		alert(response.rows.length);
		//var temp="<table border=\"1\"><tr><th>date</th><th>name</th><th>pid</th><th>did</th><th>dname</th><th>cut</th></tr>";
		
		//value.length
		var total=0;
		var drname;
		var patientArray=[];
		for(var i=0;i<response.rows.length;i++)
		{
			
			$('#output').append('<div class="card"><div class="card-content"><div class="card-content-inner"><p><font size="3"><b>Patient Name: </b>'+response.rows.item(i).name+'</font></p><p><font size="3"><b>Date: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>'+response.rows.item(i).date+'</font></p><p><font size="3"><b>Investigation: &nbsp;</b>'+response.rows.item(i).investigation+'</font></p><p><font size="3"><b>Amount: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>'+response.rows.item(i).cut+'</font></p></table></div></div></div>');
			
			total+=response.rows.item(i).cut;
			drname=response.rows.item(i).dname;
			patientArray[i]=response.rows.item(i).pid;
			//alert(patientArray);
			//temp+="<tr><td>"+response.rows.item(i).date+"</td><td>"+response.rows.item(i).name+"</td><td>"+response.rows.item(i).pid+"</td><td>"+response.rows.item(i).did+"</td><td>"+response.rows.item(i).dname+"</td><td>"+response.rows.item(i).cut+"</td></tr>";
		}
		//temp+="</table>";
		//div.innerHTML=temp;
		$('#output').append('<div class="card"><div class="card-content"><div class="card-content-inner" ><p style="text-align:right"><font size="3"><b>Grand Total: </b>'+total+'</font></p></div></div></div>');
		$('#dr').text(drname);
		
		localStorage.setItem("patientArray",JSON.stringify(patientArray));
		
}
	
function resultError(tx,error)
{
	alert(error);
}
	 