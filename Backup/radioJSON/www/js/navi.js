function navi()
{
	var request = createCORSRequest( "post", "http://radio.tekticks.co.in" );
	if(request)
	{
		myApp.showPreloader();
		var c=function(pos)
		{
		//finding coordinates
		var lat		=pos.coords.latitude;
		//alert(lat);
		var lon		=pos.coords.longitude;
		//alert(lon);
		var coords	=lat+', '+lon;
		//alert(coords);
		//finding universally unique identifier(uuid)	
		var uuid=device.uuid;
		localStorage.setItem("latitude",lat);
		localStorage.setItem("longitude",lon);
		localStorage.setItem("uuid",uuid);
		locationSend();
		//alert("locationsendcalled");
		
		}
		navigator.geolocation.getCurrentPosition(c);
		myApp.hidePreloader();
	}
}


function locationSend()
{
	myApp.showPreloader();
	var lat=localStorage.getItem("latitude");
	var lon=localStorage.getItem("longitude");
	var uuid=localStorage.getItem("uuid");
	
	var request = createCORSRequest( "post", "http://radio.tekticks.co.in" );
	if(request)
	{
	var data = {"location":[{"uuid":uuid,"latitude":lat,"longitude":lon}]};
	console.log(data);
	var sendData = function(data)
	{
	$.ajax({
		url:"http://radio.tekticks.co.in/radioJson/location_new_json.php",
		dataType:"json",
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		success:function(response)
		{	
		if(JSON.stringify(response.status)==200)
			{ 
				myApp.hidePreloader();
				myApp.alert('Success','Location Tracking');
				var dvid = JSON.stringify(response.location).replace(/"/g,"");
				alert(dvid);
				localStorage.setItem("dvid",dvid);
				sendInfo();
			
			}
			if(JSON.stringify(response.status)==203)
			{ 
			
				
			
			}
		}
	});
	}
sendData(data);	
//console.log(data);
	}
}

var len;
function sendInfo()
{
	var dv=localStorage.getItem("dvid");
	alert(dv);
	alert("sendInfo Called");
	var request = createCORSRequest( "post", "http://192.168.0.104/Test_Local_Server_Db/" );
	if(request)
	{
		alert("request");
		var data = {"file":[{"deviceId":dv}]};
			var sendData = function(data)
			{   
				$.ajax
				({
				url: 'http://192.168.0.104/Test_Local_Server_Db/data_json.php',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(data),
				dataType: 'json',
				success: function(response)
					{
						if(JSON.stringify(response.status)==200)
						{
							len=response.file.length;
							alert(len);
							
							var fileArray=response.file;
							alert(fileArray);
					
							localStorage.setItem("fileLength",JSON.stringify(len));
							localStorage.setItem("fileArray",JSON.stringify(fileArray));
							
							myApp.alert('Data Collected','Localhost')
					
							/* try
							{
							database= window.openDatabase("csvDetails", "1.0", "csv database", 20000);
							database.transaction(populateDb, errorDb, SuccessDb);
							alert("database made");
							}
							catch(err)
							{
								alert("error : "+err);
							} */
	
						}
						else if(JSON.stringify(response.status)==201)
						{
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

/* function populateDb(tx)
{
		
	try
	{
		alert("populateDb Called");
		tx.executeSql('DROP TABLE IF EXISTS csv');
		tx.executeSql('CREATE TABLE IF NOT EXISTS csv(date TEXT,name TEXT, pid INTEGER,did INTEGER, dname TEXT, cut INTEGER,investigation INTEGER,deviceId TEXT,user TEXT,status INTEGER)');
		alert("table created");
		
		
		var fileLength=localStorage.getItem("fileLength");
		var fileArray=localStorage.getItem("fileArray");
		alert(fileLength);
		alert(fileArray);
		
		
		
		
		//alert(line[0][0]);
		
		
		var i,j,k,l,m,n,o,p,q,r;
		for(i=0;i<fileLength;i+=10)
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
			//tx.executeSql("INSERT INTO csv(date,name,pid,did,dname,cut) VALUES ('"+value[i]+"','"+value[j]+"',"+value[k]+","+value[l]+",'"+value[m]+"',"+value[n]+")");
			tx.executeSql('INSERT INTO csv (date,name,pid,did,dname,cut,investigation,deviceId,user,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [fileArray[i], fileArray[j], fileArray[k], fileArray[l], fileArray[m], fileArray[n], fileArray[o], fileArray[p], fileArray[q], fileArray[r]]);
		}
		alert("data inserted");
		
		//tx.executeSql("INSERT INTO csv VALUES ('"+value[0]+"','"+value[1]+"',"+value[2]+","+value[3]+",'"+value[4]+"',"+value[5]+")");
		//tx.executeSql("INSERT INTO csv VALUES ('"+value[6]+"','"+value[7]+"',"+value[8]+","+value[9]+",'"+value[10]+"',"+value[11]+")");
		//tx.executeSql('INSERT INTO csv (pid, pname) VALUES ('+parseInt(line[2])+',"'+toString(line[3])+'")');
		//tx.executeSql('INSERT INTO csv (pid, pname) VALUES ('+parseInt(line[6])+',"'+line[7]+'")');
		//alert("data inserted");
		//tx.executeSql('select * from csv where did='+di,[],resultSuccess, resultError);
		//alert("data selected");
		
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
	
function SuccessDb(tx)
{
	alert("Successful");
	//tx.executeSql('SELECT * FROM csv',[],renderList, errorDb);
		
}
 */
 







