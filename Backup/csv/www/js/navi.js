function navi()
{
	$("#loc").text("OFF");
	$("#loc").css('color', 'red');
	myApp.showPreloader('Loading');
	var request = createCORSRequest( "post", "http://radio.tekticks.com" );
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
	
	var request = createCORSRequest( "post", "http://radio.tekticks.com" );
	if(request)
	{
	$("#loc").text("ON");
	$("#loc").css('color', 'green');
	myApp.showPreloader('Loading');
	var data = {"location":[{"uuid":uuid,"latitude":lat,"longitude":lon}]};
	console.log(data);
	var sendData = function(data)
	{
	$.ajax({
		url:"http://radio.tekticks.com/radioJson/location_new_json.php",
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
				//send();
			
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
	//alert("send called");
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
		var fileArray=JSON.parse(localStorage.getItem("final"));
		//alert("filearray is "+fileArray);
		var di=JSON.parse(localStorage.getItem("doctorId"));
		
		tx.executeSql('DROP TABLE IF EXISTS csv');
		tx.executeSql('CREATE TABLE IF NOT EXISTS csv(pt_transaction INTEGER,date TEXT,pid INTEGER, name TEXT, did INTEGER, dname TEXT, cut INTEGER,investigation INTEGER,deviceId TEXT,user TEXT,status INTEGER)');
		
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
	
			tx.executeSql('INSERT INTO csv (pt_transaction,date,pid,name,did,dname,cut,investigation,deviceId,user,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [fileArray[i], fileArray[j], fileArray[k], fileArray[l], fileArray[m], fileArray[n], fileArray[o], fileArray[p], fileArray[q], fileArray[r], fileArray[s]]);
		}
		//alert("data added");
		myDelete();
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

