
//var pictureSource; // picture source
//var destinationType; // sets the format of returned value
// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

//var database;
//var len;
function onDeviceReady() {
	
	/*try
	{
	alert("on deviceready called");
	database= window.openDatabase("csvDetails", "1.0", "csv database", 20000);
	database.transaction(populateDb, errorDb, SuccessDb);
	}
	catch(err)
	{
		alert("error : "+err);
	}
	*/
}

	/*function populateDb(tx)
	{
		
	try
	{
		alert("populateDb Called");
		tx.executeSql('DROP TABLE IF EXISTS csv');
		tx.executeSql('CREATE TABLE IF NOT EXISTS csv(date TEXT,name TEXT, pid INTEGER,did INTEGER, dname TEXT, cut INTEGER)');
		var line=JSON.parse(localStorage.getItem("lines"));
		var value=JSON.parse(localStorage.getItem("values"));
		alert(line);
		alert(value);
		alert(value.length);
		//var n=Object.keys(line).length;
		len=line.length;
		alert(len);
		
		
		/*for (var i=0; i<line.length; i++)
			for (var name1 in line[i]) 
			{
				alert("Item name: "+name1);
				alert("Source: "+line[i].name);
				//alert("Target: "+result[i][name].targetUuid);
			}*/
		
		//var x = line[0].valueOf('cut');
		//var x = line[0].pop();
		//alert(x);
		//alert(y);
		
		//alert(line[0].item['date']);
		//alert(line['date']); 
		
		//alert(line[0].date);
		//alert(line[0]['name']);
		
			/* var result = $.parseJSON(line);
			//alert(line[0][date]);
			
			 $.each(result, function(k, v) {
			//display the key and value pair
			alert(k + ' is ' + v);
			});
		alert(k) ;
	 */
	 //alert(value[0]);
	 //alert(line[0][0]);
		//tx.executeSql('INSERT INTO csv (date,name,pid,did,dname,cut) VALUES ('+line[0]+')');
		
		/*var i,j;
		for(i=0;i<value.length;i++)
		{
			for(j=0;j<value.length;j++)
			{
				tx.executeSql('INSERT INTO csv (date,name,pid,did,dname,cut) VALUES (?, ?, ?, ?, ?, ?)', [value[i][j], value[j], value[k], value[l], value[m], value[n]]);
			}
		}*/
		
		
		/*var i,j,k,l,m,n;
		for(i=0;i<value.length;i+=6)
		{
			j=i+1;
			k=i+2;
			l=i+3;
			m=i+4;
			n=i+5;
			//tx.executeSql("INSERT INTO csv(date,name,pid,did,dname,cut) VALUES ('"+value[i]+"','"+value[j]+"',"+value[k]+","+value[l]+",'"+value[m]+"',"+value[n]+")");
			tx.executeSql('INSERT INTO csv (date,name,pid,did,dname,cut) VALUES (?, ?, ?, ?, ?, ?)', [value[i], value[j], value[k], value[l], value[m], value[n]]);
		}
		
		
		//tx.executeSql("INSERT INTO csv VALUES ('"+value[0]+"','"+value[1]+"',"+value[2]+","+value[3]+",'"+value[4]+"',"+value[5]+")");
		//tx.executeSql("INSERT INTO csv VALUES ('"+value[6]+"','"+value[7]+"',"+value[8]+","+value[9]+",'"+value[10]+"',"+value[11]+")");
		//tx.executeSql('INSERT INTO csv (pid, pname) VALUES ('+parseInt(line[2])+',"'+toString(line[3])+'")');
		//tx.executeSql('INSERT INTO csv (pid, pname) VALUES ('+parseInt(line[6])+',"'+line[7]+'")');
		alert("data inserted");
		tx.executeSql('select * from csv',[],resultSuccess, resultError);
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
	function SuccessDb(tx)
	{
		alert("Successful");
		//tx.executeSql('SELECT * FROM csv',[],renderList, errorDb);
		
	}
	
	
	function resultSuccess(tx,response)
	{
		alert("result success called");
		var div=document.getElementById("responsediv");
		
		var temp="<table border=\"1\"><tr><th>date</th><th>name</th><th>pid</th><th>did</th><th>dname</th><th>cut</th></tr>";
		
		//value.length
		for(var i=0;i<response.rows.length;i++)
		{
			temp+="<tr><td>"+response.rows.item(i).date+"</td><td>"+response.rows.item(i).name+"</td><td>"+response.rows.item(i).pid+"</td><td>"+response.rows.item(i).did+"</td><td>"+response.rows.item(i).dname+"</td><td>"+response.rows.item(i).cut+"</td></tr>";
		}
		temp+="</table>";
		div.innerHTML=temp;
	}
	
	function resultError(tx,error)
	{
		alert(error);
	}

	
	/*var lati=localStorage.getItem("latitude");
	var longi=localStorage.getItem("longitude");
	var uid=localStorage.getItem("uuid");
	alert("locationsend called");
	var request = createCORSRequest( "post", "http://radio.tekticks.co.in" );
	if(request)
	{
	var data = {"location":[{"uuid":uuid,"latitude":lat,"longitude":lon}]};
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
			
				alert("success");
			
			}
		}
	});
	}
sendData(data);	
	*/
	
	
	
	//alert("ondeviceready called");
	/*alert("hiii");
	var c=function(pos)
	{
		//finding coordinates
		var lat		=pos.coords.latitude;
		var lon		=pos.coords.longitude;
		var coords	=lat+', '+lon;
		//finding universally unique identifier(uuid)	
		var uuid=device.uuid;
		
		alert(coords);
		alert(uuid);
		
		localStorage.setItem("latitude",lat);
		localStorage.setItem("longitude",lon);
		localStorage.setItem("uuid",uuid);
		alert("done");
	}
	navigator.geolocation.getCurrentPosition(c);*/
	
	
	
	
	/*var data = {"location":[{"uuid":uuid,"latitude":lat,"longitude":lon}]};
		alert(data);
		//console.log(data);
		var sendData = function(data)
			{   
				$.ajax
				({
				url: 'http://radio.tekticks.co.in/radioJson/location_new_json.php',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(data),
				dataType: 'json',
				success: function(response)
					{
						//console.log(response);
						alert("success");
						/*if(JSON.stringify(response.status)==200)
						{
							alert(JSON.stringify(response.visitor.locationId).replace(/"/g,""));
						}
						else if(JSON.stringify(response.status)==201)
						{
							alert(response.statusMessage);
						}*/
			/*
					}
					
				});
			}
		sendData(data);*/
//}


 