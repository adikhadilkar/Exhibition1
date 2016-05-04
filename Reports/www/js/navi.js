function navi()
{
	$("#loc").text("OFF");
	$("#loc").css('color', 'red');
	myApp.showPreloader('Collecting Data');
	var request = createCORSRequest( "post", "http://alienpro.in" );
	if(request)
	{
		var c=function(pos)
		{
			//finding coordinates
			var lat		=pos.coords.latitude;
			var lon		=pos.coords.longitude;
			var coords	=lat+', '+lon;
			//finding universally unique identifier(uuid)	
			var uuid=device.uuid;
			localStorage.setItem("latitude",lat);
			localStorage.setItem("longitude",lon);
			localStorage.setItem("uuid",uuid);
			$("#loc").text("On");
			locationSend();	
		}
		navigator.geolocation.getCurrentPosition(c);
		myApp.hidePreloader();
	}
}


function locationSend()
{
	var lat=localStorage.getItem("latitude");
	var lon=localStorage.getItem("longitude");
	var uuid=localStorage.getItem("uuid");
	
	var request = createCORSRequest( "post", "http://alienpro.in" );
	if(request)
	{
	$("#loc").text("ON");
	$("#loc").css('color', 'green');
	myApp.showPreloader('Data Collecting');
	var data = {"location":[{"uuid":uuid,"latitude":lat,"longitude":lon}]};
	console.log(data);
	var sendData = function(data)
	{
	$.ajax({
		url:"http://alienpro.in/location_new_json.php",
		dataType:"json",
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		success:function(response)
		{	
		if(JSON.stringify(response.status)==200)
			{ 
				myApp.hidePreloader();
				//myApp.alert('Success','Location Tracking');
				var dvid = JSON.stringify(response.location).replace(/"/g,"");
				localStorage.setItem("dvid",dvid);
				sendInfo();
			
			}
			if(JSON.stringify(response.status)==203)
			{ 	
				myApp.hidePreloader();
			}
		}
	});
	}
sendData(data);	
	}
}

var len;
function sendInfo()
{	
	//getting device id
	var dv=localStorage.getItem("dvid");
	
	var request = createCORSRequest( "post", "http://192.168.43.111:80/Test_Local_Server_Db/" );
	if(request)
	{
		var data = {"file":[{"deviceId":dv}]};
			var sendData = function(data)
			{   
				$.ajax
				({
				url: 'http://192.168.43.111:80/Test_Local_Server_Db/data_json.php',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(data),
				dataType: 'json',
				success: function(response)
					{
						if(JSON.stringify(response.status)==200)
						{	
							myApp.showPreloader();
							//alert(response);
							var e=response.file;
							//alert(e);
							len=response.file.length;
							//alert(len);
							if(len==0 || e=="")
							{
								myApp.hidePreloader();
								myApp.alert('Data Not Found','Localhost');
							}
							else
							{
									//data collected from IP
							var fileArray=response.file;
					
							localStorage.setItem("fileLength",JSON.stringify(len));
							localStorage.setItem("fileArray",JSON.stringify(fileArray));
							myApp.hidePreloader();
							myApp.alert('Data Collected','');
							
							//method for creation of table and insertion
							send();
							}
							
						}
						else if(JSON.stringify(response.status)==201)
						{
							//myApp.hidePreloader();
							$("#loginInfo").text(JSON.stringify(response.statusMessage).replace(/"/g,""));
							$("#loginInfo").fadeIn();
						}
			
					},
					error: function(xhr, textStatus, error)
					{
						//myApp.hidePreloader();
						console.log(xhr.statusText);
						console.log(textStatus);
						console.log(error);
						//myApp.alert('server unavailable','Localhost');
					}
				});
			};
			sendData(data);
	}
}


function dev()
{
	var uuid=localStorage.getItem("uuid");
	myApp.alert('Your Device Id Is: <b>'+uuid+'</b>','Device Id');
}


var database;
var len;
function send() 
{
	try
	{
	//connection to the database
	database= window.openDatabase("csvDetails", "1.0", "csv database", 20000);
	database.transaction(selectDb, errorDb, successDb);
	}
	catch(err)
	{
		myApp.alert(err,'Error');
	}
	
} 


 function selectDb(tx)
{
		
	try
	{
		//table creation and insertion
		var arrlen=JSON.parse(localStorage.getItem("fileLength"));
		var fileArray=JSON.parse(localStorage.getItem("fileArray"));
		var di=JSON.parse(localStorage.getItem("doctorId"));
		
		tx.executeSql('DROP TABLE IF EXISTS csv');
		tx.executeSql('CREATE TABLE IF NOT EXISTS csv(pt_transaction INTEGER,date TEXT,name TEXT, pid INTEGER,did INTEGER, dname TEXT, cut INTEGER,investigation INTEGER,deviceId TEXT,user TEXT,status INTEGER)');
		
		var i,j,k,l,m,n,o,p,q,r,s;
		for(i=0;i<fileArray.length;i+=11)
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
			s=i+10;
	
			tx.executeSql('INSERT INTO csv (pt_transaction,date,name,pid,did,dname,cut,investigation,deviceId,user,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [fileArray[i], fileArray[j], fileArray[k], fileArray[l], fileArray[m], fileArray[n], fileArray[o], fileArray[p], fileArray[q], fileArray[r], fileArray[s]]);
		}	
	}
	catch(err)
	{
		myApp.alert(err,'Error');
	}

}

function errorDb(tx,error)
{
	myApp.alert(error.code,'Error');
}
	
function successDb(tx)
{
	//Success Method	
}

function open()
{
	if(typeof cordova.plugins.settings.openSetting != undefined)
	 cordova.plugins.settings.openSetting("location_source", function(){console.log("opened location settings")},function(){console.log("failed to open location settings")});
}

